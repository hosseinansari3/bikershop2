import { combineReducers } from "redux";
import { productReducer, ProductDetailsReducer } from "./products";
import { userSigninReducer, userRegisterReducer } from "./users";
import { cartReducer } from "./cart";
import { categoriesReducer } from "./categories";
import { orderCreateReducer, orderListUserReducer } from "./orders";
import wishListReducer from "./wishlist";
import reviewReducer from "./reviews";
import { accountReducer } from "./account";
import orderModalReducer from "./orderModal";
import addressModalReducer from "./addressModal";
import cartDrawerReducer from "./cartDrawer";
export const reducers = combineReducers({
  products: productReducer,
  ProductDetails: ProductDetailsReducer,
  usersRegister: userRegisterReducer,
  usersSignin: userSigninReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListUser: orderListUserReducer,
  wishlist: wishListReducer,
  review: reviewReducer,
  account: accountReducer,
  categories: categoriesReducer,
  orderModal: orderModalReducer,
  addressModal: addressModalReducer,
  cartDrawer: cartDrawerReducer,
});
