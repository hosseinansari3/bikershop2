const express = require("express");
const {
  addorderitems,
  getOrderById,
  updateOrderToPaid,
  GetMyOrders,
  GetOrders,
  updateOrderToDelivered,
} = require("../controllers/Orders");

const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/myOrder/", protectRoute, GetMyOrders);

router.post("/", protectRoute, addorderitems);
router.get("/", GetOrders);
router.get("/:id", getOrderById);

module.exports = router;
