const express = require("express");
const {
  getProducts,
  createProduct,
  deletProduct,
  getProductById,
  searchProduct,
  updateProduct,
  imageUpload,
  getProductsBySection,
} = require("../controllers/Products");

const upload = require("../middlewares/uploadFile");

const router = express.Router();

router.post("/", upload, createProduct);
router.post("/imageUpload", upload, imageUpload);
router.get("/list/search/:name", searchProduct);
router.get("/:slug", getProductById);
router.get("/sections/:section", getProductsBySection);
router.get("/", getProducts);
router.put(`/:id`, upload, updateProduct);
router.delete(`/:id`, deletProduct);

module.exports = router;
