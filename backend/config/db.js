// config/db.js

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Fcb@2k18",
  database: process.env.DB_NAME || "inventory_db",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

connection.on("error", (err) => {
  console.error("❌ MySQL Connection error event:", err.message);
});

module.exports = connection.promise();
