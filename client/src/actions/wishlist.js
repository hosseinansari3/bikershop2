import { fetchWishlistAPI, updateWishlistAPI } from "../api";
import {
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
      console.log("wiwhhh" + JSON.stringify(response.data));

      dispatch({ type: FETCH_WISHLIST, payload: response.data.wishlist });
    } catch (error) {
      console.log(error);
    }
  };
};
