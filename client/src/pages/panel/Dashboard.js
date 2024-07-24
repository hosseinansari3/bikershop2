import React from "react";
import { ROLES } from "../../constants/panelConstants";

import AdminDash from "../../components/Dashboard/AdminDash";
import CustomerDash from "../../components/Dashboard/CustomerDash";

import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.usersSignin.userInfo.user);

  return <>{user.role === ROLES.Admin ? <AdminDash /> : <CustomerDash />}</>;
}

export default Dashboard;
