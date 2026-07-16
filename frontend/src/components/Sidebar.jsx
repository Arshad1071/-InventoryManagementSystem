import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaListAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>IMS</h2>
        <p>Inventory Management</p>
      </div>

      <nav className="menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaTachometerAlt color="black" />
          <span
            style={{
              color: "#000000",
              marginLeft: "10px",
              marginBottom: "100px",
            }}
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaBoxOpen color="black" />
          <span
            style={{
              color: "#000000",
              marginLeft: "10px",
              marginBottom: "100px",
            }}
          >
            Products
          </span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaListAlt color="black" />
          <span
            style={{
              color: "#000000",
              marginLeft: "10px",
              marginBottom: "100px",
            }}
          >
            Categories
          </span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaUsers color="black" />
          <span
            style={{
              color: "#000000",
              marginLeft: "10px",
              marginBottom: "100px",
            }}
          >
            Users
          </span>
        </NavLink>
      </nav>

      <div className="logout">
        <NavLink to="/" className="menu-item">
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
