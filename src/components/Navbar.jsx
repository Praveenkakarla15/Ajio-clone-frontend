import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCartBackend } from "../redux/slices/cartSlice.js";
import { clearWishlistBackend } from "../redux/slices/wishlistSlice.js";
import {
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { logout } from "../redux/slices/authSlice.js";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    // First clear backend + redux state
    await dispatch(clearCartBackend());
    await dispatch(clearWishlistBackend());

    // Then clear auth
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  // Count items correctly
  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Brand */}
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="text-xl sm:text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform"
      >
        AJIO <span className="text-yellow-300">Clone</span>
      </Link>

      {/* Hamburger for mobile */}
      <button
        className="text-white text-2xl sm:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-6 sm:items-center mt-4 sm:mt-0 absolute sm:static top-16 left-0 w-full sm:w-auto bg-indigo-600 sm:bg-transparent px-6 sm:px-0 py-4 sm:py-0 shadow sm:shadow-none`}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
        >
          <FaHome /> Home
        </Link>

        <Link
          to="/cart"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors relative"
        >
          <FaShoppingCart /> Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-300 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/wishlist"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors relative"
        >
          <FaHeart /> Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-2 text-white">
            <FaUser className="text-lg" />
            <span className="font-semibold">{user.username || user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 text-xs bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <FaUser /> Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
