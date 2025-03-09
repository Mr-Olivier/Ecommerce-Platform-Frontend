// src/components/products/ProductCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../types/Cart";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/currency";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid",
}) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product details when clicking the button

    if (product.stock === 0) return;

    const cartItem: CartItem = {
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      stockQuantity: product.stock,
      attributes: {
        category: product.category,
      },
    };

    addItem(cartItem);

    // Show added animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Calculate discount percentage if there's a sale price
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;

  if (viewMode === "list") {
    return (
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-48 md:w-56 flex-shrink-0">
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                -{discountPercentage}%
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                NEW
              </div>
            )}
            <Link to={`/products/${product.id}`}>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {product.category}
                </p>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    ({product.reviews})
                  </span>
                </div>
              </div>

              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(product.price)}
                  </span>

                  {hasDiscount && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                      {formatCurrency(product.originalPrice!)}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {product.stock > 10
                    ? "In stock"
                    : product.stock > 0
                    ? `Only ${product.stock} left`
                    : "Out of stock"}
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle wishlist functionality
                  }}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                    isAdded
                      ? "bg-green-500 text-white w-10"
                      : product.stock > 0
                      ? "bg-primary-600 hover:bg-primary-700 text-white px-4 py-2"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed px-4 py-2"
                  }`}
                >
                  {isAdded ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-1" />
                      <span>
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      className="h-full group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Discount tag */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
              -{discountPercentage}%
            </div>
          )}

          {/* New tag */}
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
              NEW
            </div>
          )}

          {/* Product image with hover effects */}
          <Link
            to={`/products/${product.id}`}
            className="block overflow-hidden"
          >
            <div className="relative pt-[100%]">
              {" "}
              {/* 1:1 aspect ratio */}
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay with quick actions */}
              <div
                className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                  aria-label="Quick view"
                >
                  <Eye className="h-5 w-5" />
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle wishlist functionality
                  }}
                  className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {product.category}
          </p>

          {/* Product name */}
          <Link to={`/products/${product.id}`} className="block flex-grow">
            <h3 className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>

            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatCurrency(product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Stock status */}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {product.stock > 10
              ? "In stock"
              : product.stock > 0
              ? `Only ${product.stock} left`
              : "Out of stock"}
          </p>

          {/* Add to cart button */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mt-4 w-full py-2.5 px-4 rounded-md transition-all duration-300 flex items-center justify-center ${
              isAdded
                ? "bg-green-500 text-white"
                : product.stock > 0
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
            whileTap={{ scale: 0.95 }}
            initial={false}
            animate={isAdded ? { width: "auto" } : { width: "100%" }}
          >
            {isAdded ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
