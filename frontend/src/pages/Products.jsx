import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { getCategories } from "../services/categoryService";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category_id: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const prodRes = await getProducts();
      const catRes = await getCategories();
      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (err) {
      console.error("Error loading products/categories:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddModal = () => {
    setModalType("add");
    setFormData({
      name: "",
      price: "",
      quantity: "",
      category_id: categories[0]?.id || "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalType("edit");
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category_id: product.category_id || "",
    });
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
        await createProduct(formData);
        alert("Product created successfully");
      } else {
        await updateProduct(editingId, formData);
        alert("Product updated successfully");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully");
        fetchData();
      } catch (err) {
        alert(err.message || "Failed to delete product");
      }
    }
  };

  // Helper to map category_id to name
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <div className="products">
      <div className="products-header">
        <h2>Products</h2>
        <button className="add-product" onClick={handleOpenAddModal}>
          <FaPlus />
          Add Product
        </button>
      </div>

      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{getCategoryName(item.category_id)}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="edit" onClick={() => handleOpenEditModal(item)}>
                      <FaEdit />
                    </button>
                    <button className="delete" onClick={() => handleDelete(item.id)}>
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
            <h3>{modalType === "add" ? "Add Product" : "Edit Product"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Mechanical Keyboard"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="Price"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  placeholder="Quantity"
                  min="0"
                />
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

export default Products;
