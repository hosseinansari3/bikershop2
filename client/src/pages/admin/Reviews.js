import { lime } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReviews, fetchReviews } from "../../actions/reviews";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { ROLES } from "../../constants/panelConstants";

function Reviews() {
  const dispatch = useDispatch();

  const [Limit, setLimit] = useState(4);
  const [Reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("dispatch");
    if (user.role === ROLES.Admin) {
      dispatch(fetchReviews(Limit));
    } else {
      dispatch(fetchMyReviews(Limit));
    }
  }, [Limit]);

  const AllReviews = useSelector((state) => state.review);

  const { reviews, loading } = AllReviews;

  useEffect(() => {
    setReviews(reviews);
  }, [reviews]);

  const user = useSelector((state) => state.usersSignin.userInfo.user);

  const onLoadMore = () => {
    setLimit(Limit + 4);
  };

  return (
    <div className="container grid px-6 mx-auto">
      {console.log("reviews: " + JSON.stringify(reviews))}
      {user.role === ROLES.Admin ? (
        <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
          All Reviews
        </h1>
      ) : (
        <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
          My Reviews
        </h1>
      )}

      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 dark:bg-gray-900">
        <div className="w-full overflow-x-auto">
          {loading && <LoadingIndicator />}
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">TITLE</td>
                <td className="px-4 py-3">REVIEW</td>
                <td className="px-4 py-3">PRODUCT</td>

                {user.role === ROLES.Admin && (
                  <td className="px-4 py-3">CUSTOMER</td>
                )}
                <td className="px-4 py-3">STATUS</td>
                <td className="px-4 py-3">ACTION</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              {Reviews &&
                Reviews.map((item) => {
                  return (
                    <tr>
                      <td className="px-4 py-3">
                        <span className="font-semibold uppercase text-xs">
                          {item.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{item.review}</span>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className="text-sm">{item.product?.title}</span>
                      </td>

                      {user.role === ROLES.Admin && (
                        <td className="px-4 py-3 text-xs">
                          <span className="text-sm">
                            {item.user?.firstName}
                          </span>
                        </td>
                      )}

                      <td className="px-4 py-3 text-xs">
                        <span className="font-serif">
                          <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                            approved
                          </span>
                        </span>
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
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </p>
                            </a>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {Reviews.length >= Limit && (
            <div className="flex justify-center">
              <button onClick={onLoadMore}>load more</button>
            </div>
          )}
          {Reviews?.length === 0 && (
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

export default Reviews;
