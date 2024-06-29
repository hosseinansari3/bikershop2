import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";

import StarRating from "../StarRating";

function ProductCart(props) {
  return (
    <Link to={props.slug ? `/product/${props.slug}` : "#"}>
      <div className={`product-cart ${props.className}`}>
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
        <p className="line-clamp-2 h-[50px]">{props.title}</p>

        <StarRating rateValue={props.rating} readOnly={true} />

        <div className="product-price">{props.price} $</div>
      </div>
    </Link>
  );
}

export default ProductCart;
