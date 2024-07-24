import React from "react";
import { NavLink } from "react-router-dom";

function Customer(props) {
  return (
    <aside
      className={`fixed md:absolute  h-full top-14 transition-all duration-[0.5s]  z-30 flex-shrink-0 shadow-sm  overflow-y-auto bg-white dark:bg-gray-800 block lg:relative lg:top-0 ${
        props.sideOpen ? "left-0 md:w-[220px]" : "left-[-100%] md:w-0 md:left-0"
      } `}
    >
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <div>
          <p className="w-[200px] min-w-[200px] text-center	text-3xl font-bold">
            BIKER-SHOP
          </p>
          <p className="w-[200px] min-w-[200px] text-center	text-lg font-bold">
            Customer Dashboard
          </p>
        </div>

        <ul className="mt-2 w-[200px] min-w-[200px]">
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
                  ></svg>{" "}
                  <span className="ml-4">{link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Customer;
