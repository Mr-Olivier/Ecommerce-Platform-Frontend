import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-navy text-white p-4 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src={logo} // Replace with your actual logo file path
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold">E-Commerce</h1>
        </div>

        {/* Hamburger Menu (for mobile) */}
        <button
          className="md:hidden text-yellow-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i
            className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}
          ></i>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center justify-center space-x-6">
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
          className="hidden md:block bg-yellow-300 text-navy py-1 px-4 rounded-lg hover:bg-yellow-400"
        >
          Sign In
        </Link>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy text-white fixed top-0 left-0 w-full h-full z-50 p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-yellow-300 text-3xl"
          >
            <i className="fas fa-times"></i>
          </button>
          <ul className="flex flex-col items-center justify-center space-y-6 mt-20">
            <li>
              <a
                href="#home"
                className="text-lg hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#products"
                className="text-lg hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-lg hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-lg hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-yellow-300 text-navy py-2 px-6 rounded-lg hover:bg-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
