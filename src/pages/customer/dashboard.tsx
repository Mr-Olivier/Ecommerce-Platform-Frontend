import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import OrderHistory from "../../components/customer-dashboard/OrderHistory";
import WishlistSummary from "../../components/customer-dashboard/WishlistSummary";
import { useAuth } from "../../hooks/useAuth";
import { useOrder } from "../../hooks/useOrder";
import { useWishlist } from "../../hooks/useWishlist";

// Type definitions
interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  wishlistItems: number;
  savedAddresses: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, fetchRecentOrders } = useOrder();
  const { wishlist, fetchWishlist } = useWishlist();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    wishlistItems: 0,
    savedAddresses: 2, // Mock data - would actually come from an API
  });

  useEffect(() => {
    // Fetch recent orders and wishlist items
    fetchRecentOrders();
    fetchWishlist();
  }, [fetchRecentOrders, fetchWishlist]);

  useEffect(() => {
    // Update statistics when data is loaded
    if (orders) {
      setStats((prev) => ({
        ...prev,
        totalOrders: orders.length,
        pendingOrders: orders.filter(
          (order) => order.status === "Pending" || order.status === "Processing"
        ).length,
      }));
    }

    if (wishlist) {
      setStats((prev) => ({
        ...prev,
        wishlistItems: wishlist.length,
      }));
    }
  }, [orders, wishlist]);

  // Get last order
  // const lastOrder = orders && orders.length > 0 ? orders[0] : null;

  return (
    <DashboardLayout title="My Dashboard">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome back, {user?.name || "Valued Customer"}
        </h2>
        <p className="text-gray-600">
          Here's an overview of your account and recent activities.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                {stats.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Pending Orders
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                {stats.pendingOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
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
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Wishlist Items
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                {stats.wishlistItems}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Saved Addresses
              </h3>
              <p className="text-lg font-semibold text-gray-800">
                {stats.savedAddresses}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                Recent Orders
              </h3>
              <Link
                to="/customer/orders"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View All
              </Link>
            </div>
            <div className="px-6 py-4">
              {orders && orders.length > 0 ? (
                <OrderHistory orders={orders.slice(0, 3)} compact />
              ) : (
                <div className="text-center py-6">
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
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    No orders yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start shopping to see your orders here
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wishlist Preview */}
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Wishlist</h3>
              <Link
                to="/customer/wishlist"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View All
              </Link>
            </div>
            <div className="px-6 py-4">
              {wishlist && wishlist.length > 0 ? (
                <WishlistSummary items={wishlist.slice(0, 3)} />
              ) : (
                <div className="text-center py-6">
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
                    Save items you love for later
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                Quick Actions
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/customer/account"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Edit Profile
                  </span>
                </Link>

                <Link
                  to="/customer/addresses"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Addresses
                  </span>
                </Link>

                <Link
                  to="/customer/payment-methods"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Payment
                  </span>
                </Link>

                <Link
                  to="/customer/wishlist"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-500 mb-2"
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
                  <span className="text-sm font-medium text-gray-700">
                    Wishlist
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
