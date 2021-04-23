import axios from "axios";

export const getProducts = async (pageNo) =>
  axios.get(`${process.env.REACT_APP_API}/products?page=${pageNo}`);

export const getProductsDetails = async (id) =>
  axios.get(`${process.env.REACT_APP_API}/product/${id}`);
