import React, { useEffect, useState } from "react";
import { ORDER_STATUS } from "../../constants/panelConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/orders";
import { hideOrderModal } from "../../actions/orderModal";
import { hideAddressModal } from "../../actions/addressModal";
import { useForm } from "react-hook-form";
import { editeAddress, updateUserAddress } from "../../actions/account";
import { editeAddressAPI } from "../../api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function AddressModal() {
  const user = useSelector((state) => state.account.user);
  const userInfo = useSelector((state) => state.usersSignin.userInfo);
  console.log("userInfo", userInfo);
  const modal = useSelector((state) => state.addressModal);
  const { addressId, isOpen } = modal;

  const [currentPage, setCurrentPage] = useState("addresses");
  const [addressToEdite, setAddressToEdite] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      province: "",
      city: "",
      street: "",
      postalCode: "",
    },
  });

  const province = watch(
    "province",
    currentPage == "editeAddress" ? addressToEdite?.province : null
  );
  const city = watch(
    "city",
    currentPage == "editeAddress" ? addressToEdite?.city : null
  );
  const street = watch(
    "street",
    currentPage == "editeAddress" ? addressToEdite?.street : null
  );
  const postalCode = watch(
    "postalCode",
    currentPage == "editeAddress" ? addressToEdite?.postalCode : null
  );

  const addOnSubmit = (e) => {
    // e.preventDefault();

    const address = {
      province: province,
      city: city,
      street: street,
      postalCode: postalCode,
    };

    dispatch(updateUserAddress(address));
    handleCloseModal();
  };

  const editeOnSubmit = (addressId) => {
    const newAddress = {
      province: province,
      city: city,
      street: street,
      postalCode: postalCode,
    };

    dispatch(editeAddress(addressId, newAddress));
    handleCloseModal();
  };

  useEffect(() => {
    console.log("addressToEdite", province);
    console.log("eeed");
  }, [addressToEdite]);

  useEffect(() => {
    console.log("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    console.log("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.province = addressToEdite?.province;
    defaultValues.city = addressToEdite?.city;
    defaultValues.street = addressToEdite?.street;
    defaultValues.postalCode = addressToEdite?.postalCode;

    reset({ ...defaultValues });
  }, [addressToEdite, addressId]);

  const goToNewAddress = () => {
    setCurrentPage("newAddress");
  };

  const goToEditeAddress = (addressId) => {
    setCurrentPage("editeAddress");
    const selectedObjArr = user?.address?.filter((obj) => obj._id == addressId);
    console.log("selectedObjArr", selectedObjArr);
    setAddressToEdite(selectedObjArr[0]);
  };

  useEffect(() => {
    console.log("addressId", addressId);
    if (addressId) {
      if (addressId == "new") {
        goToNewAddress();
      } else {
        goToEditeAddress(addressId);
      }
    }
    console.log("addressto", addressToEdite);
    console.log("parav", province);
  }, [addressId]);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    console.log("close");
    dispatch(hideAddressModal());
    setCurrentPage("addresses");
    setAddressToEdite({});
    let defaultValues = {};
    defaultValues.province = "";
    defaultValues.city = "";
    defaultValues.street = "";
    defaultValues.postalCode = "";

    reset({ ...defaultValues });
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute z-50 justify-center items-center w-full h-full bg-gray-500/50`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="py-6 w-[100vw] h-[100vh] md:w-[80%]  p-4 bg-white  shadow md:h-[500px] border border-gray-900 dark:border-gray-700 md:rounded-lg ring-1 ring-black ring-opacity-5"
      >
        {currentPage == "addresses" && (
          <div className="h-[70px] items-center flex justify-between">
            <button
              className="bg-black rounded-md h-[50px] p-2 text-white mt-1"
              onClick={() => goToNewAddress()}
            >
              add new address <AddIcon />
            </button>
            <button onClick={handleCloseModal}>
              <CloseIcon />
            </button>
          </div>
        )}

        {currentPage == "addresses" ? (
          <div className="overflow-y-auto h-[75vh] md:h-[400px]">
            {user?.address?.length > 0 && (
              <div className="p-2">
                {user?.address?.map((address) => {
                  return (
                    <div className="p-4 mb-4 bg-white border-gray-200 border-b-2">
                      {" "}
                      <p className="break-words">
                        {address.province}/{address.city}/{address.street} /{" "}
                        {address.postalCode}{" "}
                      </p>
                      <button
                        className="bg-black rounded-md p-2 text-white mt-1 "
                        onClick={() => goToEditeAddress(address?._id)}
                      >
                        edite address <EditIcon fontSize="inherit" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : currentPage == "newAddress" ? (
          <div>
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <form onSubmit={handleSubmit(addOnSubmit)}>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    Province
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("province", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.province && (
                      <p className="text-red-600">province can't be empty</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    City
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("city", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.city && (
                      <p className="text-red-600">city can't be empty</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    Street
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("street", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.street && (
                      <p className="text-red-600">street can't be empty</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    Postal code
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("postalCode", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      //placeholder="Product Title/Name"
                      //label="Product Name"
                      name="postalCode"
                    />
                    {errors.postalCode && (
                      <p className="text-red-600">postalCode can't be empty</p>
                    )}
                  </div>
                </div>

                <button
                  className="bg-black text-white p-2 w-fit h-14 rounded "
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        ) : currentPage == "editeAddress" ? (
          <div>
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              <form
                onSubmit={() => handleSubmit(editeOnSubmit(addressToEdite._id))}
              >
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    Province
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("province", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.province && (
                      <p className="text-red-600">province can't be empty</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    City
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("city", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.city && (
                      <p className="text-red-600">city can't be empty</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    Street
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("street", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.street && (
                      <p className="text-red-600">street can't be empty</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
                    Postal code
                  </label>
                  <div className="col-span-8 sm:col-span-4">
                    <input
                      {...register("postalCode", { required: true })}
                      className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Product Title/Name"
                      label="Product Name"
                    />
                    {errors.postalCode && (
                      <p className="text-red-600">postalCode can't be empty</p>
                    )}
                  </div>
                </div>

                <button
                  className="bg-black text-white p-2 w-fit h-14 rounded "
                  type="submit"
                >
                  Edite
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AddressModal;
