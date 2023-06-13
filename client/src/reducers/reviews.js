/*
 *
 * Review reducer
 *
 */

import {
  ADD_REVIEW,
  FETCH_PRODUCT_REVIEWS,
  FETCH_REVIEWS,
  REMOVE_REVIEW,
  RESET_REVIEW,
  REVIEW_CHANGE,
  SET_REVIEWS_LOADING,
  SET_REVIEW_FORM_ERRORS,
} from "../constants/actionTypes";

const initialState = {
  reviews: [],
  isLoading: false,

  productReviews: [],

  reviewFormData: {
    title: "",
    review: "",
    rating: 0,
  },
  reviewFormErrors: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case FETCH_PRODUCT_REVIEWS:
      return {
        ...state,
        productReviews: action.payload.reviews,
      };
    case ADD_REVIEW:
      return {
        ...state,
        productReviews: [...state.productReviews, action.payload],
      };
    case REMOVE_REVIEW:
      const index = state.reviews.findIndex((r) => r._id === action.payload);
      return {
        ...state,
        reviews: [
          ...state.reviews.slice(0, index),
          ...state.reviews.slice(index + 1),
        ],
      };
    case REVIEW_CHANGE:
      console.log("Review Change" + JSON.stringify(action.payload));
      return {
        ...state,
        reviewFormData: {
          ...state.reviewFormData,
          ...action.payload,
        },
      };
    case SET_REVIEWS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case RESET_REVIEW:
      return {
        ...state,
        reviewFormData: {
          title: "",
          review: "",
          rating: 0,
        },
        reviewFormErrors: {},
      };
    case SET_REVIEW_FORM_ERRORS:
      return {
        ...state,
        reviewFormErrors: action.payload,
      };

    default:
      return state;
  }
};

export default reviewReducer;
