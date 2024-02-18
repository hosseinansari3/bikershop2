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
  getProductsByFilter,
  getProductsByFilters,
} = require("../controllers/Products");

const upload = require("../middlewares/uploadFile");

const router = express.Router();

router.post("/imageUpload", upload, imageUpload);
router.get("/list/search/:name", searchProduct);
router.get("/sections/:section", getProductsBySection);
router.get("/getByFilters", getProductsByFilters);
router.post("/", upload, createProduct);
router.get("/:slug", getProductById);
router.get("/", getProducts);
router.put(`/:id`, upload, updateProduct);
router.delete(`/:id`, deletProduct);

module.exports = router;
