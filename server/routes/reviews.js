const express = require("express");
const {
  addReview,
  getProductReviews,
  fetchAllReviews,
  fetchMyReviews,
  updateReview,
} = require("../controllers/Reviews");

const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/myReviews/", protectRoute, fetchMyReviews);

router.get("/:slug", getProductReviews);
router.get("/", fetchAllReviews);
router.put(`/:id`, updateReview);

router.post("/add", protectRoute, addReview);

module.exports = router;
