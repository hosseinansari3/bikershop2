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
export const fetchProductBySection = (section) =>
  axios.get(`${baseUrl}/products/sections/${section}`);

export const fetchProductsByFilters = (filters, orders, page) =>
  axios.get(`${baseUrl}/products/getByFilters/`, {
    params: {
      filters: JSON.stringify(filters),
      orders: JSON.stringify(orders),
      page: page,
    },
  });

export const createProduct = (formData) =>
  axios.post(`${baseUrl}/products`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const imageUpload = (formData) =>
  axios.post(`${baseUrl}/products/imageUpload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, formData) =>
  axios.put(`${baseUrl}/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

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

export const updateOrderAPI = (id, updated) =>
  axios.put(`${baseUrl}/orders/${id}`, updated);

export const listUserOrdersAPI = (config) =>
  axios.get(`${baseUrl}/orders/myOrder/`, config);

export const listAllOrdersAPI = (limit, filters, sort) =>
  axios.get(`${baseUrl}/orders`, {
    params: { limit: limit, filters: filters, sort: sort },
  });

export const updateWishlistAPI = (item, config) =>
  axios.post(`${baseUrl}/wishlist`, item, config);

export const fetchWishlistAPI = (config) =>
  axios.get(`${baseUrl}/wishlist`, config);

export const addReviewAPI = (santizedReview, config) =>
  axios.post(`${baseUrl}/review/add`, santizedReview, config);

export const fetchProductReviewsAPI = (slug, filters) =>
  axios.get(`${baseUrl}/review/${slug}`, {
    params: { filters: filters },
  });

export const fetchMyReviewsAPI = (config, limit) =>
  axios.get(`${baseUrl}/review/myReviews?limit=${limit}`, config);

export const fetchAllReviewsAPI = (limit) =>
  axios.get(`${baseUrl}/review?limit=${limit}`);

export const updateReviewAPI = (id, updated) =>
  axios.put(`${baseUrl}/review/${id}`, updated);

export const updateProfileAPI = (profile, config) =>
  axios.put(`${baseUrl}/users`, profile, config);

export const updateAddressAPI = (address, config) =>
  axios.put(`${baseUrl}/users/updateAddress`, address, config);

export const editeAddressAPI = (addressId, newAddress, config) =>
  axios.put(
    `${baseUrl}/users/editeAddress?addressId=${addressId}`,
    newAddress,
    config
  );

export const createCategoryAPI = (category) =>
  axios.post(`${baseUrl}/categories/add`, category);

export const fetchCategoriesAPI = () => axios.get(`${baseUrl}/categories`);

export const deleteCategoryAPI = (id) =>
  axios.delete(`${baseUrl}/categories/${id}`);
