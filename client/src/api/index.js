import axios from "axios";

const baseUrl = "http://192.168.1.102:5000";

export const signIn = (email, password) =>
  axios.post(`${baseUrl}/users/signin`, { email, password });

//USERS

export const registerUser = (
  firstName,
  lastName,
  phoneNumber,
  email,
  password
) =>
  axios.post(`${baseUrl}/users/register`, {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  });

export const fetchUsers = (page) => axios.get(`${baseUrl}/users?page=${page}`);
export const getCurrentUserAPI = (config) =>
  axios.get(`${baseUrl}/users/me`, config);
export const deleteUser = (id) => axios.delete(`${baseUrl}/users/${id}`);

export const searchUserAPI = (inputValue, page) =>
  axios.get(`${baseUrl}/users/list/search/${inputValue}?page=${page}`);

//PRODUCTS
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

//ORDERS
export const createOrderAPI = (order, config) =>
  axios.post(`${baseUrl}/orders`, order, config);

export const updateOrderAPI = (id, updated) =>
  axios.put(`${baseUrl}/orders/${id}`, updated);

export const listUserOrdersAPI = (config) =>
  axios.get(`${baseUrl}/orders/myOrder/`, config);

export const listAllOrdersAPI = (skip, limit, filters, sort) =>
  axios.get(`${baseUrl}/orders`, {
    params: { skip: skip, limit: limit, filters: filters, sort: sort },
  });

//WISHLIST
export const updateWishlistAPI = (item, config) =>
  axios.post(`${baseUrl}/wishlist`, item, config);

export const fetchWishlistAPI = (config) =>
  axios.get(`${baseUrl}/wishlist`, config);

export const deleteWishlistAPI = (id) =>
  axios.delete(`${baseUrl}/wishlist/${id}`);

//REVIEW
export const addReviewAPI = (santizedReview, config) =>
  axios.post(`${baseUrl}/review/add`, santizedReview, config);

export const fetchProductReviewsAPI = (slug, filters) =>
  axios.get(`${baseUrl}/review/${slug}`, {
    params: { filters: filters },
  });

export const fetchMyReviewsAPI = (config) =>
  axios.get(`${baseUrl}/review/myReviews/`, config);

export const fetchAllReviewsAPI = (skip, limit) =>
  axios.get(`${baseUrl}/review`, {
    params: { skip: skip, limit: limit },
  });

export const updateReviewAPI = (id, updated) =>
  axios.put(`${baseUrl}/review/${id}`, updated);

//PROFILE
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

//CATEGORY
export const createCategoryAPI = (category) =>
  axios.post(`${baseUrl}/categories/add`, category);

export const fetchCategoriesAPI = () => axios.get(`${baseUrl}/categories`);

export const searchCategoryAPI = (inputValue) =>
  axios.get(`${baseUrl}/categories/search/${inputValue}`);

export const deleteCategoryAPI = (id) =>
  axios.delete(`${baseUrl}/categories/${id}`);
