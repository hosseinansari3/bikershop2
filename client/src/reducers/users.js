import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  FETCH_ALL_USERS,
  USER_LOGOUT,
} from "../constants/actionTypes";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case FETCH_ALL_USERS:
      console.log(action.payload);
      return { loading: false, users: [...action.payload] };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const getLocalUserInfo = () => {
  let userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return {};
  }
};

// User SignunReducer
export const userSigninReducer = (
  state = { userInfo: getLocalUserInfo() },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
