import React from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import "./ProductTable.css";

const ProductTable = () => {
  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 65000,
      quantity: 10,
    },
    {
      id: 2,
      name: "Mouse",
      category: "Electronics",
      price: 700,
      quantity: 35,
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronics",
      price: 1200,
      quantity: 20,
    },
    {
      id: 4,
      name: "Chair",
      category: "Furniture",
      price: 2500,
      quantity: 8,
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Products</h2>

        <button className="add-btn">+ Add Product</button>
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

              <td>{product.category}</td>

              <td>₹ {product.price}</td>

              <td>{product.quantity}</td>

              <td>
                <button className="edit-btn">
                  <FaEdit />
                </button>

                <button className="delete-btn">
                  <FaTrash />
                </button>

                <button className="plus-btn">
                  <FaPlus />
                </button>

                <button className="minus-btn">
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
