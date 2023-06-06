import axios from "axios";

const baseUrl = "http://localhost:5000";

export const signIn = (email, password) =>
  axios.post(`${baseUrl}/users/signin`, { email, password });

export const registerUser = (name, email, password) =>
  axios.post(`${baseUrl}/users/register`, { name, email, password });

export const fetchUsers = () => axios.get(`${baseUrl}/users`);

export const fetchProducts = () => axios.get(`${baseUrl}/products`);
export const fetchProductById = (slug) =>
  axios.get(`${baseUrl}/products/${slug}`);
export const createProduct = (newProduct) =>
  axios.post(`${baseUrl}/products`, newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${baseUrl}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => {
  axios.delete(`http://localhost:5000/products/${id}`);
};

export const deleteUser = (id) => {
  axios.delete(`http://localhost:5000/users/${id}`);
};

export const createOrderAPI = (order) => {
  axios.post(`${baseUrl}/orders`, order);
};

export const listUserOrdersAPI = (user) =>
  axios.get(`http://localhost:5000/orders/myOrder/${user}`);

export const updateWishlistAPI = (item) =>
  axios.post("http://localhost:5000/wishlist", item);

export const fetchWishlistAPI = (user) =>
  axios.get(`http://localhost:5000/wishlist/${user}`);
