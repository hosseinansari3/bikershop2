import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist, fetchWishlist } from "../../actions/wishlist";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const userId = useSelector((state) => state.usersSignin.userInfo.user.id);
  const wishlist = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const ProductDeletnotif = () => toast("wishlist DELETED SUCCESSFULLY!");

  const handleDelet = (e, id) => {
    e.preventDefault();
    dispatch(deleteWishlist(id));
    ProductDeletnotif();
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    console.log("wishlist", wishlist);
  }, [wishlist]);

  return (
    <div className="container grid px-2 md:px-6 mx-auto">
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Wishlist
      </h1>
      {wishlist.loading ? (
        <div className="flex justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 dark:bg-gray-900">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                <tr>
                  <td className="px-4 py-3">PRODUCT TITLE</td>
                  <td className="px-4 py-3">WISHLIST DATE</td>

                  <td className="px-4 py-3">ACTION</td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
                {wishlist.wishlistItems?.map((item) => {
                  return (
                    <tr>
                      <td className="px-4 py-3">
                        <Link to={`/product/${item.product.slug}`}>
                          <div className="flex items-center">
                            <img
                              className="w-12 h-12 object-contain"
                              src={item.product?.images[0]}
                            />
                            <span className="font-semibold uppercase ml-2 text-xs">
                              {item.product?.title}
                            </span>
                          </div>
                        </Link>
                      </td>

                      <td className="px-4 py-3 text-xs">
                        <span className="text-sm">{item.created}</span>
                      </td>

                      <td className="px-4 py-3 text-right flex">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={(e) => handleDelet(e, [item._id])}
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
      )}
    </div>
  );
}

export default Wishlist;
