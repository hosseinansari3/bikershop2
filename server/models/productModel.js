const mongoose = require("mongoose");
const { Schema } = mongoose;

const slug = require("mongoose-slug-generator");

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};

mongoose.plugin(slug, options);

const ProductSchema = new mongoose.Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  title: {
    type: String,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
  price: {
    type: String,
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
  size: {
    type: String,
  },
});

module.exports = mongoose.model("product", ProductSchema);
