import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/products";
import { addToCard } from "../../actions/cart";

import "./product.css";
import Carousel from "../../components/Carousel/Carousel";
import ProductColor from "../../components/ProductColor/ProductColor";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { SwiperSlide } from "swiper/react";

import cross from "../../assets/images/Cross-Bike.jpg";
import city from "../../assets/images/City-Bike.jpg";

import mountain from "../../assets/images/Mountain-bike.jpg";
import road from "../../assets/images/Road-bike.jpg";
import { Paper } from "@mui/material";
import CartList from "../../components/CartList/CartList";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import avatar1 from "../../assets/images/2.jpg";
import avatar2 from "../../assets/images/1.jpg";
import { updateWishlist } from "../../actions/wishlist";
import {
  addProductReview,
  fetchProductReviews,
  reviewChange,
} from "../../actions/reviews";
import { REVIEW_STATUS } from "../../constants/panelConstants";
import StarRating from "../../components/StarRating";
import Rating from "@mui/material/Rating";
import CarouselMobile from "../../components/Carousel/CarouselMobile";

function Product() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVarient, setSelectedVarient] = useState([]);

  const [rating, setRating] = React.useState(2);

  const increment = () => {
    quantity < selectedVarient[0]?.stock && setQuantity(Number(quantity) + 1);
  };

  const decrement = () => {
    quantity > 1 && setQuantity(Number(quantity) - 1);
  };

  const { slug } = useParams();
  const productDetails = useSelector((state) => state.ProductDetails);
  const Reviews = useSelector((state) => state.review.productReviews);

  const { product } = productDetails;
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const addToCardHandler = (p, qty) => {
    dispatch(addToCard(p, qty, selectedSize));
  };

  const reviewChangeHandler = (name, value) => {
    dispatch(reviewChange(name, value));
  };

  const reviewPublishHandler = (e) => {
    e.preventDefault();

    dispatch(addProductReview());
  };

  useEffect(() => {
    dispatch(getProductById(slug));
    dispatch(fetchProductReviews(slug, { status: REVIEW_STATUS.Approved }));
  }, [dispatch]);

  useEffect(() => {
    setImages(product?.images);
  }, [product]);

  useEffect(() => {
    const selectedV = product?.variants?.filter((varient) => {
      return varient.size == selectedSize;
    });

    console.log("selectedV", selectedV);

    selectedV != undefined && setSelectedVarient(selectedV);
    setQuantity(1);
  }, [selectedSize]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    dispatch(
      updateWishlist({
        productId: product?._id,
      })
    );
  };
  {
    if (images && images.length > 0) {
      console.log("prrrrrrrr", images[0]);
    } else {
      console.log("images array is empty or undefined");
    }
  }

  console.log("selected", selectedVarient);

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 p-5">
            <div className="product-images-Carousel">
              <Carousel
                class="hidden md:block"
                spv={1}
                space={20}
                thumb={true}
                pagination={true}
                images={images}
              >
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 0 ? images[0] : null}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 1 ? images[1] : null}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 2 ? images[2] : null}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 3 ? images[3] : null}
                  />
                </SwiperSlide>
              </Carousel>
              <CarouselMobile
                class="md:hidden"
                spv={1}
                space={20}
                thumb={true}
                images={images}
              >
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 0 ? images[0] : null}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 1 ? images[1] : null}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 2 ? images[2] : null}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="Image"
                    src={images && images.length > 3 ? images[3] : null}
                  />
                </SwiperSlide>
              </CarouselMobile>
            </div>
            <div className="col-lg-6 p-6 shadow-lg md:ml-4">
              <div>
                <div className="title">{product?.title}</div>
              </div>

              <div className="product-specification">
                <div className="size">
                  <label
                    className="text-sm font-bold"
                    style={{ padding: "4px" }}
                    for="Size-select"
                  >
                    Select Size{" "}
                  </label>
                  <select
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                    }}
                    className="border-[1.5px] border-solid border-black h-10 w-full"
                    name="Sizes"
                    id="Size-select"
                  >
                    <option value="">--Please choose an option--</option>
                    {product?.variants?.map((variant) => {
                      return (
                        <option value={variant.size}>
                          {variant.size} Frame Size
                        </option>
                      );
                    })}
                  </select>
                </div>

                {selectedVarient?.length > 0 &&
                  (selectedVarient[0]?.stock > 0 ? (
                    <span>
                      {" "}
                      <p>
                        In stock – Delivery time to Germany 2-6 working days**
                      </p>{" "}
                    </span>
                  ) : null)}
              </div>
              <div className="flex justify-around mt-4">
                <div>
                  <p className="mb-[-15px] text-red-500">Discount 33%</p>
                  <span className="text-[30pt] text-red-500">
                    {product?.price}$
                  </span>
                </div>

                <div className="flex items-center">
                  <StarRating rateValue={product?.rating} readOnly={true} />

                  <div className="ml-3 hidden md:block">
                    Assembling | Bulky good
                    {selectedVarient?.length > 0 &&
                      (selectedVarient[0]?.stock > 0 ? (
                        <span>
                          {" "}
                          | Still {selectedVarient[0]?.stock} in stock
                        </span>
                      ) : (
                        <span className="text-red-500"> out of stock</span>
                      ))}
                  </div>
                </div>
              </div>
              <ul className="flex text-[25pt] justify-evenly">
                <li className="text-center">
                  <div>
                    <AccountBalanceIcon fontSize="inherit" />
                    <p className="pl-2 hidden md:block md:text-[11pt]">
                      6 Bank Offers Available
                    </p>
                  </div>
                </li>
                <li className="text-center">
                  <div>
                    <CreditScoreIcon fontSize="inherit" />
                    <p className="pl-2 hidden md:block md:text-[11pt]">
                      90 Payment Options available
                    </p>
                  </div>
                </li>
                <li className="text-center">
                  <div>
                    <EventRepeatIcon fontSize="inherit" />
                    <p className="pl-2 hidden md:block md:text-[11pt]">
                      7 Day Easy Returns on Biker.com
                    </p>
                  </div>
                </li>
                <li className="text-center">
                  <div>
                    <LocalShippingIcon fontSize="inherit" />{" "}
                    <p className="pl-2 hidden md:block md:text-[11pt]">
                      Free Shipping Worth $200
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-5">
                <div className="h-full flex mb-1.5 justify-between">
                  <button
                    disabled={
                      selectedVarient?.length == 0 ||
                      selectedVarient[0]?.stock == 0
                    }
                    className={`${
                      selectedVarient?.length == 0 ||
                      selectedVarient[0]?.stock == 0
                        ? "border-gray-100 bg-gray-100 text-gray-300"
                        : "border-black hover:bg-black hover:text-white"
                    } w-[74%] inline-block border-2 border-solid transition-all  `}
                    onClick={() => addToCardHandler(slug, quantity)}
                  >
                    <span>ADD TO CARD</span>
                  </button>
                  <div
                    className={`${
                      selectedVarient?.length == 0 ||
                      selectedVarient[0]?.stock == 0
                        ? "border-gray-100 bg-gray-100 text-gray-300"
                        : "border-black hover:bg-black hover:text-white"
                    } w-1/4 justify-around items-center border-2	border-solid h-full inline-flex`}
                  >
                    <button
                      disabled={
                        selectedVarient?.length == 0 ||
                        selectedVarient[0]?.stock == 0
                      }
                      onClick={decrement}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-input flex justify-center items-center">
                      {quantity}
                    </span>
                    <button
                      disabled={
                        selectedVarient?.length == 0 ||
                        selectedVarient[0]?.stock == 0
                      }
                      onClick={increment}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToWishlist}
                  className="h-14 w-full border-2	 block border-solid  h-8  border-black transition-all hover:bg-black hover:text-white"
                >
                  <FavoriteBorderIcon />
                  <span>ADD TO WISHLIST</span>
                </button>
              </div>
            </div>
          </div>
          <div className="px-5">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="fullWidth"
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="DESCRIPTION" {...a11yProps(0)} />
                  <Tab label="ADITIONAL INFORMATION" {...a11yProps(1)} />
                  <Tab label="REVIEWS" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div
                  dangerouslySetInnerHTML={{ __html: product?.content }}
                ></div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div>
                  <table className="product-detail-data-sheet__table">
                    <tbody>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Product Name:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized TURBO VADO 3.0 IGH - Men&#039;s City
                          E-Bike - 2022 - white mountains / black reflecitve
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Manufacturer:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized Bikes
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Item Code:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          SBC556760
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          activity:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Cycling
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          gender:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          men
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          material:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Aluminium
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          usage bikesport:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Trekking, E-Bike, City
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          hubs:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Shimano MT400 | enviolo CITY
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          spokes:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          DT Swiss Industry
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          rims:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          650B | AL | Double Wall
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          chain:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Gates Carbon Drive CDX
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          cassette:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Gates Carbon Drive CDC
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          shifter:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          enviolo Twist Display Pure
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          rear derailleur:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          enviolo CVP Multi-Turn
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          chainring ratio:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          50
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          crankset:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Custom
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          brakes:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Shimano BR-MT200 | 180/180mm
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          seat post:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized | 6061 AL
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          saddle:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Rivo Sport
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          handle bar:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized | 15° Backsweep | 46mm Rise
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          stem:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized Flowset | 20°
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          fork:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          SR Suntour Mobie A32
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          frame:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          E5 Aluminum
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          groupset:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Enviolo
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          gear ratio:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          24
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          battery ernergy:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          530Wh
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          number of chainrings:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          1
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          shifting system:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Gearbox Transmission
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          shifting actuation:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Mechanical
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          E-Bike battery:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized U2-530
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          assisted speed:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          max. 25 km/h
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Drive Unit Manufacturer:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          motor location:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Mid-Mounted Motor
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          bike extras:
                        </td>
                        <td className="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          with Lighting System, with Fender , with Carrier{" "}
                        </td>
                      </tr>
                      <tr className="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          brake type:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Disc Brake
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          wheel size:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          27,5" / 650B (584mm)
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          bike special accessories:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized Rack | DRYTECH Fender | Specialized
                          Kickstand
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          bike lights:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Lezyne Ebike Mini E65 | Spanninga Commuter Glow XE
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          grips:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Body Geometry
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          travel fork:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          80mm
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          pedals:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized Commuter
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          tires:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Pathfinder Sport Reflect | 650B x 2.3"
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          brake actuation:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Hydraulic
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Model year:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          2022
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Collection:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Full year
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Color:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          White
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          manufacturer item code:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          95322-75
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          cable routing:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          internal
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Display / Control Unit:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized Master Mind TCD
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Drive Unit Model:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          Specialized 2.0 E
                        </td>
                      </tr>
                      <tr class="product-detail-data-sheet__row">
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--title">
                          Manufacturer page:
                        </td>
                        <td class="product-detail-data-sheet__cell product-detail-data-sheet__cell--value">
                          http://www.specialized.com
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div>
                    {Reviews.map((review) => {
                      return (
                        <Paper className="comment-wrapper" elevation={3}>
                          <div className="review-content">
                            <div className="grid grid-cols-4">
                              <div className="review-img me-3 d-none d-lg-block">
                                <img
                                  className="w-20 h-20 object-cover"
                                  src={review.user ? review.user.avatar : null}
                                />
                              </div>
                              <div className="col-span-3">
                                <div className="reviewr-name">
                                  {review.user ? review.user.firstName : null}
                                </div>
                                <div className="ratting-star2 d-flex">
                                  <StarRating
                                    rateValue={product?.rating}
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <p>{review.review}</p>
                            </div>
                          </div>
                        </Paper>
                      );
                    })}
                    {Reviews.length == 0 && (
                      <span className="font-bold">
                        there is no reviews yet!
                      </span>
                    )}
                  </div>
                  <div>
                    <div class="ratting-form-wrapper ps-5">
                      <h3 className="text-xl font-bold">Add a Review</h3>
                      <div class="ratting-form">
                        <form
                          onSubmit={(e) => reviewPublishHandler(e)}
                          action="#"
                        >
                          <div class="star-box">
                            <span className="text-lg">Your rating:</span>
                            <div className="ratting-star">
                              <StarRating />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className=" rating-form-style mb-10">
                                <input
                                  className="bg-gray-100"
                                  placeholder="Enter Review Title"
                                  name="title"
                                  type="text"
                                  onChange={(e) =>
                                    reviewChangeHandler(
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  className="bg-gray-100"
                                  name="review"
                                  placeholder="Write a Review"
                                  onChange={(e) =>
                                    reviewChangeHandler(
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                ></textarea>
                                <input
                                  className="bg-gray-100 hover:cursor-pointer"
                                  type="submit"
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div>
          <h3 className="text-center italic font-bold">RELATED PRODUCTS</h3>
        </div>
        <CartList carousel={true} Title="Apparel" />
      </div>
    </>
  );
}

export default Product;
