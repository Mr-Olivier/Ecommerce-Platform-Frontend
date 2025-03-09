import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  ShoppingBag,
  ArrowUpDown,
  Grid,
  List,
  X,
  ChevronDown,
} from "lucide-react";
import ProductList from "../../components/products/ProductList";
import Filters from "../../components/products/Filters";
import { useProduct } from "../../hooks/useProduct";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ProductListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const { featuredProducts, loading } = useProduct();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFilterSticky(scrollPosition > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const categories = Array.from(
    new Set(featuredProducts.map((p) => p.category))
  );

  // Apply filters and sorting
  let filteredProducts = selectedCategory
    ? featuredProducts.filter((p) => p.category === selectedCategory)
    : featuredProducts;

  // Sort products based on selection
  switch (selectedSort) {
    case "price-low":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
      break;
    case "price-high":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
      break;
    case "newest":
      filteredProducts = [...filteredProducts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default: // 'featured' - no change needed as products are already sorted by featured
      break;
  }

  const activeFilters = selectedCategory ? 1 : 0;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const mobileFilterVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover Our Products
          </h1>
          <p className="text-primary-100 text-lg max-w-xl">
            Browse our collection of high-quality products tailored to your
            needs. Use filters to find exactly what you're looking for.
          </p>
        </div>
      </div>

      {/* Breadcrumbs & Filter Stats */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          <span className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Home
          </span>{" "}
          /{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            Products
          </span>
          {selectedCategory && (
            <>
              {" "}
              /{" "}
              <span className="font-medium text-primary-600 dark:text-primary-400">
                {selectedCategory}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Showing {filteredProducts.length} of {featuredProducts.length}{" "}
            products
          </span>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden container mx-auto px-4 mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <Filter className="h-5 w-5 text-primary-600" />
          <span className="font-medium">Filters</span>
          {activeFilters > 0 && (
            <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-full lg:w-1/4">
            <div
              className={`transition-all duration-300 ${
                isFilterSticky ? "sticky top-24" : ""
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-primary-600" />
                    Filters
                  </h2>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      Clear <X className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
                <Filters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className="w-full lg:w-3/4">
            {/* Sort & View Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="relative">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-gray-500" />
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="appearance-none bg-transparent pr-8 py-2 font-medium focus:outline-none cursor-pointer text-gray-800 dark:text-gray-200"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-500 absolute right-2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 hidden sm:inline">
                  View:
                </span>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid"
                      ? "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${
                    viewMode === "list"
                      ? "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Product List with Animation */}
            <motion.div
              key={`${selectedCategory}-${selectedSort}-${viewMode}`}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} viewMode={viewMode} />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                    No products found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-in Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          ></div>

          <motion.div
            className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileFilterVariants}
          >
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary-600" />
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 p-4">
                <Filters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={(category) => {
                    setSelectedCategory(category);
                    setShowMobileFilters(false);
                  }}
                />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setShowMobileFilters(false);
                  }}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>

                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="w-full mt-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-center font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
