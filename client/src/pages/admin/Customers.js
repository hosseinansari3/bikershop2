import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, onUsersSearch } from "../../actions/users";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Pagination from "../../components/Pagination/Pagination";
function Customers() {
  const apiUsers = useSelector((state) => state.usersRegister);
  const { loading, users, totalPages, pageSize, totalUsers } = apiUsers;

  const pageNumber = 1;

  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState();

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSearch) {
      page && dispatch(onUsersSearch(searchValue, page));
      console.log("mpage: " + page);
      console.log("usterrs " + JSON.stringify(users));
    } else {
      dispatch(getUsers(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    setPages(totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (searchValue === "") {
      setIsSearch(false);
      dispatch(getUsers(1));
      setPage(1);
    }

    dispatch(onUsersSearch(searchValue, 1));
  }, [searchValue]);

  const handleDelet = (e, id) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };

  const userSearchHandler = (value) => {
    setSearchValue(value);
    setIsSearch(true);
    setPage(1);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(users.map((user) => user._id));
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
    <div className="container grid px-2 md:px-6 mx-auto">
      {console.log("1pagessss: " + pages)}
      {console.log("1totalUsers: " + totalUsers)}
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Customers
      </h1>
      {console.log("pages:" + pages)}
      {console.log("is search:" + isSearch)}
      {console.log("search value:" + searchValue)}

      {loading && <LoadingIndicator />}
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
            </div>
          </form>
        </div>
      </div>
      <div className="min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <div className="p-4">
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <input
                onChange={(e) => userSearchHandler(e.target.value)}
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
                  <input
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                    id="selectAll"
                    name="selectAll"
                    type="checkbox"
                  />
                </td>
                <td className="px-4 py-3">NAME</td>
                <td className="px-4 py-3">PICTURE</td>
                <td className="px-4 py-3">EMAIL</td>
                <td className="px-4 py-3">ROLE</td>
                <td className="px-4 py-3">ACTIONS</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
              {users?.map((user) => {
                return (
                  <tr>
                    <td className="px-4 py-3">
                      <input
                        checked={isCheck.includes(user._id)}
                        id={user._id}
                        key={user._id}
                        onChange={handleClick}
                        name={user.title}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div>
                          <h2 className="text-sm font-medium">
                            {user.firstName}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative rounded-full inline-block w-8 h-8 hidden p-1 mr-2 md:block bg-gray-50 shadow-none">
                        <img
                          src={user.avatar}
                          className="object-cover w-full h-full rounded-full"
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner"></div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-500 text-white rounded-full px-2 text-xs font-medium leading-5">
                        {user?.role?.substring(5)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex text-right">
                        <button
                          onClick={(e) => handleDelet(e, [user._id])}
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
          {users?.length === 0 && (
            <div className="flex justify-center">
              <p className="text-3xl p-10 text-gray-400	">
                THERE IS NOTHING HERE YET!
              </p>
            </div>
          )}
        </div>
        <Pagination
          totalItems={totalUsers}
          pageSize={pageSize}
          page={page}
          pages={pages}
          changePage={setPage}
        />
      </div>
    </div>
  );
}

export default Customers;
