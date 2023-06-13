const express = require("express");
const {
  addReview,
  getProductReviews,
  fetchAllReviews,
} = require("../controllers/reviews");

const router = express.Router();

router.get("/:slug", getProductReviews);
router.get("/", fetchAllReviews);
router.post("/add", addReview);

module.exports = router;
