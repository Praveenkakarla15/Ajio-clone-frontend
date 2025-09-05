import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
  clearCartBackend as clearCartItems,
} from "../redux/slices/cartSlice.js";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaTimesCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + (item.product?.price || item.price || 0) * (item.quantity || 1),
    0
  );

  // Increase quantity
  const handleIncrease = (item) => {
    if (!item._id) return;
    dispatch(updateCartItem({ id: item._id, quantity: (item.quantity || 1) + 1 }));
  };

  // Decrease quantity or remove if quantity is 1
  const handleDecrease = (item) => {
    if (!item._id) return;
    if (item.quantity > 1) {
      dispatch(updateCartItem({ id: item._id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeCartItem(item._id));
    }
  };

  // Remove single product from cart
  const handleRemove = (item) => {
    if (!item._id) return;
    dispatch(removeCartItem(item._id)); // Pass cart item ID
  };

  // Clear entire cart
  const handleClear = () => {
    dispatch(clearCartItems());
  };

  // If cart is empty
  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500 text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <p className="mb-4">Add some products to get started!</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Your Cart
      </h2>

      <div className="grid gap-6">
        {cartItems.map((item) => {
          const id = item._id; // must be cart item _id
          const title = item.product?.title || item.title || "Untitled Product";
          const price = item.product?.price || item.price || 0;
          const image = item.product?.image || item.image || "/placeholder.jpg";

          return (
            <div
              key={id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-1/2">
                <img
                  src={image}
                  alt={title}
                  className="h-20 w-20 object-contain rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-700">{title}</h3>
                  <p className="text-blue-600 font-bold mt-1">
                    ${price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="flex items-center gap-3 border rounded-lg px-3 py-1 bg-gray-50">
                  <button
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity === 1}
                    className={`p-2 rounded ${
                      item.quantity === 1
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="px-2 font-semibold text-gray-800">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-lg font-semibold text-gray-800">
        <div className="flex items-center gap-2">
          <span>Total:</span>
          <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <FaTimesCircle /> Clear Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
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
