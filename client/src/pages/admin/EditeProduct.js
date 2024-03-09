import React, { useEffect, useMemo, useRef, useState } from "react";

import { Button, Grid } from "@mui/material";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import "./addProduct.css";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategories } from "../../actions/categories";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchProductBySection, imageUpload } from "../../api";
import { SECTIONS } from "../../constants/panelConstants";

function EditeProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [suspention, setSuspention] = useState("");
  const [material, setMaterial] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [content, setContent] = useState("");
  const [section, setSection] = useState("");
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [size, setSize] = useState("28C");
  const [stock, setStock] = useState(null);

  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [hotDiscount, setHotDiscount] = useState(null);
  const [bestSeller, setBestSeller] = useState(null);
  const [newArrival, setNewArrival] = useState(null);
  const [ourOffer, setOurOffer] = useState(null);

  useEffect(() => {
    fetchProductBySection(SECTIONS.Hot_Discount)
      .then((response) => {
        console.log("HotDiscount", response.data.products);
        setHotDiscount(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProductBySection(SECTIONS.Best_Seller)
      .then((response) => {
        console.log("BestSeller", response.data.products);
        setBestSeller(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProductBySection(SECTIONS.New_Arrival)
      .then((response) => {
        console.log("newArrival", response.data.products);
        setNewArrival(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProductBySection(SECTIONS.Our_Offer)
      .then((response) => {
        console.log("ourOffer", response.data.products);
        setOurOffer(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const productDetails = useSelector((state) => state.ProductDetails);

  const { product } = productDetails;

  const [preview, setPreview] = useState([]);

  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.categories);
  const { categories } = allCategories;
  const quillRef = useRef(null);

  const imageHandler = () => {
    // create an input element
    const input = document.createElement("input");
    // set the type and accept attributes
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // trigger the click event
    input.click();
    // listen for the change event
    input.onchange = async () => {
      // get the selected file
      const file = input.files[0];
      // create a form data object
      const formData = new FormData();
      // append the file to the form data
      formData.append("images", file);
      // send the form data to the server or cloud service using an API
      // for example, using axios
      const response = await imageUpload(formData);
      // get the image URL from the response
      const url = response?.data?.imageUrl;
      // get the editor instance from the ref
      const editor = quillRef?.current?.getEditor();
      // get the current cursor position
      const range = editor?.getSelection();
      // insert the image URL at the cursor position
      editor.insertEmbed(range.index, "image", url);
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // other toolbar options
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"],
          ["image"], // image button
        ],
        handlers: {
          image: imageHandler, // custom handler function
        },
      },
    }),
    []
  );

  useEffect(() => {
    dispatch(getProductById(slug));
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setBrand(product.brand);
      setCategory(product.category);
      setSection(product.section);
      setSuspention(product.suspention);
      setMaterial(product.material);
      setPrice(product.price);
      setContent(product.content);
      setQuantity(product.quantity);
      setSize(product.size);
      setVariants(product.variants);
      setPreview(product.images);
      console.log("PRW", preview);
      console.log("title", title);
    }
  }, [product]);

  const handleAdd = (e) => {
    // Create a new variant object with default values
    const newVariant = {
      size: size,
      stock: stock,
    };
    // Add the new variant to the extra variants array
    setVariants((prev) => [...prev, newVariant]);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("catss", categories);
  }, [dispatch]);

  useEffect(() => {
    if (!images) {
      setPreview(undefined);
      return;
    }

    let imagess = [];

    for (let i = 0; i < images.length; i++) {
      imagess.push(URL.createObjectURL(images[i]));
    }

    setPreview(imagess);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, [images]);

  const apiProduct = useSelector((state) => state.products);
  const { products, totalProducts } = apiProduct;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, products]);

  const ProductAddnotif = () => toast("NEW PRODUCT ADDED SUCCESSFULLY!");
  const ProductDeletnotif = () => toast("PRODUCT DELETED SUCCESSFULLY!");

  const handleDelet = (e, id) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
    ProductDeletnotif();
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);

      setImages(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalVariants = variants.filter((variant) => variant != undefined);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("variants", JSON.stringify(finalVariants));

    formData.append("price", price);
    formData.append("category", category);
    formData.append("suspention", suspention);
    formData.append("material", material);
    formData.append("section", section);
    formData.append("brand", brand);
    formData.append("content", content);
    formData.append("size", size);
    formData.append("quantity", quantity);
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const object = Object.fromEntries(formData.entries());
    console.log("UPPPPP", JSON.stringify(object));
    dispatch(updateProduct(product._id, formData));
  };

  return (
    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Title/Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
            defaultValue={title}
            className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            id="outlined-basic"
            placeholder="Product Title/Name"
            label="Product Name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Description
        </label>
        <div className="col-span-8 sm:col-span-4">
          <ReactQuill
            ref={quillRef}
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Images
        </label>
        <div className="col-span-8 sm:col-span-4">
          <label for="files">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className="w-full text-center"
            >
              <div
                for="files"
                role="button"
                tabIndex="0"
                className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
              >
                <input
                  onChange={(e) => {
                    e.target.files.length != 0 && setImages(e.target.files);
                    console.log("IMG", images.length);
                  }}
                  id="files"
                  tabIndex="-1"
                  accept="image/*"
                  multiple
                  type="file"
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                {preview.length == 0 ? (
                  <>
                    <span className="mx-auto flex justify-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-3xl text-green-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="16 16 12 12 8 16"></polyline>
                        <line x1="12" y1="12" x2="12" y2="21"></line>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                        <polyline points="16 16 12 12 8 16"></polyline>
                      </svg>
                    </span>
                    <p className="text-sm mt-2">Drag your images here</p>
                  </>
                ) : (
                  <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-4">
                    {preview?.map((image, i) => {
                      while (i < 4) {
                        return (
                          <img
                            className="h-[165px] w-36 object-cover"
                            key={i}
                            src={image}
                          />
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Category
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            {categories?.map((cat) => {
              return (
                <option selected={cat._id == product?.category} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Section
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select
            def
            onChange={(e) =>
              setSection(e.target.options[e.target.selectedIndex].value)
            }
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option
              disabled={bestSeller?.length >= 6}
              selected={product?.section === SECTIONS.Best_Seller}
              value={SECTIONS.Best_Seller}
            >
              {SECTIONS.Best_Seller}
            </option>
            ;
            <option
              disabled={hotDiscount?.length >= 4}
              selected={product?.section === SECTIONS.Hot_Discount}
              value={SECTIONS.Hot_Discount}
            >
              {SECTIONS.Hot_Discount}
            </option>
            ;
            <option
              selected={product?.section === SECTIONS.New_Arrival}
              value={SECTIONS.New_Arrival}
            >
              {SECTIONS.New_Arrival}
            </option>
            ;
            <option
              disabled={ourOffer?.length >= 4}
              selected={product?.section === SECTIONS.Our_Offer}
              value={SECTIONS.Our_Offer}
            >
              {SECTIONS.Our_Offer}
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Suspention
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select
            onChange={(e) =>
              setSuspention(e.target.options[e.target.selectedIndex].text)
            }
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option selected={product?.suspention === "Dual Suspension"}>
              Dual Suspension
            </option>

            <option selected={product?.suspention === "Hardtail"}>
              Hardtail
            </option>
            <option selected={product?.suspention === "Rigid"}>Rigid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Material
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select
            onChange={(e) =>
              setMaterial(e.target.options[e.target.selectedIndex].text)
            }
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option selected={product?.material === "Carbon"}>Carbon</option>;
            <option selected={product?.material === "Aluminium"}>
              Aluminium
            </option>
            ;<option selected={product?.material === "Other"}>Other</option>;
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Brand
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select
            onChange={(e) =>
              setBrand(e.target.options[e.target.selectedIndex].text)
            }
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option selected={product?.brand === "BIANCHI"}>BIANCHI</option>;
            <option selected={product?.brand === "CIPOLLINI"}>CIPOLLINI</option>
            ;<option selected={product?.brand === "FUJI"}>FUJI</option>
            <option selected={product?.brand === "GT"}>GT</option>
            <option selected={product?.brand === "KTM"}>KTM</option>
            <option selected={product?.brand === "SCOTT"}>SCOTT</option>
            <option selected={product?.brand === "CUBE"}>CUBE</option>
            <option selected={product?.brand === "Cannondale"}>
              Cannondale
            </option>
            <option selected={product?.brand === "Cannondale"}>BMC</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Size
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select
            onChange={(e) =>
              setSize(e.target.options[e.target.selectedIndex].text)
            }
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option selected={product?.size === "28C"}>28C</option>;
            <option selected={product?.size === "25C"}>25C</option>;
            <option selected={product?.size === "30C"}>30C</option>;
            <option selected={product?.size === "32C"}>32C</option>;
            <option selected={product?.size === "35C"}>35C</option>;
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Price
        </label>
        <div className="col-span-8 sm:col-span-4">
          <div className="flex flex-row">
            <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
              $
            </span>
            <input
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none rounded-l-none"
            ></input>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Quantity
        </label>
        <div className="col-span-8 sm:col-span-4">
          <div className="flex flex-row">
            <input
              defaultValue={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none"
            ></input>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Variants
        </label>
        <div className="flex grid grid-cols-3 col-span-4 sm:col-span-4">
          {variants?.map(
            (variant, index) =>
              variants[index] && (
                <div
                  key={index}
                  className="block mr-4 mb-4 flex-row w-40 h-[215px] border border-green-400 shadow-md bg-green-200 rounded"
                >
                  <div className="flex mt-4 items-center h-fit px-1.5">
                    <span className="mr-1">quantity:</span>
                    <input
                      disabled={index < variants.length}
                      value={variant.stock}
                      defaultValue={variant.stock}
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                      type="number"
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md  border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-8 p-2 text-sm border border-gray-300 focus:bg-white  focus:outline-none"
                    ></input>
                  </div>

                  <div className="flex mt-4 items-center h-fit px-1.5">
                    <span className="mr-1">size:</span>
                    <select
                      disabled={index < variants.length}
                      onChange={(e) =>
                        setSize(e.target.options[e.target.selectedIndex].text)
                      }
                      className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-8 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    >
                      <option selected={variant.size == "48cm"} value={"48cm"}>
                        48cm
                      </option>
                      <option selected={variant.size == "54cm"} value={"54cm"}>
                        54cm
                      </option>
                      ;
                      <option selected={variant.size == "58cm"} value={"58cm"}>
                        58cm
                      </option>
                      ;
                      <option selected={variant.size == "62cm"} value={"62cm"}>
                        62cm
                      </option>
                    </select>
                  </div>
                  <div className="flex mt-4 justify-center items-center h-fit px-1.5">
                    <button
                      onClick={() => {
                        delete variants[index];
                        const newArr = [...variants];
                        setVariants(newArr);
                      }}
                      className="px-10 py-2 rounded bg-blue-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}

          <div className="block mr-4 mb-4 flex-row w-40 h-[215px] border-[3px] border-dashed border-gray-200 rounded">
            <div className="flex mt-4 items-center h-fit px-1.5">
              <span className="mr-1">quantity:</span>
              <input
                defaultValue={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
                className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md  border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-8 p-2 text-sm border border-gray-300 focus:bg-white  focus:outline-none"
              ></input>
            </div>

            <div className="flex mt-4 items-center h-fit px-1.5">
              <span className="mr-1">size:</span>
              <select
                onChange={(e) =>
                  setSize(e.target.options[e.target.selectedIndex].text)
                }
                className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-8 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value={"48cm"}>48cm</option>
                <option value={"54cm"}>54cm</option>;
                <option value={"58cm"}>58cm</option>;
                <option value={"62cm"}>62cm</option>
              </select>
            </div>
            <div className="flex mt-4 justify-center items-center h-fit px-1.5">
              <button
                onClick={(e) => handleAdd(e)}
                className="px-10 py-2 rounded bg-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Tags
        </label>
        <div className="col-span-8 sm:col-span-4"></div>
      </div>

      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Button onClick={(e) => handleSubmit(e)} variant="contained">
          Publish Product
        </Button>
        <p>number of products: {totalProducts}</p>
      </Grid>
    </div>
  );
}

export default EditeProduct;
