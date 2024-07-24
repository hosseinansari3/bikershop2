import { toast } from "react-toastify";
import { deleteWishlistAPI, fetchWishlistAPI, updateWishlistAPI } from "../api";
import {
  DELETE_WISHLIST_FAIL,
  DELETE_WISHLIST_REQUEST,
  DELETE_WISHLIST_SUCCESS,
  FETCH_WISHLIST,
  FETCH_WISHLIST_REQUEST,
} from "../constants/actionTypes";

export const updateWishlist = (item) => {
  const { productId } = item;
  return async (dispatch, getState) => {
    try {
      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userinfo.token}`,
        },
      };
      const response = await updateWishlistAPI(item, config);
      if (response.data.success === true) {
        dispatch(fetchWishlist());
        toast("Your Wishlist Updated!");
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
};

// fetch wishlist api
export const fetchWishlist = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_WISHLIST_REQUEST });
      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userinfo.token}`,
        },
      };

      const response = await fetchWishlistAPI(config);

      dispatch({ type: FETCH_WISHLIST, payload: response.data.wishlist });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WISHLIST_REQUEST });
    const { data } = await deleteWishlistAPI(id);

    dispatch({
      type: DELETE_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: DELETE_WISHLIST_FAIL, payload: error.message });
  }
};
