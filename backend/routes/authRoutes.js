// routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Import Controller
const {
  register,
  login,
  profile,
} = require("../controllers/authController");

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Get Logged-in User Profile
router.get("/profile", profile);

module.exports = router;