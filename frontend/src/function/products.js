import axios from "axios";

export const getProducts = async (keyword = "", pageNo) =>
  axios.get(
    `${process.env.REACT_APP_API}/products?keyword=${keyword}&page=${pageNo}`
  );

export const getProductsDetails = async (id) =>
  axios.get(`${process.env.REACT_APP_API}/product/${id}`);
