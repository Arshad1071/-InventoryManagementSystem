// config/db.js

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Fcb@2k18",
  database: "inventory_db",
});

// PORT=5000

// DB_HOST=
// DB_USER=root
// DB_PASSWORD=
// DB_NAME=i



connection.connect((err) => {
  if (err) {
    console.log(process.env.DB_NAME);
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }

  console.log("✅ MySQL Connected Successfully");
});

module.exports = connection;
