// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice.js";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group relative bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Wishlist Button (Top-right floating) */}
      <button
        onClick={() =>
          isInWishlist
            ? dispatch(removeFromWishlist(product.id))
            : dispatch(addToWishlist(product))
        }
        className="absolute top-3 right-3 text-red-500 text-2xl hover:scale-110 transition z-10"
      >
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-40 object-contain mt-6 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-blue-600 font-bold mt-2 text-lg">${product.price}</p>

        {/* Add to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
