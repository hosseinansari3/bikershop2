import React, { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import ProductCart from "../Body/ProductCart";
import Carousel from "../Carousel/Carousel";
import img from "../../assets/images/mondraker-01022382-20126475-DUSK-R_300x300@2x.jpg";
import CartList from "../CartList/CartList";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../actions/account";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { showAddressModal } from "../../actions/addressModal";
import { listAllOrdersAPI, listUserOrdersAPI } from "../../api";
import { ORDER_STATUS } from "../../constants/panelConstants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fetchWishlist } from "../../actions/wishlist";

function CustomerDash() {
  const account = useSelector((state) => state.account);
  const userSignin = useSelector((state) => state.usersSignin);
  const { userInfo } = userSignin;

  const { user, loading } = account;
  const [defaultAddress, setDefaultAddress] = useState();
  const [recentOrder, setRecentOrder] = useState();
  const [showDetails, setShowDetails] = useState(false);

  const wishlist = useSelector((state) => state.wishlist);

  const myDivRef = useRef();

  const handleScrollToBottom = () => {
    setTimeout(function () {
      if (myDivRef.current) {
        myDivRef.current.scrollIntoView(false, { behavior: "smooth" });
        console.log("scrolled");
      }
    }, 100);
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  useEffect(() => {
    console.log("wishlist", wishlist);
  }, [wishlist]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
    params: { limit: 1 },
  };

  const fetchRecentOrders = async () => {
    const { data } = await listUserOrdersAPI(config);

    setRecentOrder(data[0]);
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  useEffect(() => {
    console.log("rec", recentOrder);
  }, [recentOrder]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    console.log("usem", userSignin);
  }, []);

  useEffect(() => {
    if (user?.address?.length > 0) {
      const defaultAddressArr = user?.address?.filter(
        (address) => address.default == true
      );
      setDefaultAddress(defaultAddressArr[0]);
    }
  }, [user]);

  let total = 0;
  recentOrder?.orderItems?.map((item) => {
    let itemPrice = parseFloat(item.price);
    let itemTotal = itemPrice * parseFloat(item.quantity);

    total = itemTotal + total;

    return null;
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2  grid-cols-1">
        <div className="  bg-white rounded-md m-2 justify-center">
          <div className="border-l-2 border-black flex justify-between p-3">
            <div>
              <p className="ml-2">Customer Info</p>
            </div>
            <div>
              <p className="mr-2">
                <EditIcon fontSize="small" /> Edit
              </p>
            </div>
          </div>
          <div className="p-2 mt-4">
            <div className="grid gap-6 grid-cols-2 mb-5 pl-12">
              <div className="text-left">
                <p>First Name:</p>
                <p className="font-bold">{user.firstName}</p>
              </div>
              <div className="text-left">
                <p>Last Name:</p>
                <p className="font-bold">{user.lastName}</p>
              </div>
            </div>
            <div className="grid gap-6 grid-cols-2 mb-3 pl-12">
              <div className="text-left">
                <p>Email:</p>
                <p className="font-bold">{user.email}</p>
              </div>
              <div className="text-left">
                <p>Phone Number:</p>
                <p className="font-bold">{user.phoneNumber}</p>
              </div>
            </div>
            <div className="grid gap-6 grid-cols-2 mb-3 pl-12">
              <div className="text-left">
                <p>referal code:</p>
                <p className="font-bold">R43EUX72C</p>
              </div>{" "}
              <div className="text-left">
                <p>Level:</p>
                <p className="font-bold">5</p>
              </div>
            </div>
          </div>
        </div>
        <div className="  bg-white rounded-md m-2 justify-center">
          <div className="border-l-2 border-black flex justify-between p-3">
            <div>
              <p className="ml-2">Addresses</p>
            </div>
            <div>
              <button
                className="hover:bg-gray-50 p-2 rounded-md transition-all"
                onClick={() => dispatch(showAddressModal("new"))}
              >
                <p className="mr-2">
                  <AddCircleOutlineIcon fontSize="small" /> Add new Address
                </p>
              </button>
            </div>
          </div>
          <div className="p-2 mt-4 border-black border-[1px] border-solid m-5 rounded-md">
            <div className=" flex justify-between p-3 mb-3">
              <div>
                <p className="ml-2">My Address</p>
              </div>
              <div>
                <button
                  onClick={() => dispatch(showAddressModal(defaultAddress._id))}
                >
                  <p className="mr-2">
                    <EditIcon fontSize="small" /> Edit
                  </p>
                </button>
              </div>
            </div>
            <div className="mb-3">
              <PermIdentityIcon />{" "}
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            {user?.address?.length == 0 ? (
              <div>the is no address</div>
            ) : (
              <div className="">
                <p className="mb-3">
                  <LocationOnOutlinedIcon />
                  {defaultAddress?.province}/{defaultAddress?.city}/
                  {defaultAddress?.street}
                </p>
                <div className="flex justify-between">
                  <p>
                    <LocalPhoneOutlinedIcon /> {user.phoneNumber}
                  </p>
                  <p>Postal Code: {defaultAddress?.postalCode}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg w-full mb-6">
        <div className="border-l-2 border-black flex justify-between p-3">
          <h4>YOUR LATEST ORDER</h4>
          <span>SHOW ALL</span>
        </div>
        <table className="w-full whitespace-no-wrap">
          <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
            <tr>
              <td className="px-4 py-3">ID</td>
              <td className="px-4 py-3">ITEMS</td>
              <td className="px-4 py-3">DATE</td>
              <td className="px-4 py-3">AMOUNT</td>
              <td className="px-4 py-3">STATUS</td>
            </tr>
          </thead>
          <tbody className="bg-white hover:bg-gray-50 divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
            <tr>
              <td className="px-4 py-3">
                <span className="font-semibold uppercase text-xs">
                  {recentOrder?.orderId}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="w-[155px] overflow-x-auto flex">
                  {recentOrder?.orderItems.map((item) => {
                    return (
                      <img
                        className="w-12 h-12 mx-0.5 border-2 border-solid object-cover rounded-sm	inline-block"
                        src={item.image}
                      />
                    );
                  })}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="font-semibold uppercase text-xs">
                  {recentOrder?.createdAt.substring(0, 10)}
                </span>
              </td>

              <td className="px-4 py-3">
                {}
                <span className="text-sm font-semibold">${total}</span>
              </td>
              <td className="px-4 py-3 text-xs">
                <span className="font-serif">
                  <span
                    className={`inline-flex px-2 text-xs font-medium leading-5 rounded-full  ${
                      (recentOrder?.status == ORDER_STATUS.Pending &&
                        "bg-yellow-200 text-yellow-700") ||
                      (recentOrder?.status == ORDER_STATUS.Processing &&
                        "bg-green-200 text-green-700") ||
                      (recentOrder?.status == ORDER_STATUS.Shipped &&
                        "bg-blue-200 text-blue-700") ||
                      (recentOrder?.status == ORDER_STATUS.Delivered &&
                        "bg-green-800 text-green-200")
                    } bg-green-100 dark:bg-green-800 dark:text-green-100`}
                  >
                    {recentOrder?.status}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full flex justify-center">
          <button
            onClick={(e) => {
              setShowDetails(!showDetails);
              handleScrollToBottom();
            }}
          >
            show details <KeyboardArrowDownIcon />{" "}
          </button>
        </div>
        <div
          ref={myDivRef}
          className={`${showDetails ? "block" : "hidden"} w-full p-3`}
        >
          {recentOrder?.orderItems.map((item) => {
            return (
              <div>
                <div className="flex items-center mb-3 bg-[#f8f8f8]">
                  <img
                    className="w-12 h-12 mx-0.5 border-2 border-solid object-cover rounded-sm"
                    src={item.image}
                  />
                  <p className="w-[540px] ml-1">{item.title}</p>
                  <div className="flex justify-between ml-0">
                    <p className="ml-5">QUANTITY: {item.quantity}</p>
                    <p className="ml-5">PRICE: {item.price}</p>
                    <p className="ml-5">SIZE: {item.size}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CustomerDash;
