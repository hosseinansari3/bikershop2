import {
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_REQUEST,
  CREATE,
  UPDATE,
  DELETE_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_CHANGE,
  PRODUCT_SUGGESTIONS_FETCH_REQUEST,
  PRODUCT_SUGGESTIONS_CLEAR_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  products: [],
  loading: false,
  searchValue: "",
  searchSuggestions: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_PRODUCTS:
      return { ...state, loading: false, products: [...action.payload] };

    case PRODUCT_SEARCH_SUCCESS:
      return { ...state, loading: false, products: [...action.payload] };

    case CREATE:
      return { ...state, products: [...action.payload] };
    case UPDATE:
      return state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => !action.payload.includes(product._id)
        ),
      };
    case PRODUCT_SEARCH_CHANGE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case PRODUCT_SUGGESTIONS_FETCH_REQUEST:
      return {
        ...state,
        searchSuggestions: action.payload,
      };
    case PRODUCT_SUGGESTIONS_CLEAR_REQUEST:
      return {
        ...state,
        searchSuggestions: action.payload,
      };

    default:
      return state;
  }
};

const initialState2 = {
  loading: true,
  product: {},
};
// ProductDetails Reducer
export const ProductDetailsReducer = (state = initialState2, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
