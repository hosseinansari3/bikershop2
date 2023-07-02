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
} from "../constants/actionTypes";
import * as api from "../api/index";

import setAuthToken from "../utils/setAuthToken";
import { toast } from "react-toastify";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS_REQUEST });

  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    // use axios for http post request when user signing in
    const { data } = await api.signIn(email, password);
    const token = data.token;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userInfo", JSON.stringify(data));

    setAuthToken(token);
    // if success, dispatch success and set payload to data
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    const patse = localStorage.getItem("userInfo");
    console.log(patse);

    // save data to localStorage
  } catch (error) {
    // if error, dispatch FAIL, set payload to error message
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
      // use axios for http post request when user REGISTERg in
      const { data } = await api.registerUser(name, email, password);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      navigate("/login");
      toast("Registered SUCCESSFULLY!");
    } catch (error) {
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
  dispatch({ type: ACCOUNT_FORMDATA_CLEAR });
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await api.deleteUser(id);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data._id,
    });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.message });
  }
};
