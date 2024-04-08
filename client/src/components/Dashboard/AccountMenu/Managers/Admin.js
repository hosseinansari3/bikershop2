import React from "react";
import { NavLink } from "react-router-dom";

function Admin(props) {
  return (
    <aside
      className={`absolute h-full top-14 transition-all  z-30 flex-shrink-0 shadow-sm  overflow-y-auto bg-white dark:bg-gray-800 block lg:relative lg:top-0 ${
        !props.sideOpen ? "w-0" : "w-64"
      } `}
    >
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <div>
          <p className="text-center	text-3xl font-bold">BIKER-SHOP</p>
          <p className="text-center	text-lg font-bold">Admin Dashboard</p>
        </div>

        <ul className="mt-2">
          {props.links.map((link) => {
            return (
              <li className="relative">
                <NavLink
                  end={link.name == "Dashboard" ? true : false}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 border-l-4 border-green-500 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100"
                      : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100"
                  }
                  to={link.to}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-boxes"
                    viewBox="0 0 16 16"
                    dangerouslySetInnerHTML={{ __html: link.icon }}
                  ></svg>

                  <span className="ml-4">{link.name}</span>
                  {link.name === "Categories" && (
                    <span className="inline-flex px-2 absolute right-4 text-xs font-medium leading-5 rounded-full text-white bg-orange-400">
                      آزمایشی
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Admin;
