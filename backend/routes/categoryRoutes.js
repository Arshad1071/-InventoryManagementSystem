// routes/categoryRoutes.js

const express = require("express");
const router = express.Router();

// Import Controller
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// GET All Categories
router.get("/", getCategories);

// GET Single Category
router.get("/:id", getCategoryById);

// CREATE Category
router.post("/", createCategory);

// UPDATE Category
router.put("/:id", updateCategory);

// DELETE Category
router.delete("/:id", deleteCategory);

module.exports = router;