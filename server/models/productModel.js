const mongoose = require("mongoose");

const slug = require("mongoose-slug-generator");

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};

mongoose.plugin(slug, options);

const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
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
  image: {
    type: String,
  },
});

module.exports = mongoose.model("product", ProductSchema);
