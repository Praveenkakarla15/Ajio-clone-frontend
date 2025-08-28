// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/slices/cartSlice.js";
import { FaTrash, FaPlus, FaMinus, FaTimesCircle, FaShoppingCart } from "react-icons/fa";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500 text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Your Cart
      </h2>

      <div className="grid gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-contain rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-700">{item.title}</h3>
                <p className="text-blue-600 font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity + Remove in one row for consistency */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3 border rounded-lg px-3 py-1 bg-gray-50">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                >
                  <FaMinus size={12} />
                </button>
                <span className="px-2 font-semibold text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total, Clear Cart & Checkout */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-lg font-semibold text-gray-800">
        {/* Total Price */}
        <div className="flex items-center gap-2">
          <span>Total:</span>
          <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          {/* Clear Cart */}
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <FaTimesCircle /> Clear Cart
          </button>

          {/* Checkout */}
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <FaShoppingCart /> Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
