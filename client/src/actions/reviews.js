import { toast } from "react-toastify";
import {
  addReviewAPI,
  fetchAllReviewsAPI,
  fetchMyReviewsAPI,
  fetchProductReviewsAPI,
  updateReviewAPI,
} from "../api";
import {
  FETCH_MY_REVIEWS,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_ALL_REVIEWS_SUCCESS,
  FETCH_REVIEWS_REQUEST,
  LOAD_MORE_REVIEWS,
  MY_REVIEWS_LOAD_MORE_SUCCESS,
  RESET_REVIEW,
  REVIEW_CHANGE,
  SET_REVIEW_FORM_ERRORS,
  UPDATE_REVIEW_SUCCESS,
} from "../constants/actionTypes";
import { allFieldsValidation, santizeFields } from "../utils/validation";
import { REVIEW_STATUS } from "../constants/panelConstants";

export const reviewChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: REVIEW_CHANGE,
    payload: formData,
  };
};

export const addProductReview = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        title: "required",
        review: "required",
      };

      const review = getState().review.reviewFormData;
      const product = getState().ProductDetails.product;
      const userinf = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userinf.token}`,
        },
      };
      const newReview = {
        product: product._id,
        review: review.review,
        title: review.title,
        rating: review.rating,
      };

      const { isValid, errors } = allFieldsValidation(newReview, rules, {
        "required.title": "Title is required.",
        "required.review": "Review is required.",
      });

      if (!isValid) {
        return dispatch({ type: SET_REVIEW_FORM_ERRORS, payload: errors });
      }

      const santizedReview = santizeFields(newReview);
      const response = await addReviewAPI(santizedReview, config);

      if (response.data.success === true) {
        toast(response.data.message);
        dispatch(
          fetchProductReviews(product.slug, { status: REVIEW_STATUS.Approved })
        );
        console.log(response.data.message);

        dispatch({ type: RESET_REVIEW });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProductReviews = (slug, filters) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchProductReviewsAPI(slug, filters);

      dispatch({
        type: FETCH_PRODUCT_REVIEWS_SUCCESS,
        payload: {
          reviews: response.data.reviews,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateReview = (id, updated) => async (dispatch) => {
  try {
    const { data } = await updateReviewAPI(id, updated);

    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
    toast("Review updated");
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMyReviews = (limit) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });
    try {
      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userinfo.token}`,
        },
        params: { limit: limit },
      };

      const response = await fetchMyReviewsAPI(config);

      dispatch({
        type: FETCH_MY_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchReviews = (skip, limit) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });

    try {
      const response = await fetchAllReviewsAPI(skip, limit);

      const { reviews } = response.data;

      dispatch({ type: FETCH_ALL_REVIEWS_SUCCESS, payload: reviews });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadMoreReviews = (skip, limit) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });

    try {
      const response = await fetchAllReviewsAPI(skip, limit);

      const { reviews } = response.data;

      dispatch({ type: LOAD_MORE_REVIEWS, payload: reviews });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadMoreMyReviews = (skip, limit) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });

    try {
      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userinfo.token}`,
        },
        params: { skip: skip, limit: limit },
      };

      const response = await fetchMyReviewsAPI(config);

      dispatch({ type: MY_REVIEWS_LOAD_MORE_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
