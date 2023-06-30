const express = require("express");
const {
  addReview,
  getProductReviews,
  fetchAllReviews,
  fetchMyReviews,
} = require("../controllers/reviews");

const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/myReviews", protectRoute, fetchMyReviews);

router.get("/:slug", getProductReviews);
router.get("/", fetchAllReviews);

router.post("/add", protectRoute, addReview);

module.exports = router;
