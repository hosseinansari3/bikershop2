import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";

import StarRatingComponent from "react-star-rating-component";
import StarRating from "../StarRating";

function ProductCart(props) {
  return (
    <div className={`product-cart ${props.className}`}>
      <Link to={props.slug ? `/product/${props.slug}` : "#"}>
        <div>
          <img className="product-image" src={props.image} alt="ddsdfsfd" />
        </div>
      </Link>
      <div className="product-title">{props.title}</div>
      <StarRating rateValue={props.rating} readOnly={true} />

      <div className="product-price">{props.price} $</div>
    </div>
  );
}

export default ProductCart;
