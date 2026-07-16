import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchUsersList = async () => {
    try {
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleOpenAddModal = () => {
    setModalType("add");
    setFormData({ name: "", email: "", password: "", role: "Staff" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setModalType("edit");
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        await createUser(formData);
        alert("User created successfully");
      } else {
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await updateUser(editingId, payload);
        alert("User updated successfully");
      }
      setIsModalOpen(false);
      fetchUsersList();
    } catch (err) {
      alert(err.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        alert("User deleted successfully");
        fetchUsersList();
      } catch (err) {
        alert(err.message || "Failed to delete user");
      }
    }
  };

  return (
    <div className="users">
      <div className="users-header">
        <h2>User Management</h2>
        <button className="add-user-btn" onClick={handleOpenAddModal}>
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
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === "Admin" ? "admin-role" : "staff-role"}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleOpenEditModal(user)}>
                      <FaEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalType === "add" ? "Add User" : "Edit User"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Rahul Kumar"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. rahul@example.com"
                />
              </div>
              <div className="form-group">
                <label>Password {modalType === "edit" && "(leave empty to keep current)"}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={modalType === "add"}
                  placeholder={modalType === "add" ? "Enter Password" : "New Password"}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange}>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;