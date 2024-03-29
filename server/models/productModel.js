const mongoose = require("mongoose");
const { Schema } = mongoose;

const slug = require("mongoose-slug-updater");
const { ROLES, SECTIONS } = require("../constants");

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};

mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema({
  category: {
    slug: false,
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
  price: {
    type: Number,
  },
  images: [
    {
      type: String,
    },
  ],
  suspention: {
    type: String,
  },
  material: {
    type: String,
  },
  brand: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  variants: [
    {
      size: { type: String },
      stock: { type: Number },
    },
  ],

  size: {
    type: String,
  },
  section: {
    type: String,
    enum: [
      SECTIONS.Best_Seller,
      SECTIONS.Hot_Discount,
      SECTIONS.New_Arrival,
      SECTIONS.Our_Offer,
    ],
  },
});

module.exports = mongoose.model("product", ProductSchema);
