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

      <div className="">
        <Carousel
          spv={2}
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
            <div className="flex justify-center items-center h-24">
              <img
                className="w-32 md:w-8/12"
                src="https://www.bike-discount.de/media/image/c5/5f/9b/cubelogo_200x200.png"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex justify-center items-center h-24">
              <img
                className="w-32 md:w-8/12"
                src="https://www.bike-discount.de/media/image/50/30/69/dtswiss-logo_200x200.png"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex justify-center items-center h-24">
              <img
                className="w-32 md:w-8/12"
                src="https://www.bike-discount.de/media/image/36/7d/78/ergon2_wbc_4c_200x200.png"
              />
            </div>{" "}
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-24">
              <img
                className="w-32 md:w-8/12"
                src="https://www.bike-discount.de/media/image/1d/60/29/garmin-logo_200x200.png"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center h-24">
              <img
                className="w-32 md:w-8/12"
                src="https://www.bike-discount.de/media/image/31/69/a1/maxxis-logo_200x200.png"
              />
            </div>
          </SwiperSlide>
        </Carousel>
      </div>

      <div
        id="hot-discount"
        className="rounded-[20px] mb-3 w-[86vw] gradient-continue hidden lg:block w-full  mx-auto"
      >
        <Carousel freeMode spv={4} space={10} class={"h-60 md:h-72 "}>
          <SwiperSlide>
            <div className="items-center flex flex-col justify-center">
              <img
                className="w-[120px] top-[110ox] left-[50px]"
                src="https://i.postimg.cc/hGx5yJtY/Lovepik-com-401572374-promotional-discount-offer-gift-box-gift-package.png"
              />

              <h3 className="text-[30pt] text-center w-[200px] font-bold text-white top-[30px]">
                HOT DISCOUNT
              </h3>
            </div>
          </SwiperSlide>
          {hotDiscount?.map((product) => {
            return (
              <SwiperSlide>
                <div className="flex justify-center">
                  <ProductCart
                    className="shadow-lg hover:shadow-none w-[200px] min-w-[200px] max-w-[200px] "
                    imgClass="w-full h-[110px] md:h-[100px] object-contain"
                    image={product.images[0]}
                    price={product.price}
                    title={product.title}
                    slug={product.slug}
                    rating={product?.rating}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Carousel>
      </div>

      <div className="lg:hidden mb-3 w-full max-w-[1336px] mx-auto">
        <div>
          <div
            style={{ scrollbarWidth: "none" }}
            className="gradient-continue py-3 flex flex-nowrap overflow-x-auto"
          >
            <div className="items-center flex flex-col justify-center w-[200px] min-w-[200px] max-w-[200px] mr-2.5">
              <img
                className="w-[120px] top-[110ox] left-[50px]"
                src="https://i.postimg.cc/hGx5yJtY/Lovepik-com-401572374-promotional-discount-offer-gift-box-gift-package.png"
              />

              <h3 className="text-[30pt] text-center w-[200px] font-bold text-white top-[30px]">
                HOT DISCOUNT
              </h3>
            </div>
            {hotDiscount?.map((product) => {
              return (
                <div className="flex justify-center">
                  <ProductCart
                    className="mr-1.5 shadow-lg hover:shadow-none w-[200px] min-w-[200px] max-w-[200px] "
                    imgClass="w-full h-[110px] md:h-[100px] object-contain"
                    image={product.images[0]}
                    price={product.price}
                    title={product.title}
                    slug={product.slug}
                    rating={product?.rating}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          className="object-cover h-64 w-[86vw] opacity-80  rounded-[10px] h-[200px] mx-auto mb-3"
          src="https://images.giant-bicycles.com/kl3h00cvovzjp3ile6ih/preview.jpg"
        />
        <div className="absolute left-5 top-5 flex flex-col justify-center items-center left-[120px]">
          <p className="font-bold text-white text-[20pt]">
            RIDE TO THE HORIZON
          </p>
          <button className="border-2 text-white w-[180px] border-solid border-white p-2">
            SHOP NOW
          </button>
        </div>
      </div>

      <div className="p-6 gradient-continue">
        <h3 className="title w-fit border-b-4 border-red-500 rounded-lg mx-auto mb-5">
          BEST SELLER!
        </h3>
        <Carousel
          spv={2}
          space={6}
          class={"h-60 md:h-80"}
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
          {bestSeller?.map((product) => {
            return (
              <SwiperSlide>
                <div className="flex justify-center">
                  <ProductCart
                    className="shadow-lg hover:shadow-none w-[230px]"
                    image={product.images[0]}
                    price={product.price}
                    title={product.title}
                    slug={product.slug}
                    rating={product?.rating}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Carousel>
      </div>
      <div className="rightt">
        <h3 className="title w-fit border-b-4 border-red-500 rounded-lg mx-auto mb-5">
          NEW ARRIVAL
        </h3>
        <Carousel
          spv={2}
          space={6}
          class={"h-60 md:h-80"}
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
          {newArrival?.map((product) => {
            return (
              <SwiperSlide>
                <div className="flex justify-center">
                  <ProductCart
                    className="shadow-lg hover:shadow-none w-[230px]"
                    image={product.images[0]}
                    price={product.price}
                    title={product.title}
                    slug={product.slug}
                    rating={product?.rating}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Carousel>
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
