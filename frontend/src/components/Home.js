import React, { useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader";
import SingleProduct from "../components/Product/SingleProduct";
import "../App.css";
import { getProducts } from "../function/products";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  productClearErrorsAction,
  productFailAction,
  productRequestAction,
  productSuccessAction,
} from "../actions/productActions";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const { keyword = "" } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    resPerPage,
    productsCount,
    filteredProductCount,
  } = useSelector((state) => ({
    ...state.products,
  }));

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState(null);
  console.log("category:", category);
  const priceRef = React.useRef(price);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const setCurrentPageNo = (page) => {
    console.log("page:", page);
    setCurrentPage(page);
  };

  const loadProducts = React.useCallback(
    (isCurrent) => {
      productClearErrorsAction(dispatch);
      productRequestAction(dispatch);

      getProducts(keyword, currentPage, price, category)
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
    [currentPage, dispatch, keyword, price, category]
  );

  useEffect(() => {
    let isCurrent = true;

    if (price !== priceRef.current) {
      console.log("delayed:");
      const delayed = setTimeout(() => {
        loadProducts(isCurrent);
      }, 400);
      return () => {
        priceRef.current = price;
        isCurrent = false;

        clearTimeout(delayed);
      };
    } else {
      console.log("Not delayed:");
      loadProducts(isCurrent);

      return () => {
        // priceRef.current = price;
        isCurrent = false;
      };
    }
  }, [loadProducts, price]);

  const productLayout = () =>
    products.length > 0 &&
    products.map((product) => (
      <SingleProduct
        key={product._id}
        product={product}
        col={keyword.length > 0 ? 4 : 3}
      />
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
          {keyword && (
            <>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{
                      1: `$1`,
                      1000: `$1000`,
                    }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                  />
                  <hr className="my-5" />

                  <div className="mt-5">
                    <h4 className="mb-3">Categories</h4>

                    {/* <ul className="pl-0"> */}
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        Select Category
                      </button>
                      <ul className="dropdown-menu">
                        {categories.map((categoryItem) => (
                          <li
                            // className={`${
                            //   categoryItem === category ? "active" : null
                            // }`}
                            className={`dropdown-item cursor-pointer ${
                              categoryItem === category ? "active" : null
                            } `}
                            style={{
                              cursor: "pointer",
                              listStyleType: "none",
                              touchAction: "auto",
                            }}
                            key={categoryItem}
                            onClick={() => setCategory(categoryItem)}
                          >
                            {categoryItem}
                          </li>
                        ))}
                      </ul>
                      {category && (
                        <h5 className="btn btn-success">{category}</h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* {JSON.stringify(products)} */}

          {keyword.length > 0 ? (
            <div className="col-6 col-md-9">
              <div className="row">{productLayout()}</div>
            </div>
          ) : (
            productLayout()
          )}
        </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={
            keyword.length > 0 ? filteredProductCount : productsCount
          }
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
