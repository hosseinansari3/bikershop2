import { lime } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyReviews,
  fetchReviews,
  updateReview,
} from "../../actions/reviews";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { REVIEW_STATUS, ROLES } from "../../constants/panelConstants";

import Rating from "@mui/material/Rating";

function Reviews() {
  const dispatch = useDispatch();

  const [Limit, setLimit] = useState(4);
  const [Reviews, setReviews] = useState([]);
  const [showActions, setShowActions] = useState([]);

  const toggleActionBtn = (index) => {
    {
      if (showActions.includes(index)) {
        const newArr = showActions.filter((item) => item !== index);
        setShowActions(newArr);
      } else {
        setShowActions([...showActions, index]);
      }
    }
  };

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
            <thead className="text-xs  font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">PRODUCT</td>
                {user.role === ROLES.Admin && (
                  <td className="px-4 py-3">REVIEWER</td>
                )}
                <td className="px-4 py-3 w-[250px]">REVIEW</td>
                <td className="px-4 py-3">DATE</td>

                <td className="px-4 py-3">STATUS</td>
                <td className="px-4 py-3">ACTION</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              {Reviews &&
                Reviews.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3 w-64">
                        <div className="flex items-center">
                          <span className="font-semibold ml-5 uppercase text-xs">
                            {item.product?.title}
                          </span>
                        </div>
                      </td>
                      {user.role === ROLES.Admin && (
                        <td className="px-4 py-3 text-xs">
                          <span className="text-sm">
                            {item.user?.firstName}
                          </span>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <h3 className="font-bold">{item.title}</h3>
                        <p>
                          <Rating readOnly value={item.rating} />
                        </p>

                        <p>{item.review}</p>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className="text-sm">
                          {item.created.substring(0, 10)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-xs">
                        <span className="font-serif">
                          <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                            {item?.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right flex">
                        <div className="relative">
                          <button onClick={() => toggleActionBtn(index)}>
                            <svg
                              class="w-6 h-6 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="3"
                                d="M12 6h.01M12 12h.01M12 18h.01"
                              />
                            </svg>
                          </button>

                          {showActions.includes(index) && (
                            <div
                              className={` absolute right-[-28px] bg-gray-100 rounded w-20 h-auto text-center`}
                            >
                              <ul>
                                <li
                                  onClick={() => {
                                    dispatch(
                                      updateReview(item._id, {
                                        ...item,
                                        status: REVIEW_STATUS.Approved,
                                      })
                                    );
                                    toggleActionBtn(index);
                                  }}
                                  className="hover:bg-gray-50 hover:cursor-pointer p-1.5"
                                >
                                  Approve
                                </li>
                                <li
                                  onClick={() => {
                                    dispatch(
                                      updateReview(item._id, {
                                        ...item,
                                        status: REVIEW_STATUS.Rejected,
                                      })
                                    );
                                    toggleActionBtn(index);
                                  }}
                                  className="hover:bg-gray-50 hover:cursor-pointer p-1.5"
                                >
                                  Reject
                                </li>
                              </ul>
                            </div>
                          )}
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
