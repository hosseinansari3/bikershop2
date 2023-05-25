import React from "react";
import Container from "react-bootstrap/esm/Container";
import ProductCart from "../Body/ProductCart";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./CartList.css";
import Carousel from "../Carousel/Carousel";
import { SwiperSlide } from "swiper/react";
import img from "../../assets/images/falkenjagd-aristos-r-speed-gravel-01-1326784.jpg";

function CartList(props) {
  if (props.carousel) {
    return (
      <Carousel
        style={{ height: "464px" }}
        responsive
        breakpoints={{
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            //spaceBetween: 40,
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 3,
            //spaceBetween: 100,
          },
          992: {
            slidesPerView: 4,
            // spaceBetween: 40,
          },
        }}
      >
        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img}
            price=" €39.99"
            title=" Endura Hummvee Cycling Trousers II"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img}
            price=" €39.99"
            title=" Endura Hummvee Cycling Trousers II"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img}
            price=" €39.99"
            title=" Endura Hummvee Cycling Trousers II"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img}
            price=" €39.99"
            title=" Endura Hummvee Cycling Trousers II"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img}
            price=" €39.99"
            title=" Endura Hummvee Cycling Trousers II"
          />
        </SwiperSlide>
      </Carousel>
    );
  }
  return (
    <>
      <ProductCart
        image={img}
        price=" €39.99"
        title=" Endura Hummvee Cycling Trousers II"
      />
      <ProductCart
        image={img}
        price="€33.95"
        title=" Fox Clothing Dirtpaw Long Finger MTB Cycling Gloves"
      />
      <ProductCart
        image={img}
        price="€373.72"
        title=" Castelli Arenberg Gel 2 Mits / Short Finger Cycling Gloves"
      />
      <ProductCart
        image={img}
        price="€883.95"
        title="  Endura Strike Waterproof Long Finger Cycling Gloves"
      />
    </>
  );
}

export default CartList;
