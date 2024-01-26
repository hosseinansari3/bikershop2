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
} from "../constants/actionTypes";
import * as api from "../api/index";

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    const { data } = await api.createCategoryAPI(category);
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
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
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAILURE, payload: error.message });
  }
};
