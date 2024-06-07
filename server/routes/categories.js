const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategory,
  searchCategory,
} = require("../controllers/Categories");

const router = express.Router();

router.post("/add", addCategory);
router.get("/", getCategories);
router.get("/search/:name", searchCategory);

router.delete(`/:id`, deleteCategory);

module.exports = router;
