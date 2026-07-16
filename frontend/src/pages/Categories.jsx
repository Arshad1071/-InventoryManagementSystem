import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./Categories.css";

const Categories = () => {
  const [search, setSearch] = useState("");

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Electronic Products",
    },
    {
      id: 2,
      name: "Furniture",
      description: "Home & Office Furniture",
    },
    {
      id: 3,
      name: "Groceries",
      description: "Daily Grocery Items",
    },
    {
      id: 4,
      name: "Stationery",
      description: "Office Stationery",
    },
  ];

  return (
    <div className="categories">

      <div className="category-header">

        <h2>Categories</h2>

        <button className="add-category">
          <FaPlus />
          Add Category
        </button>

      </div>

      <div className="category-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="category-table">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Category Name</th>

              <th>Description</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {categories
              .filter((item) =>
                item.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.name}</td>

                  <td>{item.description}</td>

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

export default Categories;