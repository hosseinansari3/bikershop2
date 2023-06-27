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

    const userinfo = getState().usersSignin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await createOrderAPI(order, config);

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

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_USER_LIST_REQUEST });

    const userinfo = getState().usersSignin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    const { data } = await listUserOrdersAPI(config);

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
