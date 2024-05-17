import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products";
import "./cat.css";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
} from "../../actions/categories";

function Categories() {
  const dispatch = useDispatch();
  const [isAddCatOpen, setAddCatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const allCategories = useSelector((state) => state.categories);
  const { categories } = allCategories;

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("catss", categories);
  }, [dispatch]);

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  console.log("FETHEDCATS", categories);
  const handleCreateCategory = (e, category) => {
    e.preventDefault();
    dispatch(createCategory(category));
    setInputValue("");
  };

  const handleDelet = (e, id) => {
    e.preventDefault();
    dispatch(deleteCategory(id));
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(categories.map((p) => p._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
    console.log("isCheck :" + isCheck);
    console.log("id :" + id);
  };

  const handleClickb = (e) => {
    const { id } = e.target;
    setIsCheck([...isCheck, id]);
    if (isCheck.includes(id)) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
    console.log("isCheck :" + isCheck);
    console.log("id :" + id);
  };

  return (
    <div className="container grid px-6 mx-auto">
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Categories
      </h1>
      <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <div className="p-4">
          <form className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  md:flex">
            <div className="flex justify-start md:w-1/2 ">
              <div className=" lg:flex md:flex flex-grow-0">
                <div className="flex">
                  <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                    <button className="border flex justify-center items-center border-gray-300 hover:border-green-400 hover:text-green-400  dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span className="text-xs">Export</span>
                    </button>
                  </div>
                  <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                    <button className="border flex justify-center items-center border-gray-300 hover:border-green-400 hover:text-green-400  dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span className="text-xs">Import</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex  md:flex md:justify-end md:w-1/2   flex-grow-0">
              <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <button
                  disabled
                  type="button"
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent opacity-50 cursor-not-allowed w-full rounded-md h-12 btn-gray text-gray-600 sm:mb-3"
                >
                  <span className="mr-2">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </span>
                  Bulk Action
                </button>
              </div>
              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <button
                  onClick={(e) => handleDelet(e, isCheck)}
                  disabled={isCheck.length === 0 ? true : false}
                  type="button"
                  className={`align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white border border-transparent cursor-not-allowed w-full rounded-md h-12 ${
                    isCheck.length == 0
                      ? "bg-red-300 opacity-50 disabled"
                      : "bg-red-600"
                  } btn-red`}
                >
                  <span className="mr-2">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </span>
                  Delete
                </button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <button
                  onClick={() => {
                    setAddCatOpen(!isAddCatOpen);
                  }}
                  type="button"
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                  Add Category
                </button>
              </div>
            </div>
          </form>

          <div
            className={`${
              isAddCatOpen ? `visible opacity-100` : `invisible opacity-0`
            } speech-bubble  transition-all p-2.5`}
          >
            <div
              className={`
            justify-between w-full flex h-10 mx-auto `}
            >
              <input
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                value={inputValue}
                className="w-[90%] mr-2 p-0.5 w-4/5 rounded-lg ring-1 ring-black ring-opacity-4 h-full"
                type="text"
              />
              <button
                onClick={(e) => handleCreateCategory(e, { name: inputValue })}
                type="button"
                className="w-[10%] align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 h-full  rounded-md "
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <div className="p-4">
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <input
                type="search"
                name="search"
                placeholder="search by Category name"
                className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              ></input>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full grid grid-cols-5">
        {categories?.map((cat) => {
          return (
            <div
              className={`${
                isCheck.includes(cat._id)
                  ? "border-red-500 bg-[#ff8787] border-2 text-white"
                  : "border-black"
              } flex hover:border-red-500 transition-all cursor-pointer relative bg-white mb-1 mr-1 border-[1.5px] rounded-2xl`}
            >
              <div className="w-full h-full flex justify-center py-3">
                <span className="text-sm font-semibold">{cat.name}</span>
              </div>

              <div
                id={cat._id}
                key={cat._id}
                onClick={(e) => handleClickb(e)}
                className="absolute cursor-pointer w-full h-full"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
