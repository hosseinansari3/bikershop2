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
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

module.exports = { getProducts, getProductById, createProduct, deletProduct };
