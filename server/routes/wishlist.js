const express = require("express");
const { fetchWishlist, updateWishlist } = require("../controllers/Wishlist");

const router = express.Router();
router.post("/", updateWishlist);
router.get("/:user", fetchWishlist);

module.exports = router;
