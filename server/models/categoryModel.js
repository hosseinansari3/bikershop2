const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Category", categorySchema);
