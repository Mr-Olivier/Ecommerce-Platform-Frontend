import React from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <header id="home" className="bg-blue-400 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-6">
          Discover the best products at unbeatable prices.
        </p>
        <a
          href="#products"
          className="bg-white text-blue-600 py-2 px-6 rounded-lg font-bold hover:bg-gray-200"
        >
          Shop Now
        </a>
      </header>
      <ProductList />
      <Footer />
    </div>
  );
};

export default LandingPage;
