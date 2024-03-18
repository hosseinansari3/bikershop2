import React, { useEffect, useState } from "react";

function CartDrawer({ isOpen, setOpen }) {
  //const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden w-[100vw] h-[100vh] bg-black/75 fixed  z-[90]"
        ></div>
      )}
      <div
        className={`md:hidden bg-white w-[70%] h-[100vh] top-0 fixed z-[100] right-[-70%] ${
          isOpen && "-translate-x-[100%]"
        } transition-transform duration-500`}
      >
        <div className="text-center border-b pb-[2vh]">
          <h3>CART</h3>
        </div>
        <div className="border-b pb-[2vh]">
          <ul className="p-5">
            <li className="flex mb-[2vh]">
              <div className="h-[12vh] w-[12vh] bg-slate-600"></div>
              <div className="ml-3 ">
                <span className="font-bold">my product title 1</span>
                <p className="text-sm">price: 500$</p>
                <p className="text-sm">quantity: 5</p>
              </div>
            </li>
            <li className="flex mb-[2vh]">
              <div className="h-[12vh] w-[12vh] bg-slate-600"></div>
              <div className="ml-3 ">
                <span className="font-bold">my product title 1</span>
                <p className="text-sm">price: 500$</p>
                <p className="text-sm">quantity: 5</p>
              </div>
            </li>{" "}
            <li className="flex mb-[2vh]">
              <div className="h-[12vh] w-[12vh] bg-slate-600"></div>
              <div className="ml-3 ">
                <span className="font-bold">my product title 1</span>
                <p className="text-sm">price: 500$</p>
                <p className="text-sm">quantity: 5</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center mt-[15vh]">
          <button className="w-[60%] mx-auto h-[8vh] mb-3 rounded bg-slate-500">
            view cart
          </button>
          <button className="w-[60%] mx-auto h-[8vh] mb-3 rounded bg-slate-500">
            view cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
