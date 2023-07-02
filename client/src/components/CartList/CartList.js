import React from "react";
import ProductCart from "../Body/ProductCart";

import "./CartList.css";
import Carousel from "../Carousel/Carousel";
import { SwiperSlide } from "swiper/react";
import img from "../../assets/images/teammachine-slr-01-three-turquoise-black-1285874.jpg";
import img1 from "../../assets/images/cross-race-c68x-te-liquidblue-flashyellow-1422220.jpg";
import img2 from "../../assets/images/twostroke-01-four-red-blk-blk-1078586.jpg";
import img3 from "../../assets/images/bmc-teammachine-alr-two-sil-blk-red-1078691.jpg";
import img4 from "../../assets/images/roadmachine-01-four-coral-red-black-1285467.jpg";

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
            price=" 3990.99"
            title=" Endura Hummvee Cycling Trousers II"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img1}
            price=" 2590.99"
            title="Radon Skeen Trail 9.0"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img2}
            price=" 3999.99"
            title="Cube Stereo Hybrid 140 HPC"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img3}
            price=" 4290.99"
            title="Radon Spire Disc 9.0"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCart
            className="hover:shadow-xl m-2"
            image={img4}
            price="3,196.77"
            title="Cube Reaction Hybrid SL 750"
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
      <ProductCart image={img1} price="€33.95" title="Radon Skeen Trail 9.0" />
      <ProductCart
        image={img}
        price="€373.72"
        title="Cube Stereo Hybrid 140 HPC Actionteam"
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
