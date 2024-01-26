import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  CATEGORIES_FETCH_REQUEST,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_DELETE_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  categories: [],
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case CATEGORY_CREATE_FAILURE:
      return { loading: false, error: action.payload };

    case CATEGORIES_FETCH_REQUEST:
      return { loading: true };
    case CATEGORIES_FETCH_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => !action.payload.includes(category._id)
        ),
      };
    default:
      return state;
  }
};
