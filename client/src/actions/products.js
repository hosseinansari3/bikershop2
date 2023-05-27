import {
  FETCH_ALL_PRODUCTS,
  CREATE,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  FETCH_ALL_PRODUCTS_REQUEST,
} from "../constants/actionTypes";
import * as api from "../api/index";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_PRODUCTS_REQUEST });
    const { data } = await api.fetchProducts();
    dispatch({ type: FETCH_ALL_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  try {
    const { data } = await api.fetchProductById(productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(product);
    console.log(product);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await api.deleteProduct(id);
    console.log("reeeqqqq");
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data._id,
    });
    console.log("reeeqqqq");
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};