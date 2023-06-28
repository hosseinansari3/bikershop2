import { getCurrentUserAPI, updateProfileAPI } from "../api";
import { ACCOUNT_INFO_CHANGE, FETCH_PROFILE } from "../constants/actionTypes";

export const userInfoChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: ACCOUNT_INFO_CHANGE,
    payload: formData,
  };
};

export const updateProfile = () => {
  return async (dispatch, getState) => {
    const profile = getState().account.formData;

    const formData = new FormData();
    if (typeof profile.avatar == "string") {
      const response = await fetch(profile.avatar);
      // here image is url/location of image
      const blob = await response.blob();
      const profileImgFile = new File([blob], "image.jpg", { type: blob.type });
      formData.append("images", profileImgFile);
    } else {
      formData.append("images", profile.avatar);
    }

    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);

    formData.append("email", profile.email);

    formData.append("phoneNumber", profile.phoneNumber);

    const userinfo = getState().usersSignin.userInfo;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userinfo.token}`,
      },
    };

    try {
      const response = await updateProfileAPI(formData, config);

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
