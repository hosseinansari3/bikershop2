import { HIDE_ORDER_MODAL, SHOW_ORDER_MODAL } from "../constants/actionTypes";

// reducers/modalReducer.js
const initialState = {
  isOpen: false,
  order: {},
};

const orderModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ORDER_MODAL:
      return {
        isOpen: true,
        order: action.order,
      };
    case HIDE_ORDER_MODAL:
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

export default orderModalReducer;
