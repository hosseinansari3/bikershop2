const Order = require("../models/orderModel");
const productModel = require("../models/productModel");

const mongoose = require("mongoose");

// @desc Create new order
// @route POST /api/orders
// @access Private

const addorderitems = async (req, res) => {
  if (req.body.orderItems && req.body.orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const user = req.user;

    const orderItems = req.body.orderItems;

    const total = orderItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    const order = new Order({
      user: user.id,
      orderItems: orderItems,
      total: total,
    });

    const createdOrder = await order.save();

    const updatePromises = [];
    for (const item of req.body.orderItems) {
      try {
        //const updatePromise = await productModel.findOneAndUpdate(
        //{ _id: mongoose.Types.ObjectId(item.product) },
        // { $inc: { quantity: -item.quantity } },
        // { new: true }
        // );

        const updatePromise = productModel
          .findOne({
            _id: mongoose.Types.ObjectId(item.product),
          })
          .then((product) => {
            // Find the index of the specific variant
            const variantIndex = product.variants.findIndex(
              (variant) => variant.size == item.size
            );

            // Check if there's enough stock
            if (product.variants[variantIndex].stock >= item.quantity) {
              // Decrement the stock
              product.variants[variantIndex].stock -= item.quantity;
              return product.save();
            } else {
              throw new Error("Not enough stock");
            }
          })
          .then((updatedProduct) => {
            console.log("Stock updated", updatedProduct);
          })
          .catch((err) => {
            console.error("Error updating stock", err);
          });

        updatePromises.push(updatePromise);
      } catch (error) {
        console.error(
          `Error updating product ${item.product}: ${error.message}`
        );
      }
    }

    await Promise.all(updatePromises);

    res.status(201).json(createdOrder);
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updated = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: updated },
      { new: true }
    );

    res.status(201).json(updatedOrder);
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
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

const getOrdersByFilters = async (req, res) => {
  try {
    const filters = JSON.parse(req.query.filters);

    let query = {};

    if (filters.status) {
      query.status = { $in: filters.status };
    }

    const products = await productModel.find(query);

    res.status(200).json({
      status: "success",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};

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
  let limit = req.query.limit ? parseInt(req.query.limit) : 0;

  const filters = req.query.filters;
  const sort = req.query.sort;

  let query = {};

  if (filters?.status && filters?.status != "") {
    query.status = { $in: filters.status };
  }

  const orders = await Order.find(query)
    .populate({
      path: "user",
      select: "firstName",
    })
    .sort(sort)
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
  updateOrder,
  getOrderById,
  updateOrderToPaid,
  GetMyOrders,
  GetOrders,
  updateOrderToDelivered,
  searchOrder,
};
