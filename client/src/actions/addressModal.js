import {
  HIDE_ADDRESS_MODAL,
  SHOW_ADDRESS_MODAL,
} from "../constants/actionTypes";

export const showAddressModal = (addressId) => ({
  type: SHOW_ADDRESS_MODAL,
  payload: addressId,
});

export const hideAddressModal = () => {
  return {
    type: HIDE_ADDRESS_MODAL,
  };
};
