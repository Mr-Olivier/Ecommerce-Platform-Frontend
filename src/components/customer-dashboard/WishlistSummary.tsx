import React from "react";
import { Link } from "react-router-dom";

// Type definitions
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}

interface WishlistSummaryProps {
  items: WishlistItem[];
}

const WishlistSummary: React.FC<WishlistSummaryProps> = ({ items }) => {
  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="overflow-hidden">
      {items.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="py-4 flex">
              {item.image && (
                <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              )}
              <div className="ml-4 flex-1 flex flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h4>
                      <Link
                        to={`/products/${item.productId}`}
                        className="hover:text-indigo-600"
                      >
                        {item.name}
                      </Link>
                    </h4>
                    <p className="ml-4">{formatCurrency(item.price)}</p>
                  </div>
                  <p className="mt-1 text-sm">
                    {item.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>
                </div>
                <div className="mt-2 flex justify-between">
                  <button
                    type="button"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    // Add your add to cart function here
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    // Add your remove from wishlist function here
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistSummary;
