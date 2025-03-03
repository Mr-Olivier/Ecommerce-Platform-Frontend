import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import OrderHistory from "../../components/customer-dashboard/OrderHistory";
import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../components/customer-dashboard/OrderHistory";

const OrdersPage: React.FC = () => {
  const { orders, fetchOrders } = useOrder();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Fetch all orders when the component mounts
    const loadOrders = async () => {
      setLoading(true);
      await fetchOrders();
      setLoading(false);
    };

    loadOrders();
  }, [fetchOrders]);

  // Filter orders based on the selected filter
  const getFilteredOrders = (): Order[] => {
    if (!orders) return [];

    switch (filter) {
      case "pending":
        return orders.filter((order) => order.status === "Pending");
      case "processing":
        return orders.filter((order) => order.status === "Processing");
      case "shipped":
        return orders.filter((order) => order.status === "Shipped");
      case "delivered":
        return orders.filter((order) => order.status === "Delivered");
      case "cancelled":
        return orders.filter((order) => order.status === "Cancelled");
      default:
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <DashboardLayout title="My Orders">
      <div className="space-y-6">
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-medium text-gray-900">
                Order History
              </h3>

              <div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow py-8 px-6 text-center">
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
              No orders found
            </h3>
            <p className="text-gray-500 mb-4">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `You don't have any ${filter} orders.`}
            </p>
          </div>
        ) : (
          <OrderHistory orders={filteredOrders} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
