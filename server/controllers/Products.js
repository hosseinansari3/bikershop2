const { Express } = require("express");
const mongoose = require("mongoose");
const productModel = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    let query = productModel.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * pageSize;
    const total = await productModel.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      pageSize,
      totalProducts: total,
      products: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  const slug = req.params.slug;
  const product = await productModel.findOne({ slug });
  //check condition
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

const createProduct = async (req, res) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const category = req.body.category;
    const suspention = req.body.suspention;
    const material = req.body.material;
    const brand = req.body.brand;
    const size = req.body.size;

    const images = [];

    for (let i = 0; i < req.files.length; i++) {
      images.push("http://localhost:5000/uploads/" + req.files[i].filename);
    }

    console.log(images);

    const newProduct = new productModel({
      title,
      price,
      category,
      images,
      suspention,
      material,
      brand,
      size,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const deletProduct = async (req, res) => {
  const ids = req.params.id;
  console.log(ids);

  var idsArr = ids.split(",");

  console.log(idsArr);

  try {
    const deletedProduct = await productModel.deleteMany({
      _id: { $in: idsArr },
    });
    console.log(JSON.stringify("deleted:" + deletedProduct));
    return res.status(200).json(idsArr);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const name = req.params.name;

    let query = productModel.find(
      { title: { $regex: new RegExp(name), $options: "is" } },
      { title: 1, slug: 1, image: 1, price: 1, _id: 1 }
    );

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * pageSize;
    const total = (await query).length;

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query.clone();

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      pageSize,
      totalProducts: total,
      products: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const formData = req.body;
    let images = [];
    let updated = {};

    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        images.push("http://localhost:5000/uploads/" + req.files[i].filename);
      }
      updated = { ...formData, images };
    } else {
      updated = formData;
    }

    console.log("UPdated", updated);

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      { $set: updated }
    );

    console.log("updated");

    res.status(200).json({
      success: true,
      message: "product updated!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deletProduct,
  searchProduct,
  updateProduct,
};
