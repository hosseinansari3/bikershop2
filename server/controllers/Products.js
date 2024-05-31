const { Express } = require("express");
const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

const getProducts = async (req, res) => {
  try {
    let query = productModel.find().populate({
      path: "category",
    });
    let page = req.query.page;

    if (page) {
      page = parseInt(req.query.page) || 1;
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
    }
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

const imageUpload = async (req, res) => {
  try {
    const url = "http://localhost:5000/uploads/" + req.files[0].filename;

    res.status(201).json({ imageUrl: url });
  } catch (error) {
    console.log(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const category = req.body.category;
    const variants = JSON.parse(req.body.variants);
    const suspention = req.body.suspention;
    const section = req.body.section;
    const content = req.body.content;
    const material = req.body.material;
    const brand = req.body.brand;
    const size = req.body.size;
    const quantity = req.body.quantity;
    const images = [];

    for (let i = 0; i < req.files.length; i++) {
      images.push("http://localhost:5000/uploads/" + req.files[i].filename);
    }

    console.log("body", req.body);

    const newProduct = new productModel({
      title,
      price,
      content,
      category,
      images,
      section,
      suspention,
      variants,
      quantity,
      material,
      brand,
      size,
    });

    const savedProduct = await newProduct.save();
    console.log("product created!");
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
      { title: 1, slug: 1, images: 1, price: 1, _id: 1 }
    );

    const result = await query;

    console.log("result", result.length);

    res.status(200).json({
      status: "success",
      count: result.length,

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

const getProductsByFilters = async (req, res) => {
  try {
    const filters = JSON.parse(req.query.filters);
    const orders = JSON.parse(req.query.orders);
    let page = req.query.page;

    let query = {};
    let match = {};

    if (filters.priceMin || filters.priceMax) {
      query.price = { $gte: filters.priceMin, $lte: filters.priceMax };
    }
    if (filters.suspentions) {
      query.suspention = { $in: filters.suspentions };
    }

    if (filters.section) {
      query.section = filters.section;
    }

    if (filters.materials) {
      query.material = { $in: filters.materials };
    }

    if (filters.brands) {
      query.brand = { $in: filters.brands };
    }

    if (filters.sizes) {
      query.size = { $in: filters.sizes };
    }

    if (filters.categories && filters.categories[0] != "All") {
      console.log("categories", filters.categories);
      console.log("filters", filters);
      match = { "category.name": { $in: filters.categories } };
    } else match = {};

    let pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: categoryModel.collection.collectionName, // Replace with the actual name of your reservations collection
          localField: "category", // Replace with the field that connects reservations to listings
          foreignField: "_id", // Replace with the field that connects reservations to listings
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $match: match,
      },
    ];

    for (let key in orders) {
      if (!isNaN(orders[key]) && typeof orders[key] === "string") {
        orders[key] = parseInt(orders[key], 10);
      }
    }

    if (Object.keys(orders).length > 0) {
      pipeline.unshift({ $sort: orders });
    }

    const products = await productModel.aggregate(pipeline);

    if (page) {
      console.log("page", page);

      page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 6;
      const skip = (page - 1) * pageSize;

      const total = (await productModel.aggregate(pipeline)).length;
      const pages = Math.ceil(total / pageSize);
      console.log("total", total);

      pipeline.push({ $skip: skip });

      pipeline.push({ $limit: pageSize });

      console.log("pipe", pipeline);

      const products = await productModel.aggregate(pipeline);

      if (page > pages) {
        console.log("NOpage");

        return res.status(404).json({
          status: "fail",
          message: "No page found",
        });
      }

      res.status(200).json({
        status: "success",
        count: products.length,
        page,
        pages,
        pageSize,
        totalProducts: total,
        products: products,
      });
    } else {
      res.status(200).json({
        status: "success",
        products: products,
      });
    }

    //  const products = await productModel.find(query).populate({
    //   path: "category",
    //   match: match,
    // });
  } catch (error) {
    console.log(error);
  }
};
const getProductsBySection = async (req, res) => {
  try {
    const section = req.params.section;
    console.log(section);
    const products = await productModel.find(
      { section: section },
      { title: 1, slug: 1, images: 1, price: 1, _id: 1, rating: 1 }
    );
    res.status(200).json({
      status: "success",

      products: products,
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
    formData.variants = JSON.parse(req.body.variants);

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
  imageUpload,
  getProductById,
  getProductsBySection,
  createProduct,
  deletProduct,
  getProductsByFilters,
  searchProduct,
  updateProduct,
};
