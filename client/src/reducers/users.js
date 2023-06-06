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
      console.log("FETCH_ALL_USERS:" + action.payload);
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
  console.log("Info:" + userInfo);
  if (userInfo !== undefined) {
    return JSON.parse(userInfo);
  } else {
    console.log("else");

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
      console.log("req" + getLocalUserInfo());

      return {
        ...state,
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      console.log("SUCCESS" + getLocalUserInfo());

      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      console.log("LOGOUT" + getLocalUserInfo());
      return {};

    default:
      return state;
  }
};
