// src/pages/customer/wishlist.tsx
import React from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import { useWishlist } from "../../hooks/useWishlist";
import { Link } from "react-router-dom";

const WishlistPage: React.FC = () => {
  const { wishlist, loading, fetchWishlist, removeFromWishlist, moveToCart } =
    useWishlist();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const loadWishlist = async () => {
      const data = await fetchWishlist();
      setItems(data || []);
    };
    loadWishlist();
  }, [fetchWishlist]);

  const handleRemoveItem = async (id: string) => {
    await removeFromWishlist(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const handleMoveToCart = async (id: string) => {
    await moveToCart(id);
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <DashboardLayout title="My Wishlist">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Saved Items</h3>
          <p className="mt-1 text-sm text-gray-500">
            Items you've added to your wishlist
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Add items to your wishlist while shopping
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.image && (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-48"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>

                    <div className="mt-4 flex space-x-3">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(item.id)}
                        disabled={!item.inStock}
                        className={`flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          item.inStock
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WishlistPage;
