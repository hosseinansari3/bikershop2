import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../actions/products";

function Customers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container grid px-6 mx-auto">
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Customers
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
          </form>
        </div>
      </div>
      <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <div className="p-4">
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <input
                type="search"
                name="search"
                placeholder="search by name/Email/phone"
                className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              ></input>
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
                  <input id="selectAll" name="selectAll" type="checkbox" />
                </td>
                <td className="px-4 py-3">ID</td>
                <td className="px-4 py-3">ICON</td>
                <td className="px-4 py-3">NAME</td>
                <td className="px-4 py-3">DESCRIPTION</td>
                <td className="px-4 py-3">ACTIONS</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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

              <tr>
                <td className="px-4 py-3">
                  <input
                    id="6468c2128e0b0b00083ea65e"
                    name="Test product"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-sm font-medium">1DD4</h2>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                    <img className="object-cover w-full h-full rounded-full" />
                    <div className="absolute inset-0 rounded-full shadow-inner"></div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">shirt</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">sadfsdf</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex text-right">
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
                    <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none">
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
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
          <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
            <span className="flex items-center font-semibold tracking-wide uppercase">
              SHOWING 1-20 OF 328
            </span>
            <div className="flex mt-2 sm:mt-auto sm:justify-end">
              <nav>
                <ul className="inline-flex items-center">
                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed">
                      <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300">
                      1
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      2
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      3
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      4
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      5
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      6
                    </button>
                  </li>
                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
