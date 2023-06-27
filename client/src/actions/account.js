import { updateProfileAPI } from "../api";
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
    const profile = getState().account.user;
    console.log("prof" + profile.avatar);

    const formData = new FormData();
    formData.append("images", profile.avatar);
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);

    formData.append("email", profile.emailAdress);

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
