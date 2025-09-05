// src/pages/Wishlist.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeWishlistItem } from "../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeWishlistItem(id));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const product = item.product || item;
            return (
              <div
                key={product._id}
                className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover rounded-md"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mt-1 text-sm">${product.price}</p>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/product/${product._id}`}
                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
