// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import bannerImage from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter products for suggestions
    const matches = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches.slice(0, 5)); // show top 5 suggestions
  };

  // Handle Enter key (auto navigate to first suggestion)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0].id || suggestions[0]._id);
    }
  };

  // When clicking a suggestion
  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setSearch("");
    setSuggestions([]);
  };

  // Filter + Search + Sort for grid
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  // Loading state with skeletons
  if (status === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 animate-pulse rounded-lg h-60"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (status === "failed") {
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        Failed to load products. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 relative">
        {/* Search Bar with Suggestions */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border w-full mt-1 rounded shadow-lg z-50 max-h-60 overflow-auto">
              {suggestions.map((item) => (
                <li
                  key={item.id || item._id}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(item.id || item._id)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-2xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="all">All Categories</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-2xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="default">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Banner Image */}
      <div className="mb-6">
        <img
          src={bannerImage}
          alt="Promotional Banner"
          className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
