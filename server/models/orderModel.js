const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
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
