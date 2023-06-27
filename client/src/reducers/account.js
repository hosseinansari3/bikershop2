import {
  FETCH_PROFILE,
  SET_PROFILE_LOADING,
  ACCOUNT_INFO_CHANGE,
} from "../constants/actionTypes";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    emailAdress: "",
    phoneNumber: "",
  },
  isLoading: false,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INFO_CHANGE:
      console.log("USER_INFO_CHANGE" + JSON.stringify(action.payload));
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
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
    default:
      return state;
  }
};
