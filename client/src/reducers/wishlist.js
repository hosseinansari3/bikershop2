import {
  DELETE_WISHLIST_SUCCESS,
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

    case DELETE_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (wishlistItem) => !action.payload.includes(wishlistItem._id)
        ),
      };

    default:
      return state;
  }
};

export default wishListReducer;
