import { toast } from "react-toastify";
import {
  editeAddressAPI,
  getCurrentUserAPI,
  updateAddressAPI,
  updateProfileAPI,
} from "../api";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_REQUEST,
  NOT_AUTHORIZED,
} from "../constants/actionTypes";

export const updateProfile = (formData) => {
  return async (dispatch, getState) => {
    const userinfo = getState().usersSignin.userInfo;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    try {
      dispatch({ type: FETCH_PROFILE_REQUEST });

      const response = await updateProfileAPI(formData, config);
      toast("Profile Info Updated!");

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserAddress = (address) => {
  return async (dispatch, getState) => {
    const userinfo = getState().usersSignin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    try {
      dispatch({ type: FETCH_PROFILE_REQUEST });

      const response = await updateAddressAPI(address, config);
      toast("Adress added");

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editeAddress = (addressId, address) => {
  return async (dispatch, getState) => {
    const userinfo = getState().usersSignin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    try {
      dispatch({ type: FETCH_PROFILE_REQUEST });

      const response = await editeAddressAPI(addressId, address, config);
      toast("Adress edited");
      console.log("response", response);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      const userinfo = getState().usersSignin.userInfo;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userinfo.token}`,
        },
      };

      const response = await getCurrentUserAPI(config);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch({ type: NOT_AUTHORIZED });
      }
    }
  };
};
