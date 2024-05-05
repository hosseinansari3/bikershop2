import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  FETCH_ALL_USERS,
  USER_LOGOUT,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  USER_REGISTER_SUCCESS,
  ACCOUNT_FORMDATA_CLEAR,
  FETCH_ALL_USERS_REQUEST,
  SET_SIGNUP_FORM_ERRORS,
  SET_LOGIN_FORM_ERRORS,
  USER_SEARCH_SUCCESS,
  DELET_PROFILE_INFO,
  FETCH_PROFILE,
} from "../constants/actionTypes";
import * as api from "../api/index";

import setAuthToken from "../utils/setAuthToken";
import { toast } from "react-toastify";
import { allFieldsValidation } from "../utils/validation";
import { fetchProfile } from "./account";

export const getUsers = (page) => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS_REQUEST });

  try {
    const response = await api.fetchUsers(page);
    console.log("data" + JSON.stringify(response.data));
    dispatch({ type: FETCH_ALL_USERS, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const rules = {
      email: "required|email",
      password: "required|min:6",
    };

    const user = {
      email: email,
      password: password,
    };
    const { isValid, errors } = allFieldsValidation(user, rules, {
      "required.email": "Email is required.",
      "email.email": "Email format is invalid.",
      "required.password": "Password is required.",
      "min.password": "Password must be at least 6 characters.",
    });

    if (!isValid) {
      return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors });
    }

    // use axios for http post request when user signing in
    const { data } = await api.signIn(email, password);
    const token = data.token;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userInfo", JSON.stringify(data));

    setAuthToken(token);
    // if success, dispatch success and set payload to data
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // dispatch({ type: FETCH_PROFILE });
    dispatch(fetchProfile());

    const patse = localStorage.getItem("userInfo");
    toast("LOGGED IN SUCCESSFULLY!");

    // save data to localStorage
  } catch (error) {
    // if error, dispatch FAIL, set payload to error message
    toast(error.response.data.error);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (name, email, password, navigate) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });

    try {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      const rules = {
        email: "required|email",
        password: "required|min:6",
        name: "required",
      };

      const { isValid, errors } = allFieldsValidation(newUser, rules, {
        "required.email": "Email is required.",
        "required.password": "Password is required.",
        "required.name": "name is required.",
      });

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      const { data } = await api.registerUser(name, email, password);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      navigate("/login");
      toast("Registered SUCCESSFULLY!");
    } catch (error) {
      toast(error.response.data.error);

      // if error, dispatch FAIL, set payload to error message
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: DELET_PROFILE_INFO });
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await api.deleteUser(id);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.message });
  }
};

export const onUsersSearch = (value, page) => {
  const inputValue = value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue) {
        const response = await api.searchUserAPI(inputValue, page);
        console.log("inputValue: " + inputValue);

        dispatch({
          type: USER_SEARCH_SUCCESS,
          payload: response.data,
        });

        console.log("users: " + response.data.users);
      } else if (inputValue === "") {
        dispatch(getUsers());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
