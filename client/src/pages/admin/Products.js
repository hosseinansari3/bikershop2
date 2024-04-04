import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  onProductSearch,
} from "../../actions/products";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { onUsersSearch } from "../../actions/users";
import Pagination from "../../components/Pagination/Pagination";

function Products() {
  const apiProduct = useSelector((state) => state.products);
  const { loading, products, totalPages, pageSize, totalProducts } = apiProduct;

  const pageNumber = 1;

  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSearch) {
      page && dispatch(onUsersSearch(searchValue, page));
      console.log("mpage: " + page);
      console.log("usterrs " + JSON.stringify(products));
    } else {
      dispatch(getProducts(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (products.length == 0) {
      dispatch(getProducts(page));
    }
  }, [products]);

  useEffect(() => {
    setPages(totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (searchValue === "") {
      setIsSearch(false);
      dispatch(getProducts(1));
      setPage(1);
    }

    dispatch(onProductSearch(searchValue, 1));
  }, [searchValue]);

  const ProductDeletnotif = () => toast("PRODUCT DELETED SUCCESSFULLY!");

  const handleDelet = (e, id) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
    ProductDeletnotif();
  };
  const productSearchHandler = (value) => {
    setSearchValue(value);
    setIsSearch(true);
    setPage(1);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(products.map((p) => p._id));
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

  return (
    <div className="container grid px-6 mx-auto">
      {loading && <LoadingIndicator />}
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Products
      </h1>
      <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <div className="p-4">
          <form className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            <div className="flex justify-start xl:w-1/2  md:w-full">
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
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
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
                <Link to="../AddProducts">
                  <button
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
                    Add Product
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <div className="p-4">
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <input
                onChange={(e) => productSearchHandler(e.target.value)}
                type="search"
                name="search"
                placeholder="search product"
                className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              ></input>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white">
                <option value="all">Prgbbnmice</option>
              </select>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white">
                <option value="all">Price</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 rounded-b-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">
                  <input
                    onChange={handleSelectAll}
                    id="selectAll"
                    name="selectAll"
                    type="checkbox"
                    checked={isCheckAll}
                  />
                </td>
                <td className="px-4 py-3">PRODUCT NAME</td>
                <td className="px-4 py-3">CATEGORY</td>
                <td className="px-4 py-3">price</td>

                <td className="px-4 py-3">STOCK</td>
                <td className="px-4 py-3">STATUS</td>
                <td className="px-4 py-3 text-center">View</td>
                <td className="px-4 py-3 text-center">ACTIONS</td>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              {products.map((p) => {
                return (
                  <tr>
                    <td className="px-4 py-3">
                      <input
                        checked={isCheck.includes(p._id)}
                        id={p._id}
                        key={p._id}
                        onChange={handleClick}
                        name={p.title}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img
                          src={p?.images[0]}
                          className="w-24 h-16 object-cover"
                        />
                        <div className="w-60 ml-7">
                          <h2 className="text-sm font-medium">{p.title}</h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{p.category?.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">${p.price}</span>
                    </td>

                    <td className="px-4 py-3">
                      {p.variants.map((variant) => {
                        return (
                          <div>
                            <span className="text-sm">{variant.size}: </span>
                            <span className="text-sm">{variant.stock}</span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                        Selling
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a className="flex justify-center text-gray-400 hover:text-green-600">
                        <p>
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
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end text-right">
                        <Link to={`../EditeProduct/${p.slug}`}>
                          <button className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none">
                            <p>
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
                            </p>
                          </button>
                        </Link>
                        <button
                          onClick={(e) => handleDelet(e, [p._id])}
                          className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                        >
                          <p>
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
                          </p>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {products?.length === 0 && (
            <div className="flex justify-center">
              <p className="text-3xl p-10 text-gray-400	">
                THERE IS NOTHING HERE YET!
              </p>
            </div>
          )}
        </div>
        <Pagination
          totalItems={totalProducts}
          pageSize={pageSize}
          page={page}
          pages={pages}
          changePage={setPage}
        />
      </div>
    </div>
  );
}

export default Products;
