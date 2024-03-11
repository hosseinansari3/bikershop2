const mongoose = require("mongoose");
const counterModel = require("./counterModel");
const { ORDER_STATUS } = require("../constants");

const { Schema } = mongoose;

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    status: {
      type: String,
      enum: [
        ORDER_STATUS.Cancelled,
        ORDER_STATUS.Delivered,
        ORDER_STATUS.Pending,
        ORDER_STATUS.Processing,
        ORDER_STATUS.Shipped,
      ],
      default: ORDER_STATUS.Pending,
    },
    orderItems: [
      {
        title: { type: String },
        quantity: { type: Number },
        size: { type: String },
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

const getNextSequence = async (name) => {
  const counter = await counterModel.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

orderSchema.pre("save", async function (next) {
  if (!this.hasOwnProperty("orderId")) {
    this.orderId = await getNextSequence("order_id");
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
