import {
  FETCH_PROFILE,
  SET_PROFILE_LOADING,
  ACCOUNT_INFO_CHANGE,
  ACCOUNT_FORMDATA_CLEAR,
} from "../constants/actionTypes";

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  },
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  },
  isLoading: false,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFO_CHANGE:
      console.log("USER_INFO_CHANGE" + JSON.stringify(state.formData));
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
        user: {
          ...state.user,
        },
      };
    case FETCH_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case SET_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACCOUNT_FORMDATA_CLEAR:
      return {
        ...state,
        formData: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          avatar: "",
        },
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          avatar: "",
        },
      };
    default:
      return state;
  }
};