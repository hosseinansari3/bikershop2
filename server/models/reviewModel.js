const Mongoose = require("mongoose");

const { REVIEW_STATUS } = require("../constants");

const { Schema } = Mongoose;

// Review Schema
const ReviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
    default: null,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  title: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  review: {
    type: String,
    trim: true,
  },
  isRecommended: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: REVIEW_STATUS.Pending,
    enum: [
      REVIEW_STATUS.Pending,
      REVIEW_STATUS.Rejected,
      REVIEW_STATUS.Approved,
    ],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Review", ReviewSchema);
