import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import "./addProduct.css";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByFilter,
} from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategories } from "../../actions/categories";
import { fetchProductBySection, imageUpload } from "../../api";
import { SECTIONS } from "../../constants/panelConstants";

function AddProduct() {
  const dispatch = useDispatch();
  const quillRef = useRef(null);

  const allCategories = useSelector((state) => state.categories);
  const { categories } = allCategories;

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("catss", categories);
  }, [dispatch]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [suspention, setSuspention] = useState("Dual Suspension");
  const [section, setSection] = useState("");
  const [material, setMaterial] = useState("Carbon");
  const [brand, setBrand] = useState("BIANCHI");
  const [size, setSize] = useState("28C");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(
    categories?.length > 0 ? categories[0]._id : ""
  );
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState([]);

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

    const myObj = { first: "sss", second: "bbb" };
  }, []);

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
    console.log("section", section);
  }, [section]);

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

  //const apiProduct = useSelector((state) => state.products);
  //const { products, totalProducts } = apiProduct;

  useEffect(() => {
    console.log(value);
  }, [value]);

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("suspention", suspention);
    formData.append("section", section);
    formData.append("material", material);
    formData.append("brand", brand);
    formData.append("quantity", quantity);
    formData.append("size", size);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    dispatch(createProduct(formData));
  };

  return (
    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Product Title/Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
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
            value={value}
            onChange={setValue}
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
                  }}
                  id="files"
                  tabIndex="-1"
                  accept="image/*"
                  multiple
                  type="file"
                  autoComplete="off"
                  style={{ display: "none" }}
                />

                {images.length == 0 ? (
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
                        return <img key={i} src={image} />;
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
              return <option value={cat._id}>{cat.name}</option>;
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
            onChange={(e) =>
              setSection(e.target.options[e.target.selectedIndex].value)
            }
            className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          >
            <option
              disabled={bestSeller?.length >= 6}
              value={SECTIONS.Best_Seller}
            >
              {SECTIONS.Best_Seller}
            </option>
            ;
            <option
              disabled={hotDiscount?.length >= 4}
              value={SECTIONS.Hot_Discount}
            >
              {SECTIONS.Hot_Discount}
            </option>
            ;
            <option value={SECTIONS.New_Arrival}>{SECTIONS.New_Arrival}</option>
            ;
            <option disabled={ourOffer?.length >= 4} value={SECTIONS.Our_Offer}>
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
            <option value={"Dual Suspension"}>Dual Suspension</option>;
            <option value={"Hardtail"}>Hardtail</option>;
            <option value={"Rigid"}>Rigid</option>;
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
            <option value={"Carbon"}>Carbon</option>;
            <option value={"Aluminium"}>Aluminium</option>;
            <option value={"Other"}>Other</option>;
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
            <option value={"BIANCHI"}>BIANCHI</option>;
            <option value={"CIPOLLINI"}>CIPOLLINI</option>;
            <option value={"FUJI"}>FUJI</option>;
            <option value={"GT"}>GT</option>;<option value={"KTM"}>KTM</option>;
            <option value={"SCOTT"}>SCOTT</option>;
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
            <option value={"28C"}>28C</option>;
            <option value={"25C"}>25C</option>;
            <option value={"30C"}>30C</option>;
            <option value={"32C"}>32C</option>;
            <option value={"35C"}>35C</option>;
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
          Product Tags
        </label>
        <div className="col-span-8 sm:col-span-4"></div>
      </div>

      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Button onClick={handleSubmit} variant="contained">
          Publish Product
        </Button>
      </Grid>
    </div>
  );
}

export default AddProduct;
