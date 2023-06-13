require("dotenv").config();
const express = require("express");
const mogoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const wishlistRouter = require("./routes/wishlist");
const reviewRouter = require("./routes/reviews");

const path = require("path");

const path1 = path.join("__dirname", "../client/public/images");

const dbUri = process.env.REACT_APP_DB_URI;

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/wishlist", wishlistRouter);
app.use("/review", reviewRouter);

mogoose
  .connect(dbUri, { useNewUrlParser: true })
  .then(() => console.log("database connected successfully!"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
  console.log(path1);
});
