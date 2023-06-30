import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { signin } from "../../actions/users";
import { Link } from "react-router-dom";
import "./UserLogin.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Slide, toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setisLoggedin] = useState(false);

  const userSignin = useSelector((state) => state.usersSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo !== null && typeof userInfo !== undefined) {
      setisLoggedin(true);
    }
  }, [dispatch, userInfo]);

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // signin action here
    dispatch(signin(email, password));
  };
  const navigate = useNavigate();

  const loginSuccessNotif = () => toast("LOGGED IN SUCCESSFULLY!");

  useEffect(() => {
    if (isLoggedin) {
      loginSuccessNotif();
      navigate("/");
      console.log("logged in!");
    }
  }, [userInfo]);

  const validate = () =>
    Yup.object({
      username: Yup.string()
        .min(2, "Must be more than one character")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Must be more than 8 characters")
        .required("This field is required"),
    });

  const loginUser = (email, password) => {
    dispatch(signin(email, password))
      .then((res) => {
        toast.success(res, {
          position: toast.POSITION.BOTTOM_LEFT,
          transition: Slide,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false,
        });
      });
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={submitHandler}
                type="submit"
                class="w-full text-white bg-gray-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
