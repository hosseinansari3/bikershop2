const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/Categories");

const router = express.Router();

router.post("/add", addCategory);
router.get("/", getCategories);
router.delete(`/:id`, deleteCategory);

module.exports = router;
