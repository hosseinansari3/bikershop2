import { createOrderAPI, listUserOrdersAPI } from "../api";
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_USER_LIST_FAILURE,
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
} from "../constants/actionTypes";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { data } = await createOrderAPI(order);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_USER_LIST_REQUEST });
    const { data } = await listUserOrdersAPI(user);

    dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data });
    console.log("dispatch:" + JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
