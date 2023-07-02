import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import "./AdminPannel.css";

import MenuIcon from "@mui/icons-material/Menu";
import { ROLES } from "../../constants/panelConstants";
import Admin from "../../components/Dashboard/AccountMenu/Managers/Admin";
import Customer from "../../components/Dashboard/AccountMenu/Managers/Customer";
import { useDispatch, useSelector } from "react-redux";

import dashboardLinks from "./links.json";
import { Logout } from "@mui/icons-material";
import { logout } from "../../actions/users";
import { fetchProfile } from "../../actions/account";
function Panel() {
  const user = useSelector((state) => state.account.user);

  const [sideOpen, setSideOpen] = useState(false);
  const [profiletIsOpen, setProfileIsOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  const toggleProfile = () => {
    setProfileIsOpen(!profiletIsOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");

    toggleProfile();
  };

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  useEffect(() => {}, [location.pathname]);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (typeof user.avatar === "object" && user.avatar !== null) {
      setAvatar(URL.createObjectURL(user.avatar));
    } else {
      setAvatar(user.avatar);
    }
  }, [user]);

  const sidebareToggle = () => {
    setSideOpen(!sideOpen);
  };
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 false">
      {user.role !== undefined && user.role === ROLES.Admin ? (
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
        {console.log("user: " + JSON.stringify(user))}
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
                <button onClick={toggleProfile}>
                  <img
                    className="mx-2 inline rounded-full h-8 w-8"
                    src={avatar}
                  />
                  <span>{user.firstName}</span>
                </button>
                {profiletIsOpen && (
                  <div className="text-black absolute z-50 bg-white rounded  w-28 right-16">
                    <ul>
                      <Link to="/">
                        <li className="hover:bg-gray-100 hover:rounded px-4 py-2 flex justify-between items-center cursor-pointer">
                          <span>view site</span>
                        </li>
                      </Link>

                      <li className="hover:bg-gray-100 hover:rounded px-4 py-2  cursor-pointer">
                        <div
                          onClick={logoutHandler}
                          className="flex justify-between items-center"
                        >
                          <span>logout</span>
                          <Logout fontSize="small" />
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
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
