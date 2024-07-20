import {
  DELET_PROFILE_INFO,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_REQUEST,
  NOT_AUTHORIZED,
} from "../constants/actionTypes";

const initialState = {
  user: {},
  loading: false,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        user: {
          ...action.payload,
        },
        loading: false,
      };
    case DELET_PROFILE_INFO:
      return {
        user: [],
        loading: false,
      };
    case NOT_AUTHORIZED:
      return {
        loading: false,
      };
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
        },
        loading: true,
      };

    default:
      return state;
  }
};
