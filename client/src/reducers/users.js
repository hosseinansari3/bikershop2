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
} from "../constants/actionTypes";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case FETCH_ALL_USERS_REQUEST:
      return { loading: true };

    case FETCH_ALL_USERS:
      return { loading: false, users: [...action.payload] };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
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
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
