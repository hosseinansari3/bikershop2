import { HIDE_CART, SHOW_CART } from "../constants/actionTypes";

// reducers/modalReducer.js
const initialState = {
  isOpen: false,
};

const cartDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CART:
      console.log("AY", action.payload);
      return {
        isOpen: true,
      };
    case HIDE_CART:
      return {
        isOpen: false,
      };
    // Add other cases if needed (e.g., HIDE_MODAL)
    default:
      return state;
  }
};

export default cartDrawerReducer;
