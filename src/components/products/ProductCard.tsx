// src/components/products/ProductCard.tsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="block relative aspect-square"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <Heart
          className={`h-5 w-5 ${
            isInWishlist(product.id)
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }`}
        />
      </button>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
