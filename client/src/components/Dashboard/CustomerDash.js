import React, { useEffect, useState } from "react";
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

function CustomerDash() {
  const account = useSelector((state) => state.account);
  const { user, loading } = account;
  const [defaultAddress, setDefaultAddress] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user?.address?.length > 0) {
      const defaultAddressArr = user?.address?.filter(
        (address) => address.default == true
      );
      setDefaultAddress(defaultAddressArr[0]);
    }
  }, [user]);

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
              <button onClick={() => dispatch(showAddressModal("new"))}>
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

      <div className="bg-white rounded-lg w-full">
        <div className="flex justify-between p-4 ">
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
        <div className="flex justify-between p-4">
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
