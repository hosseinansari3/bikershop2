import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";

import StarRatingComponent from "react-star-rating-component";

function ProductCart(props) {
  return (
    <div className={`product-cart ${props.className}`}>
      {console.log("slug:" + props.slug)}
      <Link to={props.slug ? `/product/${props.slug}` : "#"}>
        <div>
          <img className="product-image" src={props.image} alt="ddsdfsfd" />
        </div>
      </Link>
      <div className="product-title">{props.title}</div>
      <StarRatingComponent name="rate1" starCount={5} value={3} />
      <div className="product-price">{props.price}</div>
    </div>
  );
}

export default ProductCart;
