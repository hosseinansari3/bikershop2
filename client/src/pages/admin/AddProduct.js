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
import { useForm } from "react-hook-form";
import { string } from "prop-types";

function AddProduct() {
  const dispatch = useDispatch();
  const quillRef = useRef(null);

  const allCategories = useSelector((state) => state.categories);
  const { categories } = allCategories;

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("catss", categories);
  }, [dispatch]);

  //const [title, setTitle] = useState("");
  //const [price, setPrice] = useState("");
  const [suspention, setSuspention] = useState("Dual Suspension");
  const [section, setSection] = useState("");
  const [material, setMaterial] = useState("Carbon");
  const [brand, setBrand] = useState("BIANCHI");
  //const [size, setSize] = useState("28C");
  //const [stock, setStock] = useState(null);
  const [category, setCategory] = useState(
    categories?.length > 0 ? categories[0]._id : ""
  );
  const [images, setImages] = useState([]);
  //const [mainImage, setMainImage] = useState([]);
  //const [otherImages, setOtherImages] = useState([]);
  const [value, setValue] = useState("");
  const [otherpreview, setOtherPreview] = useState([]);
  const [mainpreview, setMainPreview] = useState([]);
  const [hotDiscount, setHotDiscount] = useState(null);
  const [bestSeller, setBestSeller] = useState(null);
  const [newArrival, setNewArrival] = useState(null);
  const [ourOffer, setOurOffer] = useState(null);
  const [variants, setVariants] = useState([]);
  const [firstVariant, isFirstVariant] = useState(true);

  const [extra, setExtra] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const title = watch("title");
  const mainImage = watch("mainimage", []);
  const otherImages = watch("otherImages", []);
  const price = watch("price");
  const stock = watch("stock", 1);
  const size = watch("size", "48cm");

  const sus = watch("suspention");

  // const handleAddVariant = () => {
  //  setExtraVariant(extraVariant + 1);
  //  };

  const handleAdd = (e) => {
    // Create a new variant object with default values
    e.preventDefault();
    const newVariant = {
      size: size,
      stock: stock,
    };
    // Add the new variant to the extra variants array
    setVariants((prev) => [...prev, newVariant]);
  };

  /*
  const handleUpdate = (e, index, field) => {
    // Get the value from the event target
    const value = e.target.value;
    // Update the extra variants array by copying the previous state
    // and modifying the object at the given index and field
    setExtraVariants((prev) => {
      return prev.map((variant, i) => {
        if (i === index) {
          return { ...variant, [field]: value };
        } else {
          return variant;
        }
      });
    });
  };
  */

  /*
  useEffect(() => {
    setVariants([
      { quantity: quantity, size: size, color: color },
      ...extraVariants,
    ]);
    console.log("extraVariant", extraVariants);
  }, [extraVariants]);
  */

  /* useEffect(() => {
    console.log("extraVariant", extraVariant);
    for (let i = 0; i < extraVariant; i++) {
      const extraHtml = (
        <div className="block mr-4 mb-4 flex-row w-40 h-[215px] border border-gray-200 rounded">
          <div className="flex mt-4 items-center h-fit px-1.5">
            <span className="mr-1">quantity:</span>
            <input
              defaultValue={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md  border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-8 p-2 text-sm border border-gray-300 focus:bg-white  focus:outline-none"
            ></input>
          </div>
          <div className="flex mt-4 items-center h-fit px-1.5">
            <span className="mr-1">color:</span>
            <select
              onChange={(e) =>
                setColor(e.target.options[e.target.selectedIndex].text)
              }
              className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-8 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            >
              <option value={"red"}>red</option>;
              <option value={"white"}>white</option>;
              <option value={"black"}>black</option>
              <option value={"green"}>green</option>
              <option value={"yellow"}>yellow</option>
              <option value={"orange"}>orange</option>
            </select>
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
      );
      setExtra([...extra, extraHtml]);
    }
  }, [extraVariant]);
  */

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
    if (!mainImage) {
      setMainPreview(undefined);
      return;
    }

    mainImage.length > 0 && setMainPreview([URL.createObjectURL(mainImage[0])]);
  }, [mainImage]);

  useEffect(() => {
    if (!otherImages) {
      setOtherPreview(undefined);
      return;
    }
    let imagess = [];
    for (let i = 0; i < otherImages.length; i++) {
      imagess.push(URL.createObjectURL(otherImages[i]));
    }
    setOtherPreview(imagess);
  }, [otherImages]);

  useEffect(() => {
    console.log("mainpreview", mainpreview);
  }, [mainpreview]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    console.log("sus", sus);
  }, [sus]);

  useEffect(() => {
    if (mainImage.length > 0 && otherImages.length > 0) {
      setImages([...mainImage, ...otherImages]);
    }
  }, [mainImage, otherImages]);

  useEffect(() => {
    console.log("allImages", images);
  }, [images]);

  useEffect(() => {
    console.log("otherImages", otherImages);
  }, [otherImages]);

  useEffect(() => {
    if (variants.length > 0) {
      clearErrors("variant");
    }
  }, [variants]);

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

  const onError = (e) => {
    if (variants.length == 0) {
      setError("variant", {
        type: string,
        message: "please select atleast one variant!",
      });
    }
  };

  const onSubmit = (e) => {
    // e.preventDefault();

    if (variants.length == 0) {
      setError("variant", {
        type: string,
        message: "please select atleast one variant!",
      });
    } else {
      const finalVariants = variants.filter((variant) => variant != undefined);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("variants", JSON.stringify(finalVariants));

      formData.append("content", value);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("suspention", suspention);
      formData.append("section", section);
      formData.append("material", material);
      formData.append("brand", brand);
      formData.append("quantity", stock);
      formData.append("size", size);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const object = Object.fromEntries(formData.entries());
      console.log("UPPPPP", JSON.stringify(object));
      dispatch(createProduct(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              {...register("title", { required: true })}
              //onChange={(e) => {
              //setTitle(e.target.value);
              //}}
            />
            {errors.title && (
              <p className="text-red-600">title can't be empty</p>
            )}
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
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className="w-full text-center"
            >
              <div className="flex justify-between">
                <label
                  for="file0"
                  className="flex justify-center items-center w-[30%] aspect-square border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
                >
                  {mainImage?.length == 0 ? (
                    <div>
                      <span>main image here</span>
                      {errors.mainimage && (
                        <p className="text-red-600">
                          you must upload main image
                        </p>
                      )}
                    </div>
                  ) : (
                    <img
                      className="w-32 h-32 object-cover"
                      src={mainpreview.length > 0 ? mainpreview[0] : null}
                    />
                  )}

                  <input
                    //onChange={(e) => {
                    //console.log("e.target.files", e.target);
                    //e.target.files.length != 0 &&
                    //setMainImage(e.target.files);
                    //}}
                    {...register("mainimage", { required: true })}
                    id="file0"
                    tabIndex="-1"
                    accept="image/*"
                    type="file"
                    autoComplete="off"
                    style={{ display: "none" }}
                  />
                </label>

                <label
                  for="file1"
                  className="flex justify-center items-center w-[65%]  border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
                >
                  <input
                    // onChange={(e) => {
                    // e.target.files.length != 0 &&
                    // setOtherImages(e.target.files);
                    //}}
                    {...register("otherImages", { required: true })}
                    id="file1"
                    tabIndex="-1"
                    accept="image/*"
                    multiple
                    type="file"
                    autoComplete="off"
                    style={{ display: "none" }}
                  />
                  {otherImages?.length == 0 ? (
                    <div>
                      <span>other images here</span>
                      {errors.otherImages && (
                        <p className="text-red-600">
                          you must upload at least one image
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
                      {otherpreview?.map((image, i) => {
                        while (i < otherpreview.length) {
                          return (
                            <img
                              className="w-32 h-32 object-cover"
                              key={i}
                              src={image}
                            />
                          );
                        }
                      })}
                    </div>
                  )}
                </label>
              </div>
            </div>
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
              <option value={SECTIONS.New_Arrival}>
                {SECTIONS.New_Arrival}
              </option>
              ;
              <option
                disabled={ourOffer?.length >= 4}
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
              onChange={(e) => setSuspention(e.target.value)}
              className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            >
              <option value={"Dual Suspension"}>Dual Suspension</option>
              <option value={"Hardtail"}>Hardtail</option>
              <option value={"Rigid"}>Rigid</option>
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
              <option value={"FUJI"}>FUJI</option>
              <option value={"GT"}>GT</option>
              <option value={"KTM"}>KTM</option>
              <option value={"SCOTT"}>SCOTT</option>
              <option value={"CUBE"}>CUBE</option>
              <option value={"Cannondale"}>Cannondale</option>
              <option value={"BMC"}>BMC</option>
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
                {...register("price", { required: true })}
                //onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none rounded-l-none"
              ></input>
            </div>
            {errors.price && (
              <p className="text-red-600">price can't be empty</p>
            )}
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
                      <span className="mr-1">stock:</span>
                      <input
                        disabled={index < variants.length}
                        value={variant.price}
                        defaultValue={4}
                        {...register("stock", { required: true })}
                        // onChange={(e) => {
                        //  setStock(e.target.value);
                        // }}
                        type="number"
                        className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md  border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-8 p-2 text-sm border border-gray-300 focus:bg-white  focus:outline-none"
                      ></input>
                    </div>

                    <div className="flex mt-4 items-center h-fit px-1.5">
                      <span className="mr-1">size:</span>
                      <select
                        disabled={index < variants.length}
                        {...register("size", { required: true })}
                        className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-8 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      >
                        <option
                          selected={variant.size == "48cm"}
                          value={"48cm"}
                        >
                          48cm
                        </option>
                        <option
                          selected={variant.size == "54cm"}
                          value={"54cm"}
                        >
                          54cm
                        </option>
                        ;
                        <option
                          selected={variant.size == "58cm"}
                          value={"58cm"}
                        >
                          58cm
                        </option>
                        ;
                        <option
                          selected={variant.size == "62cm"}
                          value={"62cm"}
                        >
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
                <span className="mr-1">stock:</span>
                <input
                  defaultValue={stock}
                  //onChange={(e) => setStock(e.target.value)}
                  {...register("stock", { required: true })}
                  type="number"
                  className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md  border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-8 p-2 text-sm border border-gray-300 focus:bg-white  focus:outline-none"
                ></input>
              </div>

              <div className="flex mt-4 items-center h-fit px-1.5">
                <span className="mr-1">size:</span>
                <select
                  {...register("size", { required: true })}
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
              {errors.variant && (
                <p className="text-red-600">
                  you must choose at least one variant
                </p>
              )}
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
          <Button type="submit" variant="contained">
            Publish Product
          </Button>
        </Grid>
      </div>
    </form>
  );
}

export default AddProduct;
