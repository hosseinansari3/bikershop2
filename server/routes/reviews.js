const express = require("express");
const {
  addReview,
  getProductReviews,
  fetchAllReviews,
} = require("../controllers/reviews");

const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:slug", getProductReviews);
router.get("/", fetchAllReviews);
router.post("/add", protectRoute, addReview);

module.exports = router;
