// src/pages/index.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  ArrowUp,
} from "lucide-react";

import Layout from "../components/common/Layout";
import ProductCard from "../components/products/ProductCard";
import { useProduct } from "../hooks/useProduct";

const LandingPage = () => {
  const { featuredProducts } = useProduct();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const displayedProducts = showAllProducts
    ? featuredProducts
    : featuredProducts.slice(0, 4);

  // Handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const testimonials = [
    {
      text: "Amazing quality and fast shipping. Will definitely shop here again!",
      author: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
    },
    {
      text: "The customer service is exceptional. They went above and beyond to help me.",
      author: "Michael Chen",
      role: "Premium Member",
      rating: 5,
    },
    {
      text: "High-quality products at great prices. This is now my go-to store!",
      author: "Emma Davis",
      role: "Verified Buyer",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders over $100",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: RefreshCcw,
      title: "Easy Returns",
      desc: "30-day return policy",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      desc: "Always here to help",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Shop the latest trends and find your perfect style with our
              curated collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-200"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-white border-2 border-white hover:bg-white/10 transition-colors duration-200"
              >
                Browse Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-200"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold tracking-wide uppercase">
              Featured Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Our Most Popular Items
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our
              customers love
            </p>
          </div>

          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-lg font-medium rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200"
            >
              {showAllProducts ? (
                <>
                  View Less Products
                  <ChevronUp className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  View All Products
                  <ChevronDown className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold tracking-wide uppercase">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex text-primary-600 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-lg">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-1" />
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for updates, exclusive offers, and
              early access to new products.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-primary-600 text-lg font-medium rounded-full hover:bg-primary-50 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section> */}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg z-50 cursor-pointer transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default LandingPage;
