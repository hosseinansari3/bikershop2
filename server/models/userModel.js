const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  firstName: { type: String },
  lastName: { type: String },

  password: {
    type: String,
  },

  gender: { type: String },
  nationality: { type: String },
  birthDate: { type: String },
  creationDate: { type: Date, default: Date.now },
  isAdmin: { type: Boolean },
  isSeller: { type: Boolean },
  isCustomer: { type: Boolean },
  isShipper: { type: Boolean },
  isRestricted: { type: Boolean },
});

module.exports = mongoose.model("user", UserSchema);
