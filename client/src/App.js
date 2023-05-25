import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage";
import BikesPage from "./pages/products/BikesPage";

import UserPanel from "./pages/user/UserPanel";
import LoginPage from "./pages/user/UserLogin";
import RegisterPage from "./pages/user/UserRegister";
import Panel from "./pages/admin/Panel";
import Product from "./pages/product/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Setting from "./pages/admin/Setting";
import Customers from "./pages/admin/Customers";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import AddProduct from "./pages/admin/AddProduct";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      {!window.location.href.includes("panel") &&
      window.location.pathname !== "/user" ? (
        <Header />
      ) : null}
      <Routes>
        <Route path="bikes" element={<BikesPage />} />

        <Route path="/product/:id" element={<Product />} />
        <Route path="user" element={<UserPanel />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="register" element={<RegisterPage />} />
        <Route index path="/" element={<MainPage />} />

        <Route path="panel" element={<Panel />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Setting" element={<Setting />} />
          <Route path="customers" element={<Customers />} />
          <Route path="Products" element={<Products />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="AddProducts" element={<AddProduct />} />
        </Route>
      </Routes>

      {!window.location.href.includes("panel") &&
      window.location.pathname !== "/user" ? (
        <Footer />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
