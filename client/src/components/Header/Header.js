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
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../actions/cart";

import { menuItems } from "./menuItemss";
import MenuItems from "./MenuItems";
import Autosuggest from "react-autosuggest";
import {
  onProductSuggestionsSearch,
  onProductSuggestionsClearRequested,
  onProductSuggestionsFetchRequested,
} from "../../actions/products";
import CartDrawer from "../Cart/CartDrawer";
import { fetchProfile } from "../../actions/account";

function Header() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.account);
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const cart = useSelector((state) => state.cart);
  const suggestions = useSelector((state) => state.products.searchSuggestions);
  const searchValue = useSelector((state) => state.products.searchValue);

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [profiletIsOpen, setProfileIsOpen] = useState(false);

  const [userName, setuserName] = useState("");

  const [isLoggedin, setisLoggedin] = useState(false);
  const [cartDrawerisOpen, setCartDrawerOpen] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

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
    if (
      userInfo?.user !== undefined &&
      Object.keys(userInfo?.user).length > 0
    ) {
      setisLoggedin(true);
      console.log("shod");
      setuserName(userInfo?.user?.firstName);
    } else {
      setisLoggedin(false);
    }
  }, [userInfo]);

  console.log("userInfo", userInfo);
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
      let itemPrice = parseFloat(item?.price?.replace(/[^\d\.]*/g, ""));
      let itemTotal = itemPrice * parseFloat(item.quantity);
      total = itemTotal + total;
    });

    setTotal(total);
  };

  useEffect(() => {
    let total = 0.0;
    savedCartItems?.length > 0 &&
      savedCartItems?.map((item) => {
        let itemPrice = parseFloat(item.price);
        let itemTotal = itemPrice * parseFloat(item.quantity);
        total = itemTotal + total;
      });

    setTotal(total);
  }, [savedCartItems]);

  const ProductSuggestionsFetchRequested = (value) => {
    dispatch(onProductSuggestionsFetchRequested(value));
  };
  const ProductSuggestionsClearRequested = () => {
    dispatch(onProductSuggestionsClearRequested);
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  const renderSuggestion = (suggestion) => (
    <div
      id="Suggestion"
      className=" bg-white flex items-center justify-center  hover:cursor-pointer w-full p-[5px]"
    >
      <img className=" w-24 h-16 object-contain" src={suggestion.images[0]} />
      <p className="font-bold w-[600px] p-2.5 whitespace-nowrap overflow-hidden text-ellipsis">
        {suggestion?.title}
      </p>
    </div>
  );

  const inputProps = {
    className: "w-full pl-2",
    placeholder: "Search Products",
    value: searchValue,
    onChange: (e, { newValue }) => {
      dispatch(onProductSuggestionsSearch(newValue));
    },
  };

  const containerProps = {
    className: "w-full",
  };

  const navigate = useNavigate();

  return (
    <header className="header" style={{ zIndex: "30" }}>
      <CartDrawer isOpen={cartDrawerisOpen} setOpen={setCartDrawerOpen} />
      <div
        className="md:py-8 grid grid-cols-5 px-[8px] pb-[5px] shadow-md"
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

        <div className="hidden sha md:flex  justify-center items-center col-span-2 lg:col-span-3">
          <div className="SearchContainer">
            <Autosuggest
              suggestions={suggestions ? suggestions : null}
              onSuggestionsFetchRequested={ProductSuggestionsFetchRequested}
              onSuggestionsClearRequested={ProductSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              containerProps={containerProps}
              onSuggestionSelected={(_, item) => {
                window.location.replace(`/product/${item.suggestion.slug}`);
              }}
            />{" "}
            <div className="search-icon sha">
              <Search />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center col-span-2 md:col-span-1">
          <div
            className="ShoppingCartIcon"
            onClick={() =>
              width < breakpoint && setCartDrawerOpen(!cartDrawerisOpen)
            }
            onMouseEnter={openCart}
            onMouseLeave={closeCart}
          >
            <ShoppingCart fontSize="large" />
            {cartIsOpen &&
              savedCartItems?.length > 0 &&
              savedCartItems !== undefined && (
                <div className="hidden md:block card-dropdown shadow-xl">
                  <>
                    <ul>
                      {savedCartItems?.length > 0 &&
                        savedCartItems?.map((item) => {
                          return (
                            <li key={item.product}>
                              <div className="card-item-wrapper p-2.5">
                                <img src={item.image}></img>
                                <div className="card-item-text-wrapper w-[215px]">
                                  <div className="card-title contents">
                                    <p>{item.title}</p>
                                  </div>
                                  <div className="card-price">
                                    <span>${item.price} </span>
                                    <span>QTY: {item.quantity}</span>
                                    <span>size: {item.size}</span>
                                  </div>
                                </div>
                                <div
                                  className="remove-cart relative ml-4"
                                  onClick={() =>
                                    removeFromCardHandler(item.product)
                                  }
                                >
                                  <Close className="absolute" />
                                </div>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                    <div className="flex justify-center bg-gray-300 font-bold p-2 text-white mb-2">
                      <span>SUBTOTAL:</span>
                      <span>${total}</span>
                    </div>
                  </>

                  <div className="card-dropdown-bottom border-top">
                    <Link to="/cart">
                      <button className="bg-gray-100">VIEW CART</button>
                    </Link>
                  </div>
                </div>
              )}

            {cart &&
            savedCartItems?.length > 0 &&
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
      <hr className="md:hidden border-white border-[1px] mb-1" />

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
