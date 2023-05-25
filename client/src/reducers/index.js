import { combineReducers } from "redux";
import { productReducer, ProductDetailsReducer } from "./products";
import { userSigninReducer, userRegisterReducer } from "./users";
import { cartReducer } from "./cart";
export const reducers = combineReducers({
  products: productReducer,
  ProductDetails: ProductDetailsReducer,
  usersRegister: userRegisterReducer,
  usersSignin: userSigninReducer,
  cart: cartReducer,
});
