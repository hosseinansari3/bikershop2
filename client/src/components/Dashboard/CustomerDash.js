import React from "react";
import { SwiperSlide } from "swiper/react";
import ProductCart from "../Body/ProductCart";
import Carousel from "../Carousel/Carousel";
import img from "../../assets/images/mondraker-01022382-20126475-DUSK-R_300x300@2x.jpg";
import CartList from "../CartList/CartList";

function CustomerDash() {
  return (
    <div>
      <div className="bg-white rounded-lg w-full">
        <div className="flex justify-between p-4 border-b-4 border-black">
          <h4>My Orders</h4>
          <span>Show All</span>
        </div>
        <div className="grid gap-4 grid-cols-3">
          <div className=" grid text-white bg-blue-400 justify-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                fill="currentColor"
                class="bi bi-bag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
            <div className="text-center">
              <p>Current</p>
              <p>8</p>
            </div>
          </div>
          <div className=" grid text-white bg-green-500 justify-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                fill="currentColor"
                class="bi bi-bag-check"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
            <div className="text-center">
              <p>Delivered</p>
              <p>8</p>
            </div>
          </div>
          <div className=" grid text-white bg-orange-400 justify-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                fill="currentColor"
                class="bi bi-bag-x"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
            <div className="text-center">
              <p>Rejected</p>
              <p>8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 bg-white rounded-lg w-full">
        <div className="flex justify-between p-4 border-b-4 border-black">
          <h4>Recent Purchases</h4>
          <span>Show All</span>
        </div>
        <div className="grid grid-cols-1">
          <div>
            <CartList carousel={true} Title="Apparel" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDash;
