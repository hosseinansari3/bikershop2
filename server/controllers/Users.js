const User = require("../models/userModel");
const { generateToken, isAuth } = require("../utils/util");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Load input validation

const signIn = async (req, res) => {
  const jwtSecret = "secret";

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
      { expiresIn: 3600 },
      (err, token) => {
        if (err) res.json({ err });
        else {
          res.json({
            token,
            message: "Logged in Succefully",
            user: {
              id: user._id,
              name: user.name,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              gender: user.gender,
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

    //const createdUser = await user.save();

    /* res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
  });
  */
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

module.exports = { register, signIn, verifyToken, fetchUsers };