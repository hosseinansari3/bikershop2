import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, userInfoChange } from "../../actions/account";

function AccountInfo() {
  const account = useSelector((state) => state.account.user);

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile());
  };

  const dispatch = useDispatch();
  const userInfoChangeHandler = (name, value) => {
    dispatch(userInfoChange(name, value));
  };
  return (
    /*
    <>
      <div>
        <label>First Name</label>
        <input></input>
      </div>
      <div>
        <label>Last Name</label>
        <input></input>
      </div>
      <div>
        <label>Password</label>
        <input></input>
      </div>
      <div>
        <label>Phone Number</label>
        <input></input>
      </div>
      <div>
        <label>Email</label>
        <input></input>
      </div>
      <div>
        <label>Payment Method</label>
        <input></input>
      </div>
      <div>
        <label>Profile Picture</label>
        <input type="file"></input>
      </div>
    </>
    */
    <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
          First Name{" "}
        </label>
        <div className="col-span-8 sm:col-span-4">
          <input
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
                className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
              >
                <input
                  onChange={(e) =>
                    userInfoChangeHandler(e.target.name, e.target.files[0].name)
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
              onChange={(e) =>
                userInfoChangeHandler(e.target.name, e.target.value)
              }
              name="emailAdress"
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

      <div>
        <button onClick={clickHandler} variant="contained">
          Publish Product
        </button>
      </div>
    </div>
  );
}

export default AccountInfo;
