import React, { useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader";
import SingleProduct from "../components/Product/SingleProduct";
import "../App.css";
import { getProducts } from "../function/products";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import {
  productClearErrorsAction,
  productFailAction,
  productRequestAction,
  productSuccessAction,
} from "../actions/productActions";

import { toast } from "react-toastify";

const Home = () => {
  const { loading, resPerPage, productsCount } = useSelector((state) => ({
    ...state.products,
  }));
  console.log("resPerPage:", resPerPage);
  console.log("productsCount:", productsCount);

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (page) => {
    console.log("page:", page);
    setCurrentPage(page);
  };
  const loadProducts = React.useCallback(
    (isCurrent) => {
      productClearErrorsAction(dispatch);
      productRequestAction(dispatch);

      getProducts(currentPage)
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
    },
    [currentPage, dispatch]
  );

  useEffect(() => {
    let isCurrent = true;

    loadProducts(isCurrent);

    return () => {
      isCurrent = false;
    };
  }, [loadProducts]);

  const productLayout = () =>
    products.length > 0 &&
    products.map((product) => (
      <SingleProduct key={product._id} product={product} />
    ));

  if (loading || !productsCount) {
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
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  );
};

export default Home;
