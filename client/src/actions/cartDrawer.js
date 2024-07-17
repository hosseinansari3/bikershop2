import { HIDE_CART, SHOW_CART } from "../constants/actionTypes";

export const showCartDrawer = () => {
  return {
    type: SHOW_CART,
  };
};

export const hideCartDrawer = () => {
  return {
    type: HIDE_CART,
  };
};
