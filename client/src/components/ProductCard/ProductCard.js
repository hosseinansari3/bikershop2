import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

import StarRating from "../StarRating";

function ProductCard(props) {
  return (
    <Link
      className={`product-cart ${props.className}`}
      to={props.slug ? `/product/${props.slug}` : "#"}
    >
      <div>
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

export default ProductCard;
