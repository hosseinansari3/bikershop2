import React, { useEffect, useState } from "react";

import CartList from "../../components/CartList/CartList";

import "./MainPage.css";
import Carousel from "../../components/Carousel/Carousel";
import ProductCart from "../../components/Body/ProductCart";

import img1 from "../../assets/images/Cross-Bike.jpg";
import img2 from "../../assets/images/City-Bike.jpg";
import img3 from "../../assets/images/Mountain-bike.jpg";
import img4 from "../../assets/images/Road-bike.jpg";
import img from "../../assets/images/mondraker-01022382-20126475-DUSK-R_300x300@2x.jpg";

import bike1 from "../../assets/images/MTF_Se29ENDC_93622-50-il.jpg";
import bike2 from "../../assets/images/MTF_Kn39HEICD_KONA-HEI-HEI-CR-DL-GLOSS-METALLIC-GREY-AND-CHARCOAL-00-il.jpg";
import bike3 from "../../assets/images/MTF_3l.jpg";
import bike4 from "../../assets/images/MTF_4.jpg";
import bike5 from "../../assets/images/MTH5.jpg";

import part1 from "../../assets/images/part1.jpg";
import part2 from "../../assets/images/part2.jpg";
import part3 from "../../assets/images/part3.jpg";
import part4 from "../../assets/images/part4.jpg";
import {
  ShoppingCart,
  CardGiftcardOutlined,
  DirectionsBikeOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import { SwiperSlide } from "swiper/react";
import { fetchProductBySection } from "../../api";
import { SECTIONS } from "../../constants/panelConstants";
import { Axios } from "axios";
import axios from "axios";

function MainPage() {
  const [hotDiscount, setHotDiscount] = useState(null);
  const [bestSeller, setBestSeller] = useState(null);
  const [newArrival, setNewArrival] = useState(null);
  const [ourOffer, setOurOffer] = useState(null);

  useEffect(() => {
    fetchProductBySection(SECTIONS.Hot_Discount)
      .then((response) => {
        console.log("HotDiscount", response.data.products);
        setHotDiscount(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProductBySection(SECTIONS.Best_Seller)
      .then((response) => {
        console.log("BestSeller", response.data.products);
        setBestSeller(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProductBySection(SECTIONS.New_Arrival)
      .then((response) => {
        console.log("newArrival", response.data.products);
        setNewArrival(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchProductBySection(SECTIONS.Our_Offer)
      .then((response) => {
        console.log("ourOffer", response.data.products);
        setOurOffer(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    const myObj = { first: "sss", second: "bbb" };
  }, []);

  return (
    <>
      <div className="main-carousel">
        <Carousel
          class="carousel-width-100"
          space={5}
          spv={1}
          image={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Norco_Range.jpg/800px-Norco_Range.jpg"
          }
        >
          <SwiperSlide>
            <img className="Image" src={img1} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="Image" src={img2} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="Image" src={img3} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="Image" src={img4} />
          </SwiperSlide>
        </Carousel>
      </div>

      <div className=" p-6 flex grid grid-cols-2 md:grid-cols-4 gap-4 gradient card-wrapper">
        <div className="category-card">
          <div>
            <ShoppingCart className="choose-us-icon" />
          </div>
          <div className="choose-us-text">
            <h4>WIDE RANGE SELECTION </h4>
            <p>Vast option for latest bike related products for you.</p>
          </div>
        </div>
        <div className="category-card">
          <div>
            <CardGiftcardOutlined className="choose-us-icon" />
          </div>
          <div className="choose-us-text">
            <h4>SPECIAL PROMO FOR YOU </h4>
            <p>Find our promotion for your best deals - special for you.</p>
          </div>
        </div>
        <div className="category-card">
          <div>
            <DirectionsBikeOutlined className="choose-us-icon" />
          </div>
          <div className="choose-us-text">
            <h4>READY TO RIDE </h4>
            <p>We'll deliver your bike in assembled and it's Ready to Ride!</p>
          </div>
        </div>
        <div className="category-card">
          <div>
            <StorefrontOutlined className="choose-us-icon" />
          </div>
          <div className="choose-us-text">
            <h4>PICK UP STORE </h4>
            <p>
              No need to queue; buy online and pick up your items directly in
              our shops!
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 gradient-continue">
        <h3 className="title">HOT DISCOUNT!</h3>
        <div
          className=" justify-center grid  grid-cols-2 md:grid-cols-4 gap-4
        "
        >
          {hotDiscount?.map((product) => {
            return (
              <ProductCart
                className="shadow-lg hover:shadow-none"
                image={product.images[0]}
                price={product.price}
                title={product.title}
              />
            );
          })}
        </div>
      </div>

      <div
        className="flex justify-center p-5 grid grid-cols-1 lg:grid-cols-3 gap-4"
        style={{ backgroundColor: "#e7e7e7" }}
      >
        <div className="left lg:col-span-2">
          <h3 className="title">BEST SELLER!</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bestSeller?.map((product) => {
              return (
                <ProductCart
                  image={product.images[0]}
                  price={product.price}
                  title={product.title}
                />
              );
            })}
          </div>
        </div>
        <div className="rightt">
          <h3 className="title">NEW ARRIVAL</h3>
          <Carousel
            class="big-card-carousel"
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
                slidesPerView: 1,
                // spaceBetween: 40,
              },
              1168: {
                slidesPerView: 1,
                // spaceBetween: 40,
              },
            }}
          >
            {newArrival?.map((product) => {
              return (
                <SwiperSlide>
                  <div className="big-card-wrapper">
                    <ProductCart
                      image={product.images[0]}
                      class="big-card"
                      price={product.price}
                      title={product.title}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div>
        <div>
          <h3 className="title">OUR OFFER!</h3>
        </div>
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
          {ourOffer?.map((product) => {
            return (
              <SwiperSlide>
                <ProductCart
                  className="hover:shadow-xl m-2"
                  image={product.images[0]}
                  price={product.price}
                  title={product.title}
                />
              </SwiperSlide>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default MainPage;
