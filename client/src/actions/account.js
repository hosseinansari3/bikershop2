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
    console.log("prof" + JSON.stringify(profile));

    try {
      const response = await updateProfileAPI(profile);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};
