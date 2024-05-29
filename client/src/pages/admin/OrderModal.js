import React, { useEffect, useState } from "react";
import "./OrderModal.css";
import { ORDER_STATUS, ROLES } from "../../constants/panelConstants";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/orders";
import { hideOrderModal } from "../../actions/orderModal";

function OrderModal() {
  const modal = useSelector((state) => state.orderModal);
  const user = useSelector((state) => state.usersSignin.userInfo.user);

  const { isOpen, order } = modal;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(modal.order?.status);

  const handleCloseModal = () => {
    dispatch(hideOrderModal());
  };

  useEffect(() => {
    setStatus(order?.status);
  }, [modal]);

  useEffect(() => {
    console.log("modal", modal);
  }, [modal]);

  // useEffect(() => {
  // setShowModal(isOpen);
  //  }, []);

  const saveHandler = () => {
    dispatch(updateOrder(order._id, { ...order, status: status }));
    handleCloseModal();
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute z-50 justify-center items-center w-full h-full bg-gray-500/50`}
    >
      {console.log("RREEEEENDER")}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="p-9 bg-white w-3/5 shadow h-[400px] overflow-hidden border border-gray-900 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8"
      >
        <div className=" h-56 border-2 rounded overflow-y-auto">
          <table className="w-full whitespace-no-wrap overflow-auto text-center">
            <thead className="sticky text-center top-0 z-10 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <th className="py-3">PRODUCT</th>
                <th className="py-3">SIZE</th>
                <th className="py-3">PRICE</th>
                <th className="py-3">QUANTITY</th>
                <th className="py-3">TOTAL</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              {order ? (
                order?.orderItems?.map((item) => {
                  let itemPrice = parseFloat(item.price);
                  let itemTotal = itemPrice * parseFloat(item.quantity);
                  return (
                    <tr>
                      <td className="w-52">
                        <div className="flex items-center text-sm">
                          <img
                            className="inline product-img"
                            src={item.image}
                          />
                          <div className="w-[400px] text-ellipsis whitespace-nowrap overflow-hidden">
                            {item.title}
                          </div>
                        </div>
                      </td>
                      <td>{item.size}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{itemTotal}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <span>no item</span>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {user.role === ROLES.Admin && (
          <div>
            <div id="status" className="flex justify-center mt-7">
              <input
                checked={status == "Pending"}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                id="Pending"
                name="fav_language"
                value={ORDER_STATUS.Pending}
              />

              <label for="Pending">
                <span>Pending</span>
              </label>

              <input
                checked={status == "Processing"}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                id="Processing"
                name="fav_language"
                value={ORDER_STATUS.Processing}
              />
              <label for="Processing">
                <span>Processing {status}</span>
              </label>

              <input
                checked={status == "Shipped"}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                id="Shipped"
                name="fav_language"
                value={ORDER_STATUS.Shipped}
              />
              <label for="Shipped">
                <span>Shipped</span>
              </label>
              <input
                checked={status == "Delivered"}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                id="Delivered"
                name="fav_language"
                value={ORDER_STATUS.Delivered}
              />
              <label for="Delivered">
                <span>Delivered</span>
              </label>
              <input
                checked={status == "Cancelled"}
                onChange={(e) => setStatus(e.target.value)}
                type="radio"
                id="Cancelled"
                name="fav_language"
                value="Cancelled"
              />
              <label for="Cancelled">
                <span>Cancelled </span>
              </label>
            </div>
            <div className="flex justify-center mt-5">
              <button onClick={saveHandler} className="border-2 rounded-lg p-2">
                save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderModal;
