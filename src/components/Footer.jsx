// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-2">AJIO Clone</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop destination for fashion and lifestyle.  
            Shop with ease, stay trendy with us.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-white font-semibold text-lg mb-2">Quick Links</h3>
          <Link to="/about" className="hover:text-yellow-400 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-yellow-400 transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 text-xl">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 text-xl">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 text-xl">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-400 text-xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        Made with ❤️ using React & Tailwind
      </div>
    </footer>
  );
}
