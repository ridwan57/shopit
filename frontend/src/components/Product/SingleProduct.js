import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product, col }) => {
  console.log("col:", col);
  const { _id, name, images, reviews, price, ratings } = product;
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col}  my-3`} key={_id}>
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="">{name}</a>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({reviews.length} Reviews)</span>
          </div>
          <p className="card-text">${price}</p>
          <Link to={`/product/${_id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
