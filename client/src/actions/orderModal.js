import {
  HIDE_ORDER_MODAL as HIDE_ORDER_MODAL,
  SHOW_ORDER_MODAL as SHOW_ORDER_MODAL,
} from "../constants/actionTypes";

export const showOrderModal = (order) => ({
  type: SHOW_ORDER_MODAL,
  order,
});

export const hideOrderModal = () => {
  return {
    type: HIDE_ORDER_MODAL,
  };
};
