import axios from "axios";

const baseUrl = "http://localhost:3000";

export const signIn = (email, password) =>
  axios.post(`${baseUrl}/users/signin`, { email, password });

export const registerUser = (name, email, password) =>
  axios.post(`${baseUrl}/users/register`, { name, email, password });

export const fetchUsers = () => axios.get(`${baseUrl}/users`);

export const fetchProducts = () => axios.get(`${baseUrl}/products`);
export const fetchProductById = (productId) =>
  axios.get(`${baseUrl}/products/${productId}`);
export const createProduct = (newProduct) =>
  axios.post(`${baseUrl}/products`, newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${baseUrl}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => {
  axios.delete(`http://localhost:5000/products/${id}`);
};
