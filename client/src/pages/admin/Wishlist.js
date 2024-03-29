import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../actions/wishlist";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

function Wishlist() {
  const userId = useSelector((state) => state.usersSignin.userInfo.user.id);
  const wishlist = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="container grid px-6 mx-auto">
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Wishlist
      </h1>
      {wishlist.loading && <LoadingIndicator />}
      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 dark:bg-gray-900">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">PRODUCT TITLE</td>
                <td className="px-4 py-3">PRODUCT IMAGE</td>
                <td className="px-4 py-3">WISHLIST DATE</td>

                <td className="px-4 py-3">ACTION</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              {wishlist.wishlistItems?.map((item) => {
                return (
                  <tr>
                    <td className="px-4 py-3">
                      <span className="font-semibold uppercase text-xs">
                        {item.product?.title}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <img
                        className="w-12 h-12 object-contain"
                        src={item.product?.image}
                      />
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="text-sm">{item.created}</span>
                    </td>

                    <td className="px-4 py-3 text-right flex">
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
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
                              <polyline points="6 9 6 2 18 2 18 9"></polyline>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                              <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                          </p>
                        </button>
                        <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                          <a href="#">
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
                                <line
                                  x1="21"
                                  y1="21"
                                  x2="16.65"
                                  y2="16.65"
                                ></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                            </p>
                          </a>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {console.log(
                "wishlist : " +
                  typeof wishlist.wishlistItems +
                  JSON.stringify(wishlist)
              )}
            </tbody>
          </table>
          {wishlist.wishlistItems?.length === 0 && (
            <div className="flex justify-center">
              <p className="text-3xl p-10 text-gray-400	">
                THERE IS NOTHING HERE YET!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
