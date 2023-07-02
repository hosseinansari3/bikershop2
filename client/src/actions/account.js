import { toast } from "react-toastify";
import { getCurrentUserAPI, updateProfileAPI } from "../api";
import { FETCH_PROFILE } from "../constants/actionTypes";

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
      const response = await updateProfileAPI(formData, config);
      toast("Profile Info Updated!");

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
    }
  };
};
