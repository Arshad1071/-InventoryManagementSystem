import React from "react";
import "./Navbar.css";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";


const Navbar = () => {
  return (
    <div className="navbar">

      <div className="navbar-left">

        <h2>Inventory Management System</h2>

      </div>

      {/* <div className="navbar-center">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Products..."
          />

        </div>

      </div> */}

      <div className="navbar-right">

        <div className="notification">

          <FaBell />

          <span className="badge">3</span>

        </div>

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div>

            <h4>Admin</h4>

            <p>Administrator</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;