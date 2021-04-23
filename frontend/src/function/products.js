import axios from "axios";

export const getProducts = async () =>
  axios.get(`${process.env.REACT_APP_API}/products`);

export const getProductsDetails = async (id) =>
  axios.get(`${process.env.REACT_APP_API}/product/${id}`);
