// controllers/productController.js

const db = require("../config/db");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, category_id } = req.body;

    const [result] = await db.query(
      `INSERT INTO products (name, price, quantity, category_id)
       VALUES (?, ?, ?, ?)`,
      [name, price, quantity, category_id]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, category_id } = req.body;

    const [result] = await db.query(
      `UPDATE products
       SET name = ?, price = ?, quantity = ?, category_id = ?
       WHERE id = ?`,
      [name, price, quantity, category_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};