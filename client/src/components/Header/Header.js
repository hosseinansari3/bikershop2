import React, { useState, useEffect } from "react";
import "./header.css";
import {
  Search,
  ShoppingCart,
  AccountCircle,
  Close,
  Login,
  Logout,
  FavoriteBorder,
} from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import Navbarr from "./Navbarr";
import { logout } from "../../actions/users";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../actions/cart";

import { menuItems } from "./menuItemss";
import MenuItems from "./MenuItems";

function Header() {
  const userInfo = useSelector((state) => state.usersSignin.userInfo);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [profiletIsOpen, setProfileIsOpen] = useState(false);

  const [userName, setuserName] = useState("");

  const [isLoggedin, setisLoggedin] = useState(false);

  const openCart = () => {
    setCartIsOpen(true);
  };
  const closeCart = () => {
    setCartIsOpen(false);
  };

  const toggleProfile = () => {
    setProfileIsOpen(!profiletIsOpen);
  };

  const [isBurgerOpen, setBugerOpen] = useState(false);
  const burgerToggling = () => setBugerOpen(!isBurgerOpen);

  const { cartItems } = cart;

  useEffect(() => {
    if (userInfo !== null && userInfo !== undefined) {
      setisLoggedin(true);

      setuserName(userInfo?.user.firstName);
    } else {
      setisLoggedin(false);
    }
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    setisLoggedin(false);
    toggleProfile();
  };

  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));

  const removeFromCardHandler = (product) => {
    dispatch(removeFromCart(product));
  };

  const [total, setTotal] = useState(0);

  const handleTotalChange = () => {
    let total = 0.0;
    savedCartItems?.map((item) => {
      let itemPrice = parseFloat(item.price.replace(/[^\d\.]*/g, ""));
      let itemTotal = itemPrice * parseFloat(item.quantity);
      total = itemTotal + total;
    });

    setTotal(total);
  };

  useEffect(() => {
    handleTotalChange();
  }, [savedCartItems]);

  return (
    <header className="header" style={{ zIndex: "30" }}>
      <div
        className="py-8 grid grid-cols-5"
        style={{ backgroundColor: "black" }}
      >
        <div className="flex  items-center col-span-3 md:col-span-2 lg:col-span-1">
          <div
            className={isBurgerOpen ? "open lg:hidden" : "lg:hidden"}
            id="nav-icon3"
            onClick={burgerToggling}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="Logo ml-2">
            <Link className="text-[30px] font-bold" to="/">
              {" "}
              BIKER-SHOP
            </Link>
          </div>
        </div>

        <div className="hidden md:flex  justify-center items-center col-span-2 lg:col-span-3">
          <div className="SearchContainer">
            <input />
            <div className="search-icon">
              <Search />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center col-span-2 md:col-span-1">
          <div
            className="ShoppingCartIcon"
            onMouseEnter={openCart}
            onMouseLeave={closeCart}
          >
            <ShoppingCart fontSize="large" />
            {cartIsOpen &&
              savedCartItems?.length !== 0 &&
              savedCartItems !== undefined && (
                <div className="card-dropdown">
                  <>
                    <ul>
                      {savedCartItems?.map((item) => {
                        return (
                          <li key={item.product}>
                            <div className="card-item-wrapper">
                              <img src={item.image}></img>
                              <div className="card-item-text-wrapper">
                                <div className="card-title">{item.title}</div>
                                <div className="card-price">
                                  <span>${item.price.match(/\d/g)} </span>
                                  <span>QTY: {item.quantity}</span>
                                </div>
                              </div>
                              <div
                                className="remove-cart"
                                onClick={() =>
                                  removeFromCardHandler(item.product)
                                }
                              >
                                <Close />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex justify-center bg-gray-300 font-bold p-2 text-white mb-2">
                      <span>subtotal:</span>
                      <span>${total}</span>
                    </div>
                  </>

                  <div className="card-dropdown-bottom border-top">
                    <button className="bg-gray-100">
                      <Link to="/cart">view Card</Link>
                    </button>
                    <button className="bg-gray-100">Checkout Now</button>
                  </div>
                </div>
              )}

            {cart &&
            savedCartItems?.length !== 0 &&
            savedCartItems !== undefined ? (
              <span className="cart-number">{cartItems.length}</span>
            ) : null}
          </div>

          {isLoggedin === true ? (
            <div>
              <button onClick={toggleProfile}>
                <AccountCircle className=" mx-2 text-white" fontSize="large" />
              </button>

              {profiletIsOpen && (
                <div className="text-black absolute z-50 bg-white rounded  w-28 right-16">
                  <ul>
                    <Link to="panel">
                      <li className="hover:bg-gray-100 hover:rounded px-4 py-2 flex justify-between items-center cursor-pointer">
                        <span>profile</span>
                      </li>
                    </Link>

                    <li className="hover:bg-gray-100 hover:rounded px-4 py-2  cursor-pointer">
                      <div
                        onClick={logoutHandler}
                        className="flex justify-between items-center"
                      >
                        <span>logout</span>
                        <Logout fontSize="small" />
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="AccountCircleIcon">
              <Link to="/login">
                <Login fontSize="large" />
              </Link>
            </div>
          )}
          <div className="AccountCircleIcon">
            <Link to="/">
              <FavoriteBorder fontSize="large" />
            </Link>
          </div>
        </div>
      </div>
      <Navbarr />

      <div className={isBurgerOpen ? "side active" : "side"}>
        <ul>
          {menuItems.map((item, index) => {
            const depthLevel = 0;
            return (
              <MenuItems
                isBurgur={true}
                items={item}
                key={index}
                depthLevel={depthLevel}
              />
            );
          })}
        </ul>
      </div>
      <div
        onClick={burgerToggling}
        className={isBurgerOpen ? "sidebar-overlay active" : "sidebar-overlay"}
      ></div>
    </header>
  );
}

export default Header;
