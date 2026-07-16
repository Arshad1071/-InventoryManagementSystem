import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./Users.css";

const Users = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Arshad",
      email: "arshad@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@gmail.com",
      role: "Staff",
    },
    {
      id: 3,
      name: "Akhil",
      email: "akhil@gmail.com",
      role: "Staff",
    },
    {
      id: 4,
      name: "Sneha",
      email: "sneha@gmail.com",
      role: "Staff",
    },
  ];

  return (
    <div className="users">

      <div className="users-header">

        <h2>User Management</h2>

        <button className="add-user-btn">
          <FaPlus />
          Add User
        </button>

      </div>

      <div className="user-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="users-table">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {users
              .filter((user) =>
                user.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span
                      className={
                        user.role === "Admin"
                          ? "admin-role"
                          : "staff-role"
                      }
                    >
                      {user.role}
                    </span>

                  </td>

                  <td>

                    <button className="edit-btn">
                      <FaEdit />
                    </button>

                    <button className="delete-btn">
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Users;