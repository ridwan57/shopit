import axios from "axios";

export const getProducts = async () =>
  axios.get(`${process.env.REACT_APP_API}/products`);
