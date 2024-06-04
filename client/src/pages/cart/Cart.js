import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orders";
import { useNavigate, useLocation } from "react-router-dom";

import "./Cart.css";

function Cart() {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useSelector((state) => state.usersSignin.userInfo);

  var cartTotal = 0.0;

  const dispatch = useDispatch();

  const handleOrder = (e) => {
    e.preventDefault();

    userInfo
      ? navigate("/checkout")
      : navigate("/login", { state: { destination: "/checkout" } });
  };

  return (
    <div className="px-5">
      <div className="page-title">
        <span>YOUR CART</span>
      </div>
      <div className="hidden md:block w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <table className="w-full whitespace-no-wrap">
          <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
            <tr>
              <th className="py-3">PRODUCT</th>
              <th className="py-3">SIZE</th>
              <th className="py-3">PRICE</th>
              <th className="py-3">QUANTITY</th>
              <th className="py-3">TOTAL</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
            {savedCartItems ? (
              savedCartItems.map((item) => {
                let itemPrice = parseFloat(item.price);
                let itemTotal = itemPrice * parseFloat(item.quantity);
                cartTotal = itemTotal + cartTotal;
                return (
                  <tr>
                    <td>
                      <div className="flex items-center">
                        <img className="inline product-img" src={item.image} />
                        <p>{item.title}</p>
                      </div>
                    </td>
                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{itemTotal}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <span>no item</span>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {savedCartItems ? (
          savedCartItems.map((item) => {
            let itemPrice = parseFloat(item.price);
            let itemTotal = itemPrice * parseFloat(item.quantity);
            return (
              <div className="border-b-2 border-gray-100 pb-2">
                <div className="flex items-center">
                  <img className="inline product-img" src={item.image} />
                  <p>{item.title}</p>
                </div>
                <div className="ml-[75px]">
                  <p>
                    <span className="font-bold">size:</span> {item.size}
                  </p>
                  <p>
                    <span className="font-bold">price:</span> {item.price}
                  </p>
                  <p>
                    <span className="font-bold">quantity:</span> {item.quantity}
                  </p>
                  <p>
                    <span className="font-bold">total:</span> {itemTotal}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <tr>
            <span>no item</span>
          </tr>
        )}
      </div>
      <div className="flex justify-between mt-3">
        <div className="discount-wrapper">
          <input placeholder="Discount Code" />
          <button>Apply</button>
        </div>
      </div>
      <div className="justify-end my-5">
        <div className="total">
          <div className="subtotal border-bottom"></div>

          <div className="flex justify-between">
            <p>subtotal</p>
            <p>{cartTotal}$</p>
          </div>
          <button
            className="bg-black text-white  inline-block border-2 border-solid transition-all"
            onClick={handleOrder}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
