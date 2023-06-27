const mongoose = require("mongoose");
const { ROLES } = require("../constants");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },

  firstName: { type: String },
  lastName: { type: String },

  password: {
    type: String,
  },

  gender: { type: String },

  phoneNumber: {
    type: String,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: ROLES.Member,
    enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant],
  },
});

module.exports = mongoose.model("user", UserSchema);
