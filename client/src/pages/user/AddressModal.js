import React, { useEffect, useState } from "react";
import { ORDER_STATUS } from "../../constants/panelConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/orders";
import { hideOrderModal } from "../../actions/orderModal";
import { hideAddressModal } from "../../actions/addressModal";
import { useForm } from "react-hook-form";
import { editeAddress, updateUserAddress } from "../../actions/account";
import { editeAddressAPI } from "../../api";

function AddressModal() {
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
    currentPage == "editeAddress" ? addressToEdite.province : null
  );
  const city = watch(
    "city",
    currentPage == "editeAddress" ? addressToEdite.city : null
  );
  const street = watch(
    "street",
    currentPage == "editeAddress" ? addressToEdite.street : null
  );
  const postalCode = watch(
    "postalCode",
    currentPage == "editeAddress" ? addressToEdite.postalCode : null
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
    console.log("addressToEdite", addressToEdite);
  }, [addressToEdite]);

  useEffect(() => {
    console.log("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.province = addressToEdite.province;
    defaultValues.city = addressToEdite.city;
    defaultValues.street = addressToEdite.street;
    defaultValues.postalCode = addressToEdite.postalCode;

    reset({ ...defaultValues });
  }, [addressToEdite]);

  const goToNewAddress = () => {
    setCurrentPage("newAddress");
  };

  const goToEditeAddress = (addressId) => {
    setCurrentPage("editeAddress");
    const selectedObjArr = user?.address?.filter((obj) => obj._id == addressId);
    console.log("selectedObjArr", selectedObjArr);
    setAddressToEdite(selectedObjArr[0]);
  };

  const user = useSelector((state) => state.account.user);
  const userInfo = useSelector((state) => state.usersSignin.userInfo);
  console.log("userInfo", userInfo);
  const modal = useSelector((state) => state.addressModal);
  const { isOpen } = modal;
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(hideAddressModal());
    setCurrentPage("addresses");
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
        className="p-9 bg-white w-3/5 shadow h-[500px] overflow-hidden border border-gray-900 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8"
      >
        {currentPage == "addresses" ? (
          <div>
            <button onClick={() => goToNewAddress()}>add new address</button>
            {user?.address?.length > 0 && (
              <div className="p-6 bg-gray-200">
                {user?.address?.map((address) => {
                  return (
                    <div className="p-4 mb-4 bg-white">
                      {address.province}/{address.city}/{address.street} /{" "}
                      {address.postalCode}{" "}
                      <button onClick={() => goToEditeAddress(address?._id)}>
                        edite address
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
                  Submit Order
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
                  Submit Order
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
