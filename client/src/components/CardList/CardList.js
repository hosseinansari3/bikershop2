import React from "react";
import ProductCard from "../ProductCard/ProductCard";

import "./CardList.css";
import Carousel from "../Carousel/Carousel";
import { SwiperSlide } from "swiper/react";
import img from "../../assets/images/teammachine-slr-01-three-turquoise-black-1285874.jpg";
import img1 from "../../assets/images/cross-race-c68x-te-liquidblue-flashyellow-1422220.jpg";
import img2 from "../../assets/images/twostroke-01-four-red-blk-blk-1078586.jpg";
import img3 from "../../assets/images/bmc-teammachine-alr-two-sil-blk-red-1078691.jpg";
import img4 from "../../assets/images/roadmachine-01-four-coral-red-black-1285467.jpg";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";

function CardList(props) {
  if (props.carousel) {
    return (
      <Carousel
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
          <div className="hover:shadow-xl m-2">
            <Link to="#">
              <div>
                <img
                  className=" object-contain w-full h-[225px]"
                  src={img}
                  alt="ddsdfsfd"
                />
              </div>
            </Link>
            <div className="product-title">
              Endura Hummvee Cycling Trousers II
            </div>
            <div className="flex justify-center">
              <StarRating rateValue={props.rating} readOnly={true} />
            </div>

            <div className="product-price">3990.99 $</div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hover:shadow-xl m-2">
            <Link to="#">
              <div>
                <img
                  className="object-contain w-full h-[225px]"
                  src={img1}
                  alt="ddsdfsfd"
                />
              </div>
            </Link>
            <div className="product-title">Radon Skeen Trail 9.0</div>
            <div className="flex justify-center">
              <StarRating rateValue={props.rating} readOnly={true} />
            </div>
            <div className="product-price">2590.99 $</div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hover:shadow-xl m-2">
            <Link to="#">
              <div>
                <img
                  className="object-contain w-full h-[225px]"
                  src={img2}
                  alt="ddsdfsfd"
                />
              </div>
            </Link>
            <div className="product-title">Cube Stereo Hybrid 140 HPC</div>
            <div className="flex justify-center">
              <StarRating rateValue={props.rating} readOnly={true} />
            </div>
            <div className="product-price">3999.99 $</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hover:shadow-xl m-2">
            <Link to="#">
              <div>
                <img
                  className=" object-contain w-full h-[225px]"
                  src={img3}
                  alt="ddsdfsfd"
                />
              </div>
            </Link>
            <div className="product-title">Radon Spire Disc 9.0</div>
            <div className="flex justify-center">
              <StarRating rateValue={props.rating} readOnly={true} />
            </div>
            <div className="product-price">4290.99 $</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hover:shadow-xl m-2">
            <Link to="#">
              <div>
                <img
                  className="object-contain w-full h-[225px]"
                  src={img4}
                  alt="ddsdfsfd"
                />
              </div>
            </Link>
            <div className="product-title">Cube Reaction Hybrid SL 750</div>
            <div className="flex justify-center">
              <StarRating rateValue={props.rating} readOnly={true} />
            </div>
            <div className="product-price">3,196.77 $</div>
          </div>
        </SwiperSlide>
      </Carousel>
    );
  }
  return (
    <>
      <ProductCard
        image={img}
        price=" €39.99"
        title=" Endura Hummvee Cycling Trousers II"
      />
      <ProductCard image={img1} price="€33.95" title="Radon Skeen Trail 9.0" />
      <ProductCard
        image={img}
        price="€373.72"
        title="Cube Stereo Hybrid 140 HPC Actionteam"
      />
      <ProductCard
        image={img}
        price="€883.95"
        title="  Endura Strike Waterproof Long Finger Cycling Gloves"
      />
    </>
  );
}

export default CardList;
