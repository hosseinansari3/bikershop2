import {
  HIDE_ADDRESS_MODAL,
  SHOW_ADDRESS_MODAL,
} from "../constants/actionTypes";

export const showAddressModal = (order) => ({
  type: SHOW_ADDRESS_MODAL,
  order,
});

export const hideAddressModal = () => {
  return {
    type: HIDE_ADDRESS_MODAL,
  };
};
