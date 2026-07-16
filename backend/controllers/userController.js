const db = require("../config/db");
const bcrypt = require("bcrypt");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, role FROM users");
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

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email already exists
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Encrypt Password
    const hashedPassword = await bcrypt.hash(password || "123456", 10);

    // Save User
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role || "Staff"]
    );

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      userId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    let result;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      [result] = await db.query(
        `UPDATE users
         SET name = ?, email = ?, password = ?, role = ?
         WHERE id = ?`,
        [name, email, hashedPassword, role, id]
      );
    } else {
      [result] = await db.query(
        `UPDATE users
         SET name = ?, email = ?, role = ?
         WHERE id = ?`,
        [name, email, role, id]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
