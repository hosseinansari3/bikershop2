import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";

import StarRating from "../StarRating";

function ProductCart(props) {
  return (
    <div className={`product-cart ${props.className}`}>
      <Link to={props.slug ? `/product/${props.slug}` : "#"}>
        <div>
          <img
            className={
              props.imgClass
                ? props.imgClass
                : "w-full h-[110px] md:h-[190px] object-contain"
            }
            src={props.image}
            alt="ddsdfsfd"
          />
        </div>
      </Link>
      <p className="line-clamp-2">{props.title}</p>
      <StarRating rateValue={props.rating} readOnly={true} />

      <div className="product-price">{props.price} $</div>
    </div>
  );
}

export default ProductCart;
