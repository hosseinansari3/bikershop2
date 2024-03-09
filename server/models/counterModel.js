const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    seq: {
      type: Number,
    },
  },
  { collection: "counter" }
);

module.exports = mongoose.model("counter", counterSchema);
