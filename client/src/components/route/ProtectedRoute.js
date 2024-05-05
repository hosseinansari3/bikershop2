// PrivateRoute.js

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ destination }) => {
  // Add your own authentication logic here
  const userInfo = useSelector((state) => state.account);

  const isLoggedIn =
    userInfo?.user !== undefined && Object.keys(userInfo?.user).length > 0;
  console.log("userInfo", userInfo);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      state={destination ? { destination: destination } : null}
      to="/login"
    />
  );
};

export default ProtectedRoute;
