// PrivateRoute.js

import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { fetchProfile } from "../../actions/account";
import { useIsMount } from "../../hooks/useIsMount";

const ProtectedRoute = ({ destination }) => {
  // Add your own authentication logic here
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();

  const { user, loading } = account;

  useEffect(() => {
    console.log("ACCOU", account);
  }, [account]);

  const isLoggedIn = user !== undefined && Object.keys(user).length > 0;

  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      if (!loading) {
        if (!isLoggedIn) {
          navigate("/login", {
            state: destination ? { destination: destination } : null,
          });
        }
      }
    }
  }, [isLoggedIn, isMount, loading]);

  useEffect(() => {
    console.log("isMount", isMount);
  }, [isMount]);

  return (
    <>
      {loading && (
        <div className="bg-gray-200 flex justify-center items-center w-[100vw] h-[100vh] absolute z-40 transition-all">
          <LoadingIndicator />
        </div>
      )}
      {isLoggedIn && <Outlet />}
    </>
  );
};
export default ProtectedRoute;
