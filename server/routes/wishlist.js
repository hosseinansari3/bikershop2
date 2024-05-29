const express = require("express");
const {
  fetchWishlist,
  updateWishlist,
  deleteWishlist,
} = require("../controllers/Wishlist");
const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", protectRoute, updateWishlist);
router.get("/", protectRoute, fetchWishlist);
router.delete(`/:id`, deleteWishlist);

module.exports = router;
