const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const addressSchema = new Schema(
  {
    street: { type: String },
    province: { type: String },
    city: { type: String },
    postalCode: { type: String },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Address", addressSchema);
