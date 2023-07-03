require("dotenv").config();
const express = require("express");
const mogoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const cookieSession = require("cookie-session");
const ordersRouter = require("./routes/orders");
const wishlistRouter = require("./routes/wishlist");
const reviewRouter = require("./routes/reviews");

const { setupPassport } = require("./config/passport");

const path = require("path");

const path1 = path.join("__dirname", "../client/public/images");

const dbUri = process.env.REACT_APP_DB_URI;

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/wishlist", wishlistRouter);
app.use("/review", reviewRouter);

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

setupPassport();

mogoose
  .connect(dbUri, { useNewUrlParser: true })
  .then(() => console.log("database connected successfully!"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
  console.log(path1);
});
