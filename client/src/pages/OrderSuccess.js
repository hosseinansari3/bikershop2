import React from "react";
import Success from "../components/Success";

function OrderSuccess() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="h-[200px] bg-gray-50 w-[350px] p-4">
        <div className="flex justify-center">
          <Success />
        </div>
        <div className="flex font-bold justify-center">
          <p>YOUR ORDER SUBMITTED SUCCESSFULLY</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
