const express = require("express");
const {
  getProducts,
  createProduct,
  deletProduct,
  getProductById,
  searchProduct,
} = require("../controllers/Products");

const upload = require("../middlewares/uploadFile");

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductById);
router.get("/list/search/:name", searchProduct);
router.post("/", upload, createProduct);
router.delete(`/:id`, deletProduct);

module.exports = router;
