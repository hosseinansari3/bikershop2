import React from "react";
import "./ProductColor.css";

function ProductColor() {
  return (
    <div className="product-color">
      <ul>
        <li>
          <input type={"radio"} name="color" id="red" />
          <label htmlFor="red">
            <span></span>
          </label>
        </li>
        <li>
          <input type={"radio"} name="color" id="yellow" />
          <label htmlFor="yellow">
            <span></span>
          </label>
        </li>
        <li>
          <input type={"radio"} name="color" id="green" />
          <label htmlFor="green">
            <span></span>
          </label>
        </li>
      </ul>
    </div>
  );
}

export default ProductColor;
