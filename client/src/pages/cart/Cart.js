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
      ? dispatch(
          createOrder({
            orderItems: savedCartItems,
          })
        )
      : navigate("/login", { state: { from: location } });
  };

  return (
    <div className="px-5">
      <div className="page-title">
        <span>your cart</span>
      </div>
      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
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
                      <img className="inline product-img" src={item.image} />
                      {item.title}
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
      <div className="flex justify-between">
        <div className="discount-wrapper">
          <input placeholder="Discount Code" />
          <button>Apply</button>
        </div>
        <div className="btn-group">
          <button className="bg-gray-100 mr-2">continue shopping</button>
          <button className="bg-gray-100">update cart</button>
        </div>
      </div>
      <div className="justify-end my-5">
        <div className="total">
          <div className="subtotal border-bottom"></div>
          <div className="Shipping">
            <p>Shipping</p>
            <ul>
              <li>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div>
                      <input type="radio" name="price" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <span>+$00.00</span>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div>
                      <input type="radio" name="price" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <span>+$00.00</span>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div>
                      <input type="radio" name="price" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <span>+$00.00</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="shipping-calculation">
            <p>Calculate Shipping</p>
            <div>
              <select id="cars" name="carlist" form="carform">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <input placeholder="PostCode/ZIP" />
              <button>Update Cart</button>
            </div>
          </div>
          <div className="flex justify-between">
            <p>subtotal</p>
            <p>{cartTotal}$</p>
          </div>
          <button onClick={handleOrder}>Submit Your Order</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
