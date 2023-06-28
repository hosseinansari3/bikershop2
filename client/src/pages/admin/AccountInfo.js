import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  userInfoChange,
} from "../../actions/account";

function AccountInfo() {
  const accountFormData = useSelector((state) => state.account.formData);
  const account = useSelector((state) => state.account.user);

  const [preview, setPreview] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    accountFormData.avatar && console.log("avattt:" + accountFormData.avatar);
    if (
      typeof accountFormData.avatar === "object" &&
      accountFormData.avatar !== null
    ) {
      accountFormData.avatar &&
        setPreview(URL.createObjectURL(accountFormData.avatar));
    }
    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, [accountFormData]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile());
  };

  const userInfoChangeHandler = (name, value) => {
    dispatch(userInfoChange(name, value));
  };
  return (
    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          First Name
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
            defaultValue={account.firstName}
            onChange={(e) =>
              userInfoChangeHandler(e.target.name, e.target.value)
            }
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
            defaultValue={account.lastName}
            onChange={(e) =>
              userInfoChangeHandler(e.target.name, e.target.value)
            }
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
                ) : (
                  <img className="w-28 h-28" src={account.avatar} />
                )}
                <input
                  onChange={(e) =>
                    userInfoChangeHandler(e.target.name, e.target.files[0])
                  }
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
              defaultValue={account.email}
              onChange={(e) =>
                userInfoChangeHandler(e.target.name, e.target.value)
              }
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
              defaultValue={account.phoneNumber}
              onChange={(e) =>
                userInfoChangeHandler(e.target.name, e.target.value)
              }
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
          onClick={clickHandler}
          variant="contained"
        >
          Update Profile Info
        </button>
      </div>
    </div>
  );
}

export default AccountInfo;
