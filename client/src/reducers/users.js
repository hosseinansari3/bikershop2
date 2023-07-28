import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  FETCH_ALL_USERS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  FETCH_ALL_USERS_REQUEST,
  DELETE_USER_SUCCESS,
  SET_SIGNUP_FORM_ERRORS,
  SET_LOGIN_FORM_ERRORS,
  USER_SEARCH_SUCCESS,
} from "../constants/actionTypes";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case FETCH_ALL_USERS_REQUEST:
      return { loading: true };

    case FETCH_ALL_USERS:
      return {
        loading: false,
        users: [...action.payload.users],
        totalPages: action.payload.pages,
        pageSize: action.payload.pageSize,
        totalUsers: action.payload.totalUsers,
      };
    case USER_SEARCH_SUCCESS:
      return {
        loading: false,
        users: [...action.payload.users],
        totalPages: action.payload.pages,
        pageSize: action.payload.pageSize,
        totalUsers: action.payload.totalUsers,
      };

    case SET_SIGNUP_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
        loading: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => !action.payload.includes(user._id)),
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const getLocalUserInfo = () => {
  let userInfo = localStorage.getItem("userInfo");

  if (userInfo !== undefined) {
    return JSON.parse(userInfo);
  } else {
    return {};
  }
};

// User SignunReducer
export const userSigninReducer = (
  state = {
    userInfo: getLocalUserInfo(),
    userInfoFormData: {
      title: "",
      review: "",
      rating: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SET_LOGIN_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
        loading: false,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
