import axios from "axios";

const baseUrl = "https://bikershop2.onrender.com";

export const signIn = (email, password) =>
  axios.post(`${baseUrl}/users/signin`, { email, password });

export const registerUser = (name, email, password) =>
  axios.post(`${baseUrl}/users/register`, { name, email, password });

export const fetchUsers = () => axios.get(`${baseUrl}/users`);
export const getCurrentUserAPI = (config) =>
  axios.get(`${baseUrl}/users/me`, config);

export const fetchProducts = () => axios.get(`${baseUrl}/products`);
export const fetchProductById = (slug) =>
  axios.get(`${baseUrl}/products/${slug}`);
export const createProduct = (newProduct) =>
  axios.post(`${baseUrl}/products`, newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${baseUrl}/products/${id}`, updatedProduct);

export const deleteProductAPI = (id) =>
  axios.delete(`${baseUrl}/products/${id}`);

export const deleteUser = (id) => axios.delete(`${baseUrl}/users/${id}`);

export const createOrderAPI = (order, config) =>
  axios.post(`${baseUrl}/orders`, order, config);

export const listUserOrdersAPI = (config) =>
  axios.get(`${baseUrl}/orders/myOrder/`, config);

export const listAllOrdersAPI = () => axios.get(`${baseUrl}/orders`);

export const updateWishlistAPI = (item, config) =>
  axios.post(`${baseUrl}/wishlist`, item, config);

export const fetchWishlistAPI = (config) =>
  axios.get(`${baseUrl}/wishlist`, config);

export const addReviewAPI = (santizedReview, config) =>
  axios.post(`${baseUrl}/review/add`, santizedReview, config);

export const fetchProductReviewsAPI = (slug) =>
  axios.get(`${baseUrl}/review/${slug}`);

export const fetchMyReviewsAPI = (config) =>
  axios.get(`${baseUrl}/review/myReviews`, config);

export const fetchAllReviewsAPI = () => axios.get(`${baseUrl}/review`);

export const updateProfileAPI = (profile, config) =>
  axios.put(`${baseUrl}/users`, profile, config);
