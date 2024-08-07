import {
  ADD_TO_CARD,
  REMOVE_FROM_CART,
  EMPTY_CART,
} from "../constants/actionTypes";

const savedCartItems =
  localStorage.getItem("cartItems") &&
  Object.keys(JSON.parse(localStorage.getItem("cartItems"))).length > 0
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

console.log("length", localStorage.getItem("cartItems"));

export const cartReducer = (
  state = { cartItems: savedCartItems || [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_CARD:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      // if the item added to cart already exists, replace existed with item
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    case EMPTY_CART:
      console.log("empty");
      return { cartItems: {} };
    default:
      return state;
  }
};
