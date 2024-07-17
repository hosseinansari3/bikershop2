import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideCartDrawer } from "../../actions/cartDrawer";

function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  const userInfo = useSelector((state) => state.usersSignin.userInfo);

  const cartDrawer = useSelector((state) => state.cartDrawer);

  const handleChechout = (e) => {
    e.preventDefault();
    dispatch(hideCartDrawer());
    userInfo
      ? navigate("/checkout")
      : navigate("/login", { state: { destination: "/checkout" } });
  };

  return (
    <div>
      {cartDrawer.isOpen && (
        <div
          onClick={() => dispatch(hideCartDrawer())}
          className="md:hidden w-[100vw] h-[100vh] bg-black/75 fixed  z-[90]"
        ></div>
      )}
      <div
        className={`md:hidden bg-white w-[70%] h-[100vh] top-0 fixed z-[1000] right-[-70%] ${
          cartDrawer.isOpen && "-translate-x-[100%]"
        } transition-transform duration-500`}
      >
        <div className="text-center border-b pb-[2vh]">
          <h3>CART</h3>
        </div>
        <div className="border-b pb-[2vh] h-[270px] overflow-y-auto">
          <ul className="p-5">
            {savedCartItems?.length > 0 &&
              savedCartItems?.map((item) => {
                return (
                  <li className="flex mb-[2vh]">
                    <img
                      src={item.image}
                      className="h-[12vh] w-[12vh] bg-slate-600"
                    />
                    <div className="ml-3  ">
                      <span className="font-bold line-clamp-3">
                        {item.title}
                      </span>
                      <p className="text-sm">price: ${item.price}</p>
                      <p className="text-sm">quantity: {item.quantity}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex flex-col justify-center mt-[15vh]">
          <Link
            onClick={() => {
              dispatch(hideCartDrawer());
              navigate("/checkout");
            }}
            className="contents"
            to="/cart"
          >
            <button className="w-[60%] mx-auto h-[8vh] mb-3 rounded bg-black text-white">
              VIEW CART
            </button>
          </Link>

          <button
            onClick={handleChechout}
            className="w-[60%] mx-auto h-[8vh] mb-3 rounded bg-black text-white"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
