import React from "react";
import { Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import "./Cart.css";

function Cart() {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  var cartTotal = 0.0;
  return (
    <Container className="px-5">
      <Row>
        <div className="page-title">
          <span>your cart</span>
        </div>
      </Row>
      <Row style={{ border: "1px solid #EDEDED" }}>
        <Table hover>
          <thead style={{ backgroundColor: "#EDEDED" }}>
            <tr>
              <th>PRODUCT</th>
              <th>COLOR</th>
              <th>SIZE</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {savedCartItems?.map((item) => {
              let itemPrice = parseFloat(item.price.replace(/[^\d\.]*/g, ""));
              let itemTotal = itemPrice * parseFloat(item.quantity);
              cartTotal = itemTotal + cartTotal;
              return (
                <tr>
                  <td>
                    <img className="product-img" src={item.image} />
                    {item.title}
                  </td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{itemTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <div className="d-flex justify-content-between">
        <div className="discount-wrapper">
          <input placeholder="Discount Code" />
          <button>Apply</button>
        </div>
        <div className="btn-group">
          <button className="me-2">continue shopping</button>
          <button>update cart</button>
        </div>
      </div>
      <Row className="justify-content-end my-5">
        <div className="total">
          <div className="subtotal border-bottom">
            <div className="d-flex justify-content-between">
              <p>subtotal</p>
              <p>{cartTotal}$</p>
            </div>
          </div>
          <div className="Shipping">
            <p>Shipping</p>
            <ul>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <input type="radio" name="price" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <span>+$00.00</span>
                </div>
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <input type="radio" name="price" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <span>+$00.00</span>
                </div>
              </li>
              <li>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <input type="radio" name="price" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <span>+$00.00</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="shipping-calculation">
            <p>Calculate Shipping</p>
            <div>
              <select id="cars" name="carlist" form="carform">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <input placeholder="PostCode/ZIP" />
              <button>Update Cart</button>
            </div>
          </div>
          <p>total</p>
          <button>Procced to Checkout</button>
        </div>
      </Row>
    </Container>
  );
}

export default Cart;
