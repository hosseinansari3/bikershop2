import axios from "axios";

const baseUrl = "http://localhost:5000";

export const signIn = (email, password) =>
  axios.post(`${baseUrl}/users/signin`, { email, password });

export const registerUser = (name, email, password) =>
  axios.post(`${baseUrl}/users/register`, { name, email, password });

export const fetchUsers = (page) => axios.get(`${baseUrl}/users?page=${page}`);
export const getCurrentUserAPI = (config) =>
  axios.get(`${baseUrl}/users/me`, config);

export const fetchProducts = (page) =>
  axios.get(`${baseUrl}/products?page=${page}`);
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

export const searchProductAPI = (inputValue, page) =>
  axios.get(`${baseUrl}/products/list/search/${inputValue}?page=${page}`);

export const searchOrderAPI = (inputValue) =>
  axios.get(`${baseUrl}/orders/list/search/${inputValue}`);

export const deleteUser = (id) => axios.delete(`${baseUrl}/users/${id}`);

export const searchUserAPI = (inputValue, page) =>
  axios.get(`${baseUrl}/users/list/search/${inputValue}?page=${page}`);

export const createOrderAPI = (order, config) =>
  axios.post(`${baseUrl}/orders`, order, config);

export const listUserOrdersAPI = (config) =>
  axios.get(`${baseUrl}/orders/myOrder/`, config);

export const listAllOrdersAPI = (limit) =>
  axios.get(`${baseUrl}/orders?limit=${limit}`);

export const updateWishlistAPI = (item, config) =>
  axios.post(`${baseUrl}/wishlist`, item, config);

export const fetchWishlistAPI = (config) =>
  axios.get(`${baseUrl}/wishlist`, config);

export const addReviewAPI = (santizedReview, config) =>
  axios.post(`${baseUrl}/review/add`, santizedReview, config);

export const fetchProductReviewsAPI = (slug) =>
  axios.get(`${baseUrl}/review/${slug}`);

export const fetchMyReviewsAPI = (config, limit) =>
  axios.get(`${baseUrl}/review/myReviews?limit=${limit}`, config);

export const fetchAllReviewsAPI = (limit) =>
  axios.get(`${baseUrl}/review?limit=${limit}`);

export const updateProfileAPI = (profile, config) =>
  axios.put(`${baseUrl}/users`, profile, config);
