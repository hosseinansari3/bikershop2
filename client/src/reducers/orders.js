import {
  ORDER_ALL_LIST_SUCCESS,
  ORDER_ALL_LIST_UPDAT,
  ORDER_ALL_LOAD_MORE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_SEARCH_SUCCESS,
  ORDER_USER_LIST_SUCCESS,
} from "../constants/actionTypes";

// create an order
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

// reducer to list orders of the particular user
export const orderListUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_USER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_ALL_LIST_SUCCESS:
      console.log("state", state);
      console.log("action.payload", action.payload);

      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_ALL_LOAD_MORE_SUCCESS:
      //console.log("state", state);
      //console.log("action.payload", action.payload);

      return {
        loading: false,
        orders: [...state.orders, ...action.payload],
      };

    case ORDER_ALL_LIST_UPDAT:
      const updated = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      return { loading: false, orders: updated };
    case ORDER_SEARCH_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
