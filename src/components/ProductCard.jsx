// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/slices/cartSlice.js";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../redux/slices/wishlistSlice.js";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items || []);

  // Use MongoDB `_id` or API `id`
  const productId = product._id || product.id;

  // Support both shapes:
  // - frontend-only saved items (product objects) -> item._id / item.id
  // - backend favorites format -> item.product (populated) or item.product._id
  const isInWishlist = wishlist.some((item) => {
    if (!item) return false;

    // if backend returned favorites as { product: {...}, _id: favId }
    if (item.product) {
      const pid = item.product._id || item.product.id || item.product;
      return String(pid) === String(productId);
    }

    // if wishlist stores product objects directly
    const pid = item._id || item.id || (item.product && (item.product._id || item.product.id));
    return String(pid) === String(productId);
  });

  const handleAddToCart = () => {
    // Thunk expects { productId, quantity }
    dispatch(addCartItem({ productId, quantity: 1 }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      // removeWishlistItem expects productId (we call delete /favorites/:id where :id is productId)
      dispatch(removeWishlistItem(productId));
    } else {
      // addWishlistItem expects { productId }
      dispatch(addWishlistItem({ productId }));
    }
  };

  return (
    <div className="group relative bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 text-red-500 text-2xl hover:scale-110 transition z-10"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Product Image */}
      <Link to={`/product/${productId}`} className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-40 object-contain mt-6 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${productId}`}>
          <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <p className="text-blue-600 font-bold mt-2 text-lg">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
