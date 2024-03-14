import { HIDE_MODAL, SHOW_MODAL } from "../constants/actionTypes";

// reducers/modalReducer.js
const initialState = {
  isOpen: false,
  order: {},
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        isOpen: true,
        order: action.order,
      };
    case HIDE_MODAL:
      console.log("hideModReducer");
      return {
        isOpen: false,
        order: {},
      };
    // Add other cases if needed (e.g., HIDE_MODAL)
    default:
      return state;
  }
};

export default modalReducer;
