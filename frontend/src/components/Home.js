import React, { useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader";
import SingleProduct from "../components/Product/SingleProduct";
import "../App.css";
import { getProducts } from "../function/products";
import { useDispatch, useSelector } from "react-redux";
import {
  productClearErrorsAction,
  productFailAction,
  productRequestAction,
  productSuccessAction,
} from "../actions/productActions";

import { toast } from "react-toastify";

const Home = () => {
  const {
    products: { loading },
  } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isCurrent = true;
    productClearErrorsAction(dispatch);
    productRequestAction(dispatch);

    getProducts()
      .then((res) => {
        if (isCurrent) {
          console.log("products:", res.data);
          productSuccessAction(dispatch, res.data);
          toast.success(`${res.data.products.length} Products fetched`);

          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        if (isCurrent) {
          console.log("err:", err);
          productFailAction(dispatch, err);
        }
      });
    return () => {
      isCurrent = false;
    };
  }, [dispatch]);

  const productLayout = () =>
    products.length > 0 &&
    products.map((product) => (
      <SingleProduct key={product._id} product={product} />
    ));

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {/* {JSON.stringify(products)} */}
          {productLayout()}
        </div>
      </section>
    </>
  );
};

export default Home;
