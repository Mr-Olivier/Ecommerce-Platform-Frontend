import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import RelatedProducts from "./RelatedProducts";
import ReviewSummary from "../reviews/ReviewSummary";
import { formatCurrency } from "../../utils/currency";
import { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Create the cart item from the product
    const cartItem = {
      id: `cart-item-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      stockQuantity: product.stock || 10,
      attributes: {},
    };

    console.log("Adding to cart:", cartItem);

    // Add to cart with a small delay to show the "Adding..." state
    setTimeout(() => {
      addItem(cartItem);
      setIsAdding(false);
      navigate("/cart");
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={[product.image]} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">
            {formatCurrency(product.price)}
          </p>
          <p className="mb-4">{product.description}</p>
          <ReviewSummary
            rating={product.rating}
            reviewCount={product.reviews}
          />

          {/* Quantity selector */}
          <div className="flex items-center my-4">
            <span className="mr-4 text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 text-gray-800">{quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                disabled={quantity >= (product.stock || 10)}
              >
                +
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-500">
              {product.stock ? `${product.stock} available` : "In stock"}
            </span>
          </div>

          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full px-6 py-3 rounded-lg mt-4 flex items-center justify-center transition-colors"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : product.stock === 0 ? (
              "Out of Stock"
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductDetails;
