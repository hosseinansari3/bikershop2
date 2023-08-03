import React, { useEffect, useState } from "react";

import { Button, Grid } from "@mui/material";
import "./addProduct.css";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]);

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

  const dispatch = useDispatch();

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    dispatch(createProduct(formData));
    ProductAddnotif();
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
          <textarea
            placeholder="Product Description"
            className="block w-full text-sm dark:text-gray-300 rounded-md focus:outline-none form-textarea focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-purple-300 border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          ></textarea>
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
          <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white">
            <option>sdfsds</option>
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
              type="number"
              value="0"
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
        <p>number of products: {totalProducts}</p>
      </Grid>
    </div>
  );
}

export default AddProduct;
