import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  CATEGORIES_FETCH_REQUEST,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
  CATEGORIES_SEARCH_SUCCESS,
} from "../constants/actionTypes";
import * as api from "../api/index";
import { toast } from "react-toastify";

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    const { data } = await api.createCategoryAPI(category);
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    toast("Category Added");
  } catch (error) {
    dispatch({ type: CATEGORY_CREATE_FAILURE, payload: error.message });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_FETCH_REQUEST });
    const { data } = await api.fetchCategoriesAPI();
    console.log("CATEGORIES", data);
    dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORIES_FETCH_FAILURE, payload: error.message });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });
    const { data } = await api.deleteCategoryAPI(id);
    console.log("deleted: " + JSON.stringify(data));

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    });
    toast("Category Deleted");
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAILURE, payload: error.message });
  }
};

export const onCategorySearch = (value) => {
  const inputValue = value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue) {
        const response = await api.searchCategoryAPI(inputValue);

        console.log("response.data", response.data);

        dispatch({
          type: CATEGORIES_SEARCH_SUCCESS,
          payload: response.data.categories,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
