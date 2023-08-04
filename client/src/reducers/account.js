import {
  DELET_PROFILE_INFO,
  FETCH_PROFILE,
  FETCH_PROFILE_REQUEST,
} from "../constants/actionTypes";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  },
  loading: false,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
      };
    case DELET_PROFILE_INFO:
      return {
        user: [],
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
