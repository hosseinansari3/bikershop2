import React, { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ isOpen, items, setModalOpen }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <div
      onClick={(e) => setModalOpen(false)}
      className={`${
        showModal ? "flex" : "hidden"
      } absolute  justify-center items-center w-full h-full bg-gray-500/50`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="p-9 bg-white w-3/4 shadow h-80 overflow-hidden border border-gray-900 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8"
      >
        <div className=" h-56 border-2 rounded overflow-y-auto">
          <table className="w-full whitespace-no-wrap overflow-auto">
            <thead className="sticky top-0 z-10 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <th className="py-3">PRODUCT</th>
                <th className="py-3">SIZE</th>
                <th className="py-3">PRICE</th>
                <th className="py-3">QUANTITY</th>
                <th className="py-3">TOTAL</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              {items ? (
                items.map((item) => {
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
                          <div className="w-[330] text-ellipsis whitespace-nowrap overflow-hidden">
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
        <div className="flex justify-center mt-5">
          <input
            type="radio"
            id="Pending"
            name="fav_language"
            value="Pending"
          />

          <label for="Pending">
            <span>Pending</span>
          </label>

          <input
            type="radio"
            id="Processing"
            name="fav_language"
            value="Processing"
          />
          <label for="Processing">
            <span>Processing</span>
          </label>

          <input
            type="radio"
            id="Shipped"
            name="fav_language"
            value="Shipped"
          />
          <label for="Shipped">
            <span>Shipped</span>
          </label>
          <input
            type="radio"
            id="Delivered"
            name="fav_language"
            value="Delivered"
          />
          <label for="Delivered">
            <span>Delivered</span>
          </label>
          <input
            type="radio"
            id="Cancelled"
            name="fav_language"
            value="Cancelled"
          />
          <label for="Cancelled">
            <span>Cancelled</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Modal;
