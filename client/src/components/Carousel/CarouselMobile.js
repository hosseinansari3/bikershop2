import React, { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import { Pagination } from "swiper";

import CrossBike from "../../assets/images/Cross-Bike.jpg";
import CityBike from "../../assets/images/City-Bike.jpg";
import MountainBike from "../../assets/images/Mountain-bike.jpg";
import RoadBike from "../../assets/images/Road-bike.jpg";

import "./Carousel.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function CarouselMobile(props) {
  return (
    <>
      <Swiper
        style={props.style}
        className={props.class}
        // install Swiper modules
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
        // Responsive breakpoints

        breakpoints={props.breakpoints}
        spaceBetween={props.space}
        slidesPerView={props.spv}
      >
        {props.children}
      </Swiper>
    </>
  );
}

export default CarouselMobile;
