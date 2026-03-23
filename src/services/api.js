import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const fetchProductsApi = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchCategoriesApi = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
