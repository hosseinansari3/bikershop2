import { fetchProductById } from "../api";
import { ADD_TO_CARD, REMOVE_FROM_CART } from "../constants/actionTypes";

export const addToCard = (productId, qty) => async (dispatch, getState) => {
  const { data } = await fetchProductById(productId);

  try {
    dispatch({
      type: ADD_TO_CARD,
      payload: {
        title: data.title,
        image: data.image,
        price: data.price,
        product: data._id,
        quantity: qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
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
