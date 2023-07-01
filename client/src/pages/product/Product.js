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

import StarRatingComponent from "react-star-rating-component";

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

function Product() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(Number(quantity) + 1);
  };

  const decrement = () => {
    quantity > 0 && setQuantity(Number(quantity) - 1);
  };

  const { slug } = useParams();
  const productDetails = useSelector((state) => state.ProductDetails);
  const Reviews = useSelector((state) => state.review.productReviews);

  const { product } = productDetails;

  const dispatch = useDispatch();

  const ProductAddToCartNotif = () =>
    toast("PRODUCT ADDED TO CART SUCCESSFULLY!");

  const addToCardHandler = (p, qty) => {
    dispatch(addToCard(p, qty));
    ProductAddToCartNotif();
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
    dispatch(fetchProductReviews(slug));
  }, [dispatch]);

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

  const sss = {
    productId: product?._id,
  };

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        {console.log("ppppRRR:" + JSON.stringify(Reviews))}

        {product ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-5">
              <div>
                <Carousel style={{}} spv={1} space={20} thumb={true}>
                  <SwiperSlide>
                    <img className="Image" src={cross} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className="Image" src={city} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className="Image" src={mountain} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className="Image" src={road} />
                  </SwiperSlide>
                </Carousel>
              </div>
              <div className="col-lg-6 p-3">
                <div>
                  <div className="title">{product.title}</div>
                </div>
                <StarRatingComponent name="rate1" starCount={5} value={3} />

                <div className="price">
                  <div>${product.price}</div>
                </div>
                <div className="product-specification">
                  <div>
                    <ProductColor />
                  </div>
                  <div className="size">
                    <label style={{ padding: "4px" }} for="Size-select">
                      Select Size{" "}
                    </label>
                    <select name="Sizes" id="Size-select">
                      <option value="">--Please choose an option--</option>
                      <option value="18">18" (Standard) Frame Size</option>
                    </select>
                  </div>
                </div>
                <ul style={{ paddingTop: "34px", paddingLeft: "29px" }}>
                  <li>
                    <AccountBalanceIcon />
                    <span className="pl-2">6 Bank Offers Available.</span>
                  </li>
                  <li>
                    <CreditScoreIcon />
                    <span className="pl-2">90 Payment Options available.</span>
                  </li>
                  <li>
                    <EventRepeatIcon />{" "}
                    <span className="pl-2">
                      7 Day Easy Returns on Biker.com
                    </span>
                  </li>
                  <li>
                    <LocalShippingIcon />
                    <span className="pl-2">Free Shipping Worth $200</span>
                  </li>
                </ul>
                <div className="h-14 my-10 mb-2">
                  <button
                    className="inline-block border-2 border-solid h-full border-black mx-2 px-20 transition-all hover:bg-black hover:text-white"
                    onClick={() => addToCardHandler(slug, quantity)}
                  >
                    ADD TO CARD
                  </button>

                  <div className="border-2	border-solid h-full border-black inline-flex mx-2">
                    <button onClick={decrement} className="quantity-btn">
                      -
                    </button>
                    <span className="quantity-input flex justify-center items-center">
                      {quantity}
                    </span>
                    <button onClick={increment} className="quantity-btn">
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToWishlist}
                  className="border-2	 block border-solid  h-8 px-[88px] border-black mx-2 transition-all hover:bg-black hover:text-white"
                >
                  <FavoriteBorderIcon />
                  ADD TO WISHLIST
                </button>
              </div>
            </div>
            <div className="px-5">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
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
                  <div>
                    <h3>It's you, only faster!</h3>
                    <p>
                      The Vado is the bike for everything from the daily commute
                      to fast workouts to longer weekend adventures. It offers a
                      smooth riding experience on different trails and the
                      option to carry everything you need. The geometry is
                      designed for sporty riding while being comfortable enough
                      for city use. The position on the bike conveys high
                      reliability and supports you with efficient power to get
                      from A to B.
                    </p>
                    <h3> </h3>
                    <h3>Features of the Specialized TURBO VADO 3.0 IGH</h3>
                    <ul>
                      <li>E5 aluminum frame</li>
                      <li>SR Suntour Mobie A32 suspension fork</li>
                      <li>continuously variable Enviolo City hub gears</li>
                      <li>equipped with stand, rack, lights and mudguards</li>
                      <li>Pathfinder Sport tires with reflective stripes</li>
                      <li>Specialized 2.0E motor with 50Nm of torque</li>
                      <li>Specialized U2 battery with 530wh</li>
                      <li>
                        MasterMind TCD display with Bluetooth &amp; integrated
                        anti-theft device
                      </li>
                    </ul>
                    <p> </p>
                    <h3>Details of the Specialized TURBO VADO 3.0 IGH</h3>
                    <h4>Full Power</h4>
                    <p>
                      The Turbo Full Power 2.0 motor and 530wh battery offer an
                      unparalleled riding experience. The harmonious, smooth and
                      quiet motor supports up to 25 km/h. The internal control
                      unit delivers the motor's assistance, delivered by the
                      rider, with a very natural riding feel.
                    </p>
                    <h4>Full assistance</h4>
                    <p>
                      The continuously variable Enviolo City geared hub is
                      equipped with a special hub and a rotating wheel on the
                      handlebar grip. The manual and continuously variable
                      technology is as easy to use as the volume control on the
                      radio. This allows the rider to concentrate fully on
                      riding.
                    </p>
                    <h4>Full control</h4>
                    <p>
                      MasterMind and Mission Control - the MasterMind display
                      shows all the important data of the ride, allows driving
                      mode adjustment while riding and over-the-air updates. The
                      Mission Control app can be used to optimize range, perform
                      tunings, record rides, and more.
                    </p>
                    <h4>Full comfort</h4>
                    <p>
                      Proven, harmonious efficiency - Specialized has developed
                      a proprietary testing process to filter out small jumps in
                      motor assist for greater comfort. That precision, combined
                      with a suspension seatpost, wide tires, and a suspension
                      fork, will have you floating on air.
                    </p>
                    <h4>Full protection</h4>
                    <p>
                      Turbo System theft protection - the Mission Control app
                      can be used to lock the motor and activate the motion
                      sensor. This protection can only be deactivated again by
                      the owner.
                    </p>
                    <h4>Full integration</h4>
                    <p>
                      The removable and lockable battery is stowed in the down
                      tube. It is easy to remove, easy to charge and even easier
                      to secure. Furthermore, the bike comes with DRYTECH
                      mudguards, LED front / rear light and a carrier that can
                      be loaded with up to 27 kg.
                    </p>
                    <br></br>
                    <p> </p>
                    <h3>Get the Specialized lifetime warranty with BIKE24</h3>
                    <p>
                      Specialized stands for quality and that's not just
                      something said, it's a commitment. That's why Specialized
                      gives you a lifetime warranty on ALL Specialized-branded
                      frames forks. You just have to register your product at
                      Specialized within 90 days after purchase. To make this
                      step easier for you, BIKE24 delivers all Specialized bikes
                      with a QR code. Simply scan the QR code and go directly to
                      the Specialized website with all the information about
                      bicycle registration. For Specialized Turbo e-bikes e-bike
                      frames, the Mission Control app is required for
                      registration.
                    </p>
                  </div>
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
                                    src={review.user.avatar}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <div className="reviewr-name">
                                    {review.user.firstName}
                                  </div>
                                  <div className="ratting-star2 d-flex">
                                    <StarRatingComponent
                                      name="rate1"
                                      starCount={5}
                                      value={3}
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
                                <StarRatingComponent
                                  name="rate1"
                                  starCount={5}
                                  value={3}
                                />
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
        ) : null}
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
