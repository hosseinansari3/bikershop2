import {
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_REQUEST,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/actionTypes";

const initialState = {
  products: [],
  loading: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_PRODUCTS:
      return { ...state, loading: false, products: [...action.payload] };

    case CREATE:
      return { ...state, products: [...action.payload] };
    case UPDATE:
      return state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
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
