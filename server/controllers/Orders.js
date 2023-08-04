const Order = require("../models/orderModel");
const mongoose = require("mongoose");

// @desc Create new order
// @route POST /api/orders
// @access Private

const addorderitems = async (req, res) => {
  if (req.body.orderItems && req.body.orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const user = req.user;
    console.log("user:" + JSON.stringify(user));
    const order = new Order({
      user: user.id,
      orderItems: req.body.orderItems,
    });
    const createdOrder = await order.save();
    console.log("ordered!" + JSON.stringify(req.body.orderItems));

    res.status(201).json(createdOrder);
  }
};
// @desc get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
};
// @desc update order to paid
// @route update /api/orders/:id/pay
// @access Private
const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
};

// @desc update order to delivered
// @route update /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
};
// @desc get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const GetMyOrders = async (req, res) => {
  const user = req.user;
  userObjId = mongoose.Types.ObjectId(user.id);

  const orders = await Order.find({
    user: userObjId,
  }).populate({
    path: "user",
    select: "firstName",
  });
  console.log("myOrders:" + orders);
  res.json(orders);
};

// @desc get orders
// @route GET /api/admin/orders
// @access Private/admin
const GetOrders = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  const orders = await Order.find({})
    .populate({
      path: "user",
      select: "firstName",
    })
    .sort("-created")
    .limit(limit);
  console.log("ALLOrders:" + JSON.stringify(orders));

  res.json(orders);
};

const searchOrder = async (req, res) => {
  try {
    const name = req.params.searchValue;
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    const orders = await Order.find()
      .populate({
        path: "user",
      })
      .exec();

    const resp = orders.filter((order) => order.user.firstName.includes(name));

    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = {
  addorderitems,
  getOrderById,
  updateOrderToPaid,
  GetMyOrders,
  GetOrders,
  updateOrderToDelivered,
  searchOrder,
};
