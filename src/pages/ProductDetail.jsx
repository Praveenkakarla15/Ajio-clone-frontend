// src/pages/ProductDetail.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../redux/slices/productSlice.js";
import { addToCart } from "../redux/slices/cartSlice.js";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (status === "loading" || !selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="h-80 w-full md:w-96 object-contain rounded-lg shadow-lg"
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

        <button
          onClick={() => dispatch(addToCart(selectedProduct))}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
