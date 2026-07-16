import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";
import "./ProductTable.css";

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const prodRes = await getProducts();
      const catRes = await getCategories();
      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (err) {
      console.error("Error loading dashboard products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStockAdjust = async (product, adjustment) => {
    const newQuantity = product.quantity + adjustment;
    if (newQuantity < 0) return;

    try {
      await updateProduct(product.id, {
        name: product.name,
        price: product.price,
        quantity: newQuantity,
        category_id: product.category_id,
      });
      fetchData();
    } catch (err) {
      console.error("Error adjusting stock:", err);
      alert(err.message || "Failed to adjust stock");
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={() => navigate("/products")}>
          + Add Product
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{getCategoryName(product.category_id)}</td>
              <td>₹ {product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate("/products")}
                  title="Edit Product"
                >
                  <FaEdit />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => navigate("/products")}
                  title="Delete Product"
                >
                  <FaTrash />
                </button>

                <button
                  className="plus-btn"
                  onClick={() => handleStockAdjust(product, 1)}
                  title="Increase Stock"
                >
                  <FaPlus />
                </button>

                <button
                  className="minus-btn"
                  onClick={() => handleStockAdjust(product, -1)}
                  title="Decrease Stock"
                  disabled={product.quantity <= 0}
                >
                  <FaMinus />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
