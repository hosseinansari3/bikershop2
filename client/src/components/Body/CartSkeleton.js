import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";
import StarRating from "../StarRating";
import Skeleton from "@mui/material/Skeleton";

function CartSkeleton(props) {
  return (
    <div className={`product-cart ${props.className}`}>
      <div className="flex justify-center">
        <Skeleton variant="rounded">
          <div
            className={
              props.imgClass
                ? props.imgClass
                : `w-[230px] h-[110px] md:h-[190px]`
            }
          ></div>
        </Skeleton>
      </div>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <div className="flex justify-center">
        <Skeleton variant="text" width="100px" sx={{ fontSize: "1rem" }} />
      </div>
      <div className="flex justify-center">
        <Skeleton variant="text" width="70px" sx={{ fontSize: "1rem" }} />
      </div>
    </div>
  );
}

export default CartSkeleton;
