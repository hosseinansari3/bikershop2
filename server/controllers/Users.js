const User = require("../models/userModel");
const { generateToken, isAuth } = require("../utils/util");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Load input validation

const signIn = async (req, res) => {
  const jwtSecret = process.env.jwt_sec;

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  //check if there is user with given email

  if (!user) {
    res.status(400).json({ message: "Invalid username" });
  } else {
    comparePassword(user);
  }
  // compare the encrypted password with one the user provided
  function comparePassword(user) {
    bcrypt.compare(password, user.password).then((isMatch) => {
      // if the password doesn't match, return a message
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password",
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
      { expiresIn: "24h" },
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
    return res.status(400).json({ email: "Email already exists" });
  } else {
    const newUser = new User({
      name: req.body.name,
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
    const users = await User.find();
    res.status(200).json(users);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user.id;
    const image =
      "http://bikershop.ap-1.evennode.com/uploads/" + req.files[0].filename;

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

module.exports = {
  register,
  signIn,
  verifyToken,
  fetchUsers,
  deleteUser,
  updateUser,
  getCurrentUser,
};
