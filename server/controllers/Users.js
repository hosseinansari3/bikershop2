const User = require("../models/userModel");
const { generateToken, isAuth } = require("../utils/util");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Load input validation

const signIn = async (req, res) => {
  const jwtSecret = process.env.jwt_sec;

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  //check if there is user with given email

  if (!user) {
    res.status(400).json({ error: "No user found for this email address" });
  } else {
    comparePassword(user);
  }
  // compare the encrypted password with one the user provided
  function comparePassword(user) {
    bcrypt.compare(password, user.password).then((isMatch) => {
      // if the password doesn't match, return a message
      if (!isMatch) {
        return res.status(400).json({
          error: "Invalid password",
        });
        // if it matches generate a new token and send everything is json
      } else {
        generateNewToken(user);
      }
    });
  }

  // generate new token with the new data
  function generateNewToken(user) {
    jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        isCustomer: user.isCustomer,
        isShipper: user.isShipper,
        isRestricted: user.isRestricted,
      },
      jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) res.json({ err });
        else {
          res.json({
            token,
            message: "Logged in Succefully",
            user: {
              name: user.name,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              gender: user.gender,
              avatar: user.avatar,
              role: user.role,
              nationality: user.nationality,
              birthDate: user.birthDate,
              creationDate: user.creationDate,
              isAdmin: user.isAdmin,
              isSeller: user.isSeller,
              isCustomer: user.isCustomer,
              isShipper: user.isShipper,
              isRestricted: user.isRestricted,
            },
          });
        }
      }
    );
  }
};

const register = async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(400).json({ error: "Email already exists" });
  } else {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            res.json(user);
            console.log("created");
          })
          .catch((err) => console.log(err));
      });
    });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied.");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

const fetchUsers = async (req, res) => {
  try {
    let query = User.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      pageSize,
      totalUsers: total,
      users: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  const ids = req.params.id;
  var idsArr = ids.split(",");

  try {
    deletedUser = await User.deleteMany({ _id: { $in: idsArr } });
    res.status(200).json(idsArr);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user.id;
    const image = "http://localhost:5000/uploads/" + req.files[0].filename;
    const update = { ...req.body, avatar: image };
    console.log("inaaaa:" + JSON.stringify(update));
    const query = { _id: user };
    const userDoc = await User.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Your profile is successfully updated!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const updateUserAdress = async (req, res) => {
  try {
    const user = req.user.id;
    const newAdress = req.body;
    console.log("nweAddress", newAdress);
    const query = { _id: user };

    await User.updateMany(
      { _id: user },
      { $set: { "address.$[].default": false } }
    );

    const userDoc = await User.findOneAndUpdate(
      query,
      {
        $push: { address: { ...newAdress, default: true } },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "new address successfully added!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const editeAddress = async (req, res) => {
  try {
    const user = req.user.id;
    const addressId = req.query.addressId;
    const newAddress = req.body;
    console.log("addressId", addressId);
    console.log("newAddres", newAddress);

    await User.updateMany(
      {
        _id: user,
      },
      { $set: { "address.$[elem].default": false } },
      {
        arrayFilters: [
          { "elem._id": { $ne: new mongoose.Types.ObjectId(addressId) } },
        ],
      }
    );

    const userDoc = await User.findOneAndUpdate(
      { _id: user, "address._id": new mongoose.Types.ObjectId(addressId) },
      {
        $set: {
          "address.$.street": newAddress.street,
          "address.$.province": newAddress.province,
          "address.$.city": newAddress.city,
          "address.$.postalCode": newAddress.postalCode,
          "address.$.default": true,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "new address successfully added!",
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user.id;
    const userDoc = await User.findById(user, { password: 0 });

    res.status(200).json({
      user: userDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const name = req.params.name;

    let query = User.find(
      {
        $or: [
          { email: { $regex: new RegExp(name), $options: "is" } },
          { firstName: { $regex: new RegExp(name), $options: "is" } },
        ],
      },
      { email: 1, firstName: 1, avatar: 1, _id: 1, role: 1 }
    );

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = (await query).length;

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query.clone();

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      pageSize,
      totalUsers: total,
      users: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = {
  searchUser,
  register,
  signIn,
  verifyToken,
  fetchUsers,
  deleteUser,
  editeAddress,
  updateUser,
  updateUserAdress,
  getCurrentUser,
};
