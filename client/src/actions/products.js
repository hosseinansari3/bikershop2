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

export const onProductSearch = (value) => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await api.searchProductAPI(inputValue);

        dispatch({
          type: PRODUCT_SEARCH_SUCCESS,
          payload: response.data.products,
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
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await api.searchProductAPI(inputValue);

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
