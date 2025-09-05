// src/pages/ProductDetail.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../redux/slices/productSlice.js";
import { addCartItem } from "../redux/slices/cartSlice.js";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../redux/slices/wishlistSlice.js";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, productStatus, error } = useSelector(
    (state) => state.products
  );
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    if (id) dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  // Loading
  if (productStatus === "loading" || !selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  // Error state
  if (productStatus === "failed" || error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">
          Failed to load product. Please try again.
        </p>
      </div>
    );
  }

  const productId = selectedProduct._id;

  const inCart = cartItems.some(
    (item) => String(item._id || item.product) === String(productId)
  );

  const inWishlist = wishlistItems.some((item) => {
    if (!item) return false;
    const pid = item.product?._id || item.product || item._id;
    return String(pid) === String(productId);
  });

  const handleAddToCart = () => {
    if (!inCart) dispatch(addCartItem({ productId, quantity: 1 }));
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      dispatch(removeWishlistItem(productId));
    } else {
      dispatch(addWishlistItem({ productId }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="h-80 w-full md:w-96 object-contain rounded-lg shadow-lg"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-start">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {selectedProduct.title}
        </h2>
        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
        <p className="text-blue-600 font-bold text-2xl mb-6">
          ${selectedProduct.price}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full md:w-auto px-6 py-3 font-semibold rounded-xl shadow transition ${
            inCart
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {inCart ? "Already in Cart" : "Add to Cart"}
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="mt-3 w-full md:w-auto px-6 py-3 border border-pink-500 text-pink-500 font-semibold rounded-xl hover:bg-pink-50 transition"
        >
          {inWishlist ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
