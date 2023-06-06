import { FETCH_WISHLIST, SET_WISHLIST_LOADING } from "../constants/actionTypes";

const initialState = {
  wishlistItems: [],
  isLoading: false,
  wishlistForm: {},
};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST:
      return {
        ...state,
        wishlistItems: action.payload,
      };
    case SET_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default wishListReducer;
