import React, { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import "./Products.css";

const Products = () => {
  const [search, setSearch] = useState("");

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
      price: 600,
      quantity: 25,
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronics",
      price: 1500,
      quantity: 15,
    },
    {
      id: 4,
      name: "Office Chair",
      category: "Furniture",
      price: 3000,
      quantity: 5,
    },
  ];

  return (
    <div className="products">
      <div className="products-header">
        <h2>Products</h2>

        <button className="add-product">
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

                  <td>{item.category}</td>

                  <td>₹ {item.price}</td>

                  <td>{item.quantity}</td>

                  <td>
                    <button className="edit">
                      <FaEdit />
                    </button>

                    <button className="delete">
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

export default Products;
