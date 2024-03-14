import { HIDE_MODAL, SHOW_MODAL } from "../constants/actionTypes";

export const showModal = (order) => ({
  type: SHOW_MODAL,
  order,
});

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};
