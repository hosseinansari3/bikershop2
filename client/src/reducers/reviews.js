/*
 *
 * Review reducer
 *
 */

import {
  ADD_REVIEW,
  FETCH_MY_REVIEWS,
  FETCH_PRODUCT_REVIEWS,
  FETCH_REVIEWS,
  FETCH_REVIEWS_REQUEST,
  REMOVE_REVIEW,
  RESET_REVIEW,
  REVIEW_CHANGE,
  SET_REVIEWS_LOADING,
  SET_REVIEW_FORM_ERRORS,
  UPDATE_REVIEW,
} from "../constants/actionTypes";

const initialState = {
  reviews: [],
  isLoading: false,

  productReviews: [],
  userReviews: [],

  reviewFormData: {
    title: "",
    review: "",
    rating: 0,
  },
  reviewFormErrors: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };

    case UPDATE_REVIEW:
      const updated = state.reviews.map((review) =>
        review._id === action.payload._id ? action.payload : review
      );
      return { loading: false, reviews: updated };

    case FETCH_PRODUCT_REVIEWS:
      return {
        ...state,
        productReviews: action.payload.reviews,
        loading: false,
      };
    case FETCH_MY_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
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
