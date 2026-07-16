const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // Check if email already exists
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    await db.query(
      `INSERT INTO users(name,email,password,role)
       VALUES(?,?,?,?)`,
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ================= LOGIN =================

// exports.login = async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     const [rows] = await db.query(
//       "SELECT * FROM users WHERE email=?",
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({
//         message: "Invalid Email or Password",
//       });
//     }

//     const user = rows[0];

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid Email or Password",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     res.json({
//       message: "Login Successful",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Server Error",
//     });

//   }

// };