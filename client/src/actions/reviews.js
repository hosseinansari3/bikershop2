import { toast } from "react-toastify";
import {
  addReviewAPI,
  fetchAllReviewsAPI,
  fetchMyReviewsAPI,
  fetchProductReviewsAPI,
} from "../api";
import {
  FETCH_MY_REVIEWS,
  FETCH_PRODUCT_REVIEWS,
  FETCH_REVIEWS,
  RESET_REVIEW,
  REVIEW_CHANGE,
  SET_REVIEWS_LOADING,
  SET_REVIEW_FORM_ERRORS,
} from "../constants/actionTypes";
import { allFieldsValidation, santizeFields } from "../utils/validation";

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
      const user = getState().usersSignin.userInfo.user;
      const userinf = getState().usersSignin.userInfo;

      console.log("token:" + userinf.token);

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
        dispatch(fetchProductReviews(product.slug));
        console.log(response.data.message);

        dispatch({ type: RESET_REVIEW });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProductReviews = (slug) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetchProductReviewsAPI(slug);

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

export const fetchMyReviews = () => {
  return async (dispatch, getState) => {
    try {
      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userinfo.token}`,
        },
      };

      const response = await fetchMyReviewsAPI(config);

      console.log("kossianooo" + JSON.stringify(response.data));

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
export const fetchReviews = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_REVIEWS_LOADING, payload: true });
      console.log("SET_REVIEWS_LOADING");

      const response = await fetchAllReviewsAPI();

      const { reviews } = response.data;
      console.log("mossianooo");

      dispatch({ type: FETCH_REVIEWS, payload: reviews });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_REVIEWS_LOADING, payload: false });
    }
  };
};
