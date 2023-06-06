const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: String,
    },
    orderItems: [
      {
        title: { type: String },
        quantity: { type: Number },
        image: { type: String },
        price: { type: String },
        product: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
