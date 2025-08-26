// src/pages/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice.js";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />
            <h3 className="text-sm font-semibold text-gray-700 text-center truncate">
              {product.title}
            </h3>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>

            <div className="flex gap-2 mt-4 w-full justify-center">
              <button
                onClick={() => dispatch(removeFromWishlist(product.id))}
                className="flex items-center gap-2 bg-pink-500 text-white px-3 py-1.5 rounded-xl hover:bg-pink-600 transition"
              >
                <FaTrash /> Remove
              </button>

              <Link
                to={`/product/${product.id}`}
                className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
