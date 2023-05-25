const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("product", ProductSchema);
