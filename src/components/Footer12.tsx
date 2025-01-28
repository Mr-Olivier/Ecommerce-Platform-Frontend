import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white py-10 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-yellow-300 mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaPhoneAlt className="text-yellow-300 mr-2" />
              <span>+123 456 789</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-yellow-300 mr-2" />
              <span>info@ecommerce.com</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-yellow-300 mr-2" />
              <span>123 Main Street, Kigali, Rwanda</span>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-yellow-300 mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            Discover and shop the best products at unbeatable prices. Your
            satisfaction is our priority.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:opacity-75">
              <FaFacebookF className="text-2xl text-yellow-300" />
            </a>
            <a href="#" className="hover:opacity-75">
              <FaInstagram className="text-2xl text-yellow-300" />
            </a>
            <a href="#" className="hover:opacity-75">
              <FaTwitter className="text-2xl text-yellow-300" />
            </a>
            <a href="#" className="hover:opacity-75">
              <FaLinkedinIn className="text-2xl text-yellow-300" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-yellow-300 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#charge" className="hover:underline">
                Charge
              </a>
            </li>
            <li>
              <a href="#news" className="hover:underline">
                News
              </a>
            </li>
            <li>
              <a href="#maintenance" className="hover:underline">
                Maintenance
              </a>
            </li>
            <li>
              <a href="#financing" className="hover:underline">
                Financing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#testdrive" className="hover:underline">
                Test Drive
              </a>
            </li>
            <li>
              <a href="#careers" className="hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-xl font-bold text-yellow-300 mb-4">Subscribe</h3>
          <p className="text-sm leading-relaxed mb-4">
            Sign up to receive the latest updates, exclusive offers, and more.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 rounded-l-md focus:outline-none text-black"
            />
            <button className="bg-yellow-400 text-black p-2 rounded-r-md hover:bg-yellow-500">
              <MdSend className="text-lg" />
            </button>
          </form>
        </div>
      </div>

      {/* Scroll to Top Arrow */}
      <div className="absolute right-4 bottom-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500"
        >
          <FaArrowUp />
        </button>
      </div>

      <div className="mt-10 text-center text-yellow-300 text-sm">
        © {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
