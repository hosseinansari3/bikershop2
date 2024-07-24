const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const WishlistSchema = new Schema({
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

  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Wishlist", WishlistSchema);
