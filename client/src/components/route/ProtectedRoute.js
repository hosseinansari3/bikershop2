// PrivateRoute.js

import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ destination }) => {
  // Add your own authentication logic here
  const userInfo = useSelector((state) => state.usersSignin.userInfo);
  const navigate = useNavigate();

  const isLoggedIn = userInfo !== null && userInfo !== undefined;

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
