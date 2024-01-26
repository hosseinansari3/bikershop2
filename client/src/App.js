import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage";
import BikesPage from "./pages/products/BikesPage";

import LoginPage from "./pages/user/UserLogin";
import RegisterPage from "./pages/user/UserRegister";
import Panel from "./pages/admin/Panel";
import Product from "./pages/product/Product";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import AddProduct from "./pages/admin/AddProduct";
import EditeProduct from "./pages/admin/EditeProduct";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/admin/Wishlist";
import Reviews from "./pages/admin/Reviews";
import AccountInfo from "./pages/admin/AccountInfo";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {!location.pathname.includes("/panel") &&
      location.pathname !== "/user" &&
      location.pathname !== "/panel" ? (
        <Header />
      ) : null}

      <Routes>
        <Route exact path="/product/:slug" element={<Product />} />

        <Route path="bikes" element={<BikesPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="register" element={<RegisterPage />} />
        <Route exact index path="/" element={<MainPage />} />

        <Route path="panel" element={<Panel />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="Products" element={<Products />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="account-info" element={<AccountInfo />} />

          <Route path="AddProducts" element={<AddProduct />} />
          <Route path="EditeProduct/:slug" element={<EditeProduct />} />
        </Route>
      </Routes>

      {!window.location.href.includes("panel") &&
      window.location.pathname !== "/user" ? (
        <Footer />
      ) : null}
    </>
  );
}

export default App;
