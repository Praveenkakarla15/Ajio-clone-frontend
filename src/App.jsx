// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar always on top */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default App;
