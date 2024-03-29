const express = require("express");
const {
  addorderitems,
  getOrderById,
  updateOrderToPaid,
  GetMyOrders,
  GetOrders,
  updateOrderToDelivered,
  searchOrder,
  updateOrder,
} = require("../controllers/Orders");

const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/myOrder/", protectRoute, GetMyOrders);

router.post("/", protectRoute, addorderitems);
router.get("/list/search/:searchValue", searchOrder);

router.get("/", GetOrders);
router.get("/:id", getOrderById);
router.put(`/:id`, updateOrder);

module.exports = router;
