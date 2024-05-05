import { toast } from "react-toastify";
import { fetchProductById } from "../api";
import {
  ADD_TO_CARD,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "../constants/actionTypes";

export const addToCard =
  (productId, qty, size) => async (dispatch, getState) => {
    const { data } = await fetchProductById(productId);

    try {
      console.log("cartItems", localStorage.getItem("cartItems"));
      dispatch({
        type: ADD_TO_CARD,
        payload: {
          title: data.title,
          image: data.images[0],
          price: data.price,
          product: data._id,
          quantity: qty,
          size: size,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
      console.log("getState().cart", getState().cart);
      toast("PRODUCT ADDED TO CART SUCCESSFULLY!");
    } catch (error) {
      console.log(error.message);
    }
  };

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x.product !== product);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch({ type: EMPTY_CART });
  console.log("emptyCart");
  localStorage.setItem("cartItems", JSON.stringify({}));
};
