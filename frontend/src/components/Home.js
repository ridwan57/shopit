import React, { useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";
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

const Home = () => {
  const {
    products: { loading },
  } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productClearErrorsAction(dispatch);
    productRequestAction(dispatch);

    const unsub = getProducts()
      .then((res) => {
        console.log("products:", res.data);
        productSuccessAction(dispatch, res.data);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log("err:", err);
        productFailAction(dispatch, err);
      });
    return () => unsub;
  }, [dispatch]);

  const productLayout = () =>
    products.length > 0 &&
    products.map((product) => <SingleProduct product={product} />);

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
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
      )}
    </>
  );
};

export default Home;
