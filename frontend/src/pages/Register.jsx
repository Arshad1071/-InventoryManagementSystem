import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      const response = await registerUser(user);

      alert(response.message);

      navigate("/");
    } catch (error) {
      alert(error.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <FaUserPlus className="register-icon" />

          <h2>Create Account</h2>

          <p>Inventory Management System</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <select name="role" value={user.role} onChange={handleChange}>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button className="register-btn">Register</button>
        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
