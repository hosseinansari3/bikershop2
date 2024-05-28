import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../../actions/account";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import defaultAvatar from "../../assets/images/Circle-icons-profile.svg.png";

function AccountInfo() {
  const account = useSelector((state) => state.account);
  const { user, loading } = account;
  const [preview, setPreview] = useState([]);
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [avatar, setAvatar] = useState();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const myDivRef = useRef();

  const handleScrollToBottom = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollIntoView(false);
      console.log("scrolled");
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAvatar(user.avatar);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  useEffect(() => {
    if (typeof avatar === "object" && avatar !== null) {
      avatar && setPreview(URL.createObjectURL(avatar));
    }
    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (typeof avatar == "string") {
      const response = await fetch(avatar);
      // here image is url/location of image
      const blob = await response.blob();
      const profileImgFile = new File([blob], "image.jpg", { type: blob.type });
      formData.append("images", profileImgFile);
    } else {
      formData.append("images", avatar);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);

    dispatch(updateProfile(formData));
  };

  return (
    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
      <div
        ref={myDivRef}
        className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
      >
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          First Name
        </label>

        {console.log("loading: " + loading)}
        {loading && <LoadingIndicator />}
        <div className="col-span-8 sm:col-span-4">
          <input
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            id="outlined-basic"
            placeholder="Enter your First Name "
            name="firstName"
            label="Product Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Last Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            placeholder="Enter your Last Name "
            className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
          ></input>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Profile Picture
        </label>
        <div className="col-span-8 sm:col-span-4">
          <label for="files">
            <div className="w-full text-center">
              <div
                for="files"
                role="button"
                tabIndex="0"
                className="flex justify-center border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
              >
                {preview !== undefined && preview.length !== 0 ? (
                  <img className="w-28 h-28" src={preview} />
                ) : avatar ? (
                  <img className="w-28 h-28" src={avatar} />
                ) : (
                  <img className="w-28 h-28" src={defaultAvatar} />
                )}
                {console.log("avat:" + avatar)}
                <input
                  onChange={(e) => setAvatar(e.target.files[0])}
                  id="files"
                  tabIndex="-1"
                  name="avatar"
                  accept="image/*"
                  type="file"
                  autoComplete="off"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Payment Method
        </label>
        <div className="col-span-8 sm:col-span-4">
          <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white">
            <option>sdfsds</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Email Adress
        </label>
        <div className="col-span-8 sm:col-span-4">
          <div className="flex flex-row">
            <input
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none rounded-l-none"
            ></input>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          Phone Number
        </label>
        <div className="col-span-8 sm:col-span-4">
          <div className="flex flex-row">
            <input
              defaultValue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              type="tel"
              className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 mr-2 rounded  w-full h-12 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none"
            ></input>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-blue-300 p-4 text-white rounded mt-8
          "
          onClick={handleSubmit}
          variant="contained"
        >
          Update Profile Info
        </button>
        <button
          className="bg-blue-300 p-4 text-white rounded mt-8
          "
          onClick={handleScrollToBottom}
        >
          SCROLL
        </button>
      </div>
    </div>
  );
}

export default AccountInfo;
