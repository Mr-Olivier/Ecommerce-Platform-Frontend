import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">E-Commerce</h1>

        {/* Navigation Links */}
        <ul className="flex-grow flex justify-center space-x-6">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#products" className="hover:underline">
              Shop
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>

        {/* Sign In Button */}
        <Link
          to="/login"
          className="bg-white text-blue-600 py-1 px-4 rounded-lg hover:bg-gray-200"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;
