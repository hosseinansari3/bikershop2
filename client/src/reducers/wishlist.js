import {
  FETCH_WISHLIST,
  FETCH_WISHLIST_REQUEST,
  SET_WISHLIST_LOADING,
} from "../constants/actionTypes";

const initialState = {
  wishlistItems: [],
  loading: false,
  wishlistForm: {},
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_REQUEST:
      return {
        loading: true,
      };
    case FETCH_WISHLIST:
      return {
        ...state,
        wishlistItems: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default wishListReducer;
