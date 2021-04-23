import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productClearErrorsAction } from "../../actions/productActions";
import {
  productDetailsFailAction,
  productDetailsRequestAction,
  productDetailsSuccessAction,
} from "../../actions/productDetailsActions";
import "../../App.css";
import { getProductsDetails } from "../../function/products";
import Loader from "../layout/Loader";
import MetaData from "../../components/layout/MetaData";
import { Carousel } from "react-bootstrap";

const ProductDetails = () => {
  const { loading, error, product } = useSelector((state) => ({
    ...state.productDetails,
  }));
  const dispatch = useDispatch();
  const params = useParams();
  //   toast.success(`${JSON.stringify(params)}`);

  useEffect(() => {
    productDetailsRequestAction(dispatch);
    getProductsDetails(params.id)
      .then((res) => {
        toast.success(`${JSON.stringify(res.data)}`);
        productDetailsSuccessAction(dispatch, res.data);
      })
      .catch((err) => {
        productDetailsFailAction(dispatch, err);
      });
  }, [params.id, dispatch]);

  if (error) {
    toast.error(`Error: ${error}`);
    productClearErrorsAction(dispatch);
  }
  if (loading || !product) {
    return <Loader />;
  }

  const {
    name,
    _id,
    price,
    stock,
    images,
    title,
    numOfReviews,
    description,
    seller,
  } = product;

  return (
    <div className="row f-flex justify-content-around">
      <MetaData title={"Products Details of your chosen one"} />
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <Carousel pause="hover">
          {toast.success(`${images && images.length}`)}
          {images &&
            images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <img className="d-block w-100" src={image.url} alt={title} />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{name}</h3>
        <p id="product_id">Product # {_id}</p>

        <hr />

        <div className="rating-outer">
          <div className="rating-inner"></div>
        </div>
        <span id="no_of_reviews">({numOfReviews} Reviews)</span>

        <hr />

        <p id="product_price">${price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>

          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readOnly
          />

          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ml-4"
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={stock > 0 ? "greenColor" : "redColor"}
          >
            {stock > 0 ? "In Stock" : "Out of stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{seller}</strong>
        </p>

        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4"
          data-toggle="modal"
          data-target="#ratingModal"
        >
          Submit Your Review
        </button>

        <div className="row mt-2 mb-5">
          <div className="rating w-50">
            <div
              className="modal fade"
              id="ratingModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ratingModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="ratingModalLabel">
                      Submit Review
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="stars">
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <textarea
                      name="review"
                      id="review"
                      className="form-control mt-3"
                    ></textarea>

                    <button
                      className="btn my-3 float-right review-btn px-4 text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
