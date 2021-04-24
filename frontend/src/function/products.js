import axios from "axios";

export const getProducts = async (
  keyword = "",
  pageNo = 1,
  price = [1, 100],
  category
) => {
  if (category) {
    return axios.get(
      `${process.env.REACT_APP_API}/products?keyword=${keyword}&page=${pageNo}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
    );
  } else {
    return axios.get(
      `${process.env.REACT_APP_API}/products?keyword=${keyword}&page=${pageNo}&price[lte]=${price[1]}&price[gte]=${price[0]}`
    );
  }
};

export const getProductsDetails = async (id) =>
  axios.get(`${process.env.REACT_APP_API}/product/${id}`);
