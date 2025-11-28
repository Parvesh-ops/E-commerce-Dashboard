import React, { useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { data: products, loading, error } = useFetch("/products");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; //  products per page

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch data</p>;

  // ================================
  // FILTERING + SEARCH + SORT LOGIC
  // ================================
  let filteredProducts = [...products];

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  filteredProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // ================================
  // PAGINATION LOGIC
  // ================================
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search product..."
          className="border px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option value={cat} key={i}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort By Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((p) => (
            <tr key={p.id} className="border">
              <td className="p-2 border">
                <img src={p.image} width="50" />
              </td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">${p.price}</td>
              <td className="p-2 border">{p.category.toUpperCase()}</td>
              <td className="p-2 border">
                <button
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================================
          PAGINATION UI
      =================================*/}
      <div className="flex justify-center mt-6 gap-2">

        {/* Prev Button */}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded 
                ${currentPage === page ? "bg-blue-600 text-white" : ""}
              `}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Products;
