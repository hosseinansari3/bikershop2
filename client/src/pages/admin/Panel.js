import React, { useEffect, useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

import "./AdminPannel.css";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

import ChatBubbleIcon from "@mui/icons-material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { ROLES } from "../../constants/panelConstants";
import Admin from "../../components/Dashboard/AccountMenu/Managers/Admin";
import Customer from "../../components/Dashboard/AccountMenu/Managers/Customer";
import { useDispatch, useSelector } from "react-redux";

import dashboardLinks from "./links.json";
function Panel() {
  const user = useSelector((state) => state.usersSignin.userInfo.user);

  const [sideOpen, setSideOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  useEffect(() => {}, [location.pathname]);

  const sidebareToggle = () => {
    setSideOpen(!sideOpen);
    console.log("sideToggle" + sideOpen);
  };
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 false">
      {/*
      <aside
        className={`absolute top-14 transition-all  z-30 flex-shrink-0 shadow-sm  overflow-y-auto bg-white dark:bg-gray-800 block lg:relative lg:top-0 ${
          !sideOpen ? "w-0" : "w-64"
        } `}
       >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <div>
            <p className="text-center	text-3xl font-bold">BIKER-SHOP</p>
            <p className="text-center	text-lg font-bold">Admin Dashboard</p>
          </div>

          <ul className="mt-2">
            <li className="relative">
              <NavLink
                onClick={() => {
                  console.log(window.location.pathname);
                }}
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100"
                to="Dashboard"
              >
                {splitLocation[2] == "Dashboard" && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"></span>
                )}
                <HomeIcon />
                <span className="ml-4">Dashboard</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-orange-400">
                  آزمایشی
                </span>
              </NavLink>
            </li>

            <li className="relative">
              <Link
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200"
                to="customers"
              >
                {splitLocation[2] == "customers" && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"></span>
                )}
                <PersonIcon />
                <span className="ml-4">Customers</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-orange-400">
                  آزمایشی
                </span>
              </Link>
            </li>

            <li className="relative">
              <Link
                onClick={() => {
                  console.log(splitLocation[2]);
                }}
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200"
                to="Orders"
              >
                {splitLocation[2] == "Orders" && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"></span>
                )}

                <PersonIcon />
                <span className="ml-4">Orders</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-orange-400">
                  آزمایشی
                </span>
              </Link>
            </li>

            <li className="relative">
              <Link
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 "
                to="Products"
              >
                {splitLocation[2] == "Products" && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"></span>
                )}

                <ViewInArIcon />
                <span className="ml-4">Products</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-green-400">
                  عملیاتی
                </span>
              </Link>
            </li>

            <li className="relative">
              <Link
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 "
                to="Categories"
              >
                {splitLocation[2] == "Categories" && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"></span>
                )}

                <ViewInArIcon />
                <span className="ml-4">Categories</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-orange-400">
                  آزمایشی
                </span>
              </Link>
            </li>

            <li className="relative">
              <Link
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200"
                to="AddProducts"
              >
                {splitLocation[2] == "AddProducts" && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"></span>
                )}
                <AddBoxIcon />
                <span className="ml-4">Add Product</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-green-400">
                  عملیاتی
                </span>
              </Link>
            </li>

            <li className="relative">
              <Link
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 "
                to="#"
              >
                <ChatBubbleIcon />
                <span className="ml-4">Comments</span>
                <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-orange-400">
                  آزمایشی
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
*/}

      {user.role === ROLES.Admin ? (
        <Admin
          user={user}
          sideOpen={sideOpen}
          links={dashboardLinks[ROLES.Admin]}
        />
      ) : (
        <Customer
          user={user}
          sideOpen={sideOpen}
          links={dashboardLinks[ROLES.Member]}
        />
      )}

      <div className="flex flex-col flex-1 w-full">
        {console.log("UUZZ:" + JSON.stringify(user))}
        <header className="z-30 py-4 bg-white shadow-sm dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-green-500 dark:text-green-500">
            <button onClick={sidebareToggle}>
              <MenuIcon />
            </button>
            <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
              <li className="dark-mode">
                <button>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    class="w-5 h-5"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61z"></path>
                  </svg>
                </button>
              </li>
              <li className="relative inline-block text-left">
                <button>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    class="w-5 h-5"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 480a80.09 80.09 0 0073.3-48H182.7a80.09 80.09 0 0073.3 48zm144-192v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48c-68.88 15.61-96 76.76-96 147.47V288l-48 64v48h384v-48z"></path>
                  </svg>
                  <span class="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    6
                  </span>
                </button>
              </li>
              <li className="relative inline-block text-left">
                <img
                  className="inline rounded-full h-8 w-8"
                  src={user.avatar}
                />
                <span>{user.firstName}</span>
              </li>
            </ul>
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container grid px-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Panel;
