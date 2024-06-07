const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

const addCategory = async (req, res) => {
  const catName = req.body.name;
  const category = new Category({ name: catName });
  const createdCategory = await category.save();

  res.status(201).json(createdCategory);
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const deleteCategory = async (req, res) => {
  const ids = req.params.id;
  console.log(ids);

  var idsArr = ids.split(",");

  console.log(idsArr);

  try {
    const deletedCategories = await Category.deleteMany({
      _id: { $in: idsArr },
    });
    console.log(JSON.stringify("deleted:" + deletedCategories));
    return res.status(200).json(idsArr);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const searchCategory = async (req, res) => {
  try {
    const name = req.params.name;

    let query = Category.find({
      name: { $regex: new RegExp(name), $options: "is" },
    });

    const result = await query;

    console.log("result", result.length);

    res.status(200).json({
      status: "success",
      count: result.length,

      categories: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = { addCategory, searchCategory, getCategories, deleteCategory };
