// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice.js";
import { FaTrash } from "react-icons/fa";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      <div className="grid gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 object-contain rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-700">{item.title}</h3>
                <p className="text-blue-600 font-bold mt-1">${item.price}</p>
              </div>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="mt-3 sm:mt-0 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash /> Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end items-center gap-4 text-lg font-semibold text-gray-800">
        <span>Total:</span>
        <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Cart;
