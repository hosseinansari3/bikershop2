const express = require("express");
const {
  addorderitems,
  getOrderById,
  updateOrderToPaid,
  GetMyOrders,
  GetOrders,
  updateOrderToDelivered,
} = require("../controllers/Orders");

const router = express.Router();

router.post("/", addorderitems);
router.get("/", GetOrders);
router.get("/:id", getOrderById);
