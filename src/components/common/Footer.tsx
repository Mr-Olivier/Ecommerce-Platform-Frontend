// src/components/common/Footer.tsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "News & Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ];

  const customerService = [
    { name: "Shipping Information", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Payment Methods", href: "/payment" },
    { name: "Track Order", href: "/track-order" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Commerce St, New York, NY 10001" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "support@estore.com" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800">
      {/* Newsletter Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-primary-100">
                Subscribe to our newsletter for exclusive deals, new products,
                and latest updates.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-80 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-primary-100 border border-primary-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                EStore
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Your premier destination for quality products and exceptional
              service. Discover the perfect blend of style, innovation, and
              reliability.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-gray-500 dark:text-gray-400"
                  >
                    <Icon className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Customer Service
            </h3>
            <ul className="space-y-4">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Download Our App
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Shop smarter and faster with our mobile app.
            </p>
            <div className="space-y-4">
              <a href="#" className="block w-full">
                <img
                  src="/app-store.png"
                  alt="Download on App Store"
                  className="h-12 w-auto hover:opacity-80 transition-opacity duration-200"
                />
              </a>
              <a href="#" className="block w-full">
                <img
                  src="/play-store.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto hover:opacity-80 transition-opacity duration-200"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} EStore. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <Link
                to="/terms"
                className="hover:text-primary-600 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="hover:text-primary-600 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="hover:text-primary-600 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
