const { Express } = require("express");
const mongoose = require("mongoose");
const productModel = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    const image = "http://localhost:5000/uploads/" + req.files[0].filename;

    console.log(image);

    const newProduct = new productModel({ title, price, category, image });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const deletProduct = async (req, res) => {
  const id = req.params.id;
  try {
    deletedProduct = await productModel.findByIdAndDelete(id);
    console.log(JSON.stringify("deleted:" + deletedProduct));
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const name = req.params.name;

    const productDoc = await productModel.find(
      { title: { $regex: new RegExp(name), $options: "is" } },
      { title: 1, slug: 1, image: 1, price: 1, _id: 0 }
    );

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    res.status(200).json({
      products: productDoc,
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
};
