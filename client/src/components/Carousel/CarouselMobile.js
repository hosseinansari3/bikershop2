import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

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
