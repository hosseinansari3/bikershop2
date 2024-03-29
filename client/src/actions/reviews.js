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
  FETCH_PRODUCT_REVIEWS,
  FETCH_REVIEWS,
  FETCH_REVIEWS_REQUEST,
  RESET_REVIEW,
  REVIEW_CHANGE,
  SET_REVIEWS_LOADING,
  SET_REVIEW_FORM_ERRORS,
  UPDATE_REVIEW,
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
        type: FETCH_PRODUCT_REVIEWS,
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
    console.log("update action", data);

    dispatch({ type: UPDATE_REVIEW, payload: data });
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
      };

      const response = await fetchMyReviewsAPI(config, limit);

      dispatch({
        type: FETCH_MY_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// fetch reviews api
export const fetchReviews = (limit) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });

    try {
      dispatch({ type: SET_REVIEWS_LOADING, payload: true });

      const response = await fetchAllReviewsAPI(limit);

      const { reviews } = response.data;

      dispatch({ type: FETCH_REVIEWS, payload: reviews });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_REVIEWS_LOADING, payload: false });
    }
  };
};
