const express = require("express");
const { fetchWishlist, updateWishlist } = require("../controllers/Wishlist");
const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", protectRoute, updateWishlist);
router.get("/", protectRoute, fetchWishlist);

module.exports = router;
