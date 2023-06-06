import { fetchWishlistAPI, updateWishlistAPI } from "../api";
import { FETCH_WISHLIST, SET_WISHLIST_LOADING } from "../constants/actionTypes";

export const updateWishlist = (item) => {
  const { productId, userId } = item;
  return async (dispatch, getState) => {
    try {
      if (userId !== null) {
        console.log("user:" + userId);
        const response = await updateWishlistAPI(item);
        if (response.data.success === true) {
          dispatch(fetchWishlist(userId));
        }
        console.log(response.data.message);
      } else {
        console.log("Please login to wishlist a product");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// fetch wishlist api
export const fetchWishlist = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_WISHLIST_LOADING, payload: true });

      const response = await fetchWishlistAPI(user);

      dispatch({ type: FETCH_WISHLIST, payload: response.data.wishlist });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_WISHLIST_LOADING, payload: false });
    }
  };
};
