import {
  HIDE_ADDRESS_MODAL,
  SHOW_ADDRESS_MODAL,
} from "../constants/actionTypes";

// reducers/modalReducer.js
const initialState = {
  isOpen: false,
  addressId: "",
};

const addressModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADDRESS_MODAL:
      console.log("AY", action.payload);
      return {
        isOpen: true,
        addressId: action.payload,
      };
    case HIDE_ADDRESS_MODAL:
      return {
        isOpen: false,
      };
    // Add other cases if needed (e.g., HIDE_MODAL)
    default:
      return state;
  }
};

export default addressModalReducer;
