import React, { useState } from "react";
import { FreeMode, Navigation } from "swiper";
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

function Carousel(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={props.style}
        className={props.class}
        resistance={true}
        resistanceRatio={props?.resistanceRatio}
        // install Swiper modules
        modules={props.pagination ? [Thumbs, Pagination] : [Thumbs, FreeMode]}
        pagination={{
          dynamicBullets: true,
        }}
        freeMode={{ enabled: props.freeMode, momentumBounce: false }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        // Responsive breakpoints

        breakpoints={props.breakpoints}
        spaceBetween={props.space}
        slidesPerView={props.spv}
      >
        {props.children}
      </Swiper>

      {props.thumb ? (
        <Swiper
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={20}
          height={100}
          className="thumbs hidden md:block"
        >
          <SwiperSlide>
            <img
              className="Image"
              src={props?.images?.length > 0 ? props.images[0] : null}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="Image"
              src={props?.images?.length > 0 ? props.images[1] : null}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="Image"
              src={props?.images?.length > 0 ? props.images[2] : null}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="Image"
              src={props?.images?.length > 0 ? props.images[3] : null}
            />
          </SwiperSlide>
        </Swiper>
      ) : null}
    </>
  );
}

export default Carousel;
