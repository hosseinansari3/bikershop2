const express = require("express");
const {
  getProducts,
  createProduct,
  deletProduct,
  getProductById,
  searchProduct,
  updateProduct,
} = require("../controllers/Products");

const upload = require("../middlewares/uploadFile");

const router = express.Router();

router.post("/", upload, createProduct);
router.get("/list/search/:name", searchProduct);
router.get("/:slug", getProductById);
router.get("/", getProducts);
router.put(`/:id`, upload, updateProduct);
router.delete(`/:id`, deletProduct);

module.exports = router;
