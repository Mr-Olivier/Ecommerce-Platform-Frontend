// src/components/products/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../types/Cart";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/currency";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product details when clicking the button
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
  };

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 transition-shadow hover:shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews})
            </span>
          </div>
          <p className="mt-2 text-gray-600">{formatCurrency(product.price)}</p>
          <p className="mt-1 text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
            product.stock > 0
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
