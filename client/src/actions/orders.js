import { toast } from "react-toastify";
import { updateProduct } from "./products";
import {
  createOrderAPI,
  listAllOrdersAPI,
  listUserOrdersAPI,
  searchOrderAPI,
  updateOrderAPI,
} from "../api";
import {
  ORDER_ALL_LIST_SUCCESS,
  ORDER_ALL_LIST_UPDAT,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_SEARCH_SUCCESS,
  ORDER_USER_LIST_SUCCESS,
  PRODUCT_SEARCH_SUCCESS,
} from "../constants/actionTypes";
import { emptyCart } from "./cart";

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
    dispatch(emptyCart());
    toast("Your Order Submitted!");
    console.log("order", data);
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

export const updateOrder = (id, updated) => async (dispatch) => {
  try {
    const { data } = await updateOrderAPI(id, updated);
    console.log("update action", data);

    dispatch({ type: ORDER_ALL_LIST_UPDAT, payload: data });
    toast("order updated");
  } catch (error) {
    console.log(error.message);
  }
};

export const listMyOrders =
  (limit, filters, sort) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });

      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userinfo.token}`,
        },
        params: { limit: limit, filters: filters, sort: sort },
      };

      const { data } = await listUserOrdersAPI(config);

      dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAllOrders =
  (skip, limit, filters, sort) => async (dispatch, getState) => {
    try {
      console.log("getState", getState().orderListUser);

      dispatch({ type: ORDER_LIST_REQUEST });

      const { data } = await listAllOrdersAPI(skip, limit, filters, sort);

      dispatch({ type: ORDER_ALL_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const onOrderSearch = (value) => {
  const inputValue = value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue) {
        const response = await searchOrderAPI(inputValue);

        console.log("res:" + JSON.stringify(response.data));

        dispatch({
          type: ORDER_SEARCH_SUCCESS,
          payload: response.data,
        });
      } else if (inputValue === "") {
        dispatch(listAllOrders());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
