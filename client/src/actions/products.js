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
  PRODUCT_SUGGESTIONS_CLEAR_REQUEST,
  PRODUCT_SUGGESTIONS_FETCH_REQUEST,
  PRODUCT_SEARCH_CHANGE,
  PRODUCT_SEARCH_SUCCESS,
  UPDATE,
} from "../constants/actionTypes";
import * as api from "../api/index";
import { toast } from "react-toastify";

export const getProducts = (page) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_PRODUCTS_REQUEST });
    const response = await api.fetchProducts(page);

    dispatch({ type: FETCH_ALL_PRODUCTS, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = (slug) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: slug });

  try {
    const { data } = await api.fetchProductById(slug);
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

    dispatch({ type: CREATE, payload: data });
    toast("product created");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, formData);
    console.log("update action");
    dispatch({ type: UPDATE, payload: data });
    toast("product updated");
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await api.deleteProductAPI(id);
    console.log("deleted: " + JSON.stringify(data));

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};

export const onProductSearch = (value, page) => {
  const inputValue = value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue) {
        const response = await api.searchProductAPI(inputValue, page);

        dispatch({
          type: PRODUCT_SEARCH_SUCCESS,
          payload: response.data,
        });
      } else if (inputValue === "") {
        dispatch(getProducts());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const onProductSuggestionsSearch = (v) => {
  return {
    type: PRODUCT_SEARCH_CHANGE,
    payload: v,
  };
};

export const onProductSuggestionsFetchRequested = (value) => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue) {
        const response = await api.searchProductAPI(inputValue, 1);

        dispatch({
          type: PRODUCT_SUGGESTIONS_FETCH_REQUEST,
          payload: response.data.products,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const onProductSuggestionsClearRequested = (dispatch, getState) => {
  dispatch({
    type: PRODUCT_SUGGESTIONS_CLEAR_REQUEST,
    payload: [],
  });
};
