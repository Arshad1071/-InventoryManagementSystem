// routes/productRoutes.js

const express = require("express");
const router = express.Router();

// Import Controller
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET All Products
router.get("/", getProducts);

// GET Single Product
router.get("/:id", getProductById);

// CREATE Product
router.post("/", createProduct);

// UPDATE Product
router.put("/:id", updateProduct);

// DELETE Product
router.delete("/:id", deleteProduct);

module.exports = router;