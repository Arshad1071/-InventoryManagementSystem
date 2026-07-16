// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Inventory Management API is Running...");
});

// Import Routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");

// Routes
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/auth", authRoutes);

// Handle 404
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route Not Found",
//   });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// Start Server
const PORT = process.env.PORT || 5000;
// console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
