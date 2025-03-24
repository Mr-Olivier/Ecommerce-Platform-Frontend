import React from "react";
import { Link } from "react-router-dom";

// Type definitions
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  totalAmount?: string;
}

interface OrderHistoryProps {
  orders: Order[];
  compact?: boolean;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  compact = false,
}) => {
  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status badge color based on status
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-hidden">
      {orders.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 sm:p-5">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Link
                      to={`/customer/orders/${order.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Order Items (for compact view, only show number of items) */}
                {compact ? (
                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                ) : (
                  <>
                    <ul className="divide-y divide-gray-200 mt-4">
                      {order.items.map((item) => (
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
                          <div
                            className={`ml-${
                              item.image ? "4" : "0"
                            } flex-1 flex flex-col`}
                          >
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h4>{item.name}</h4>
                                <p className="ml-4">
                                  {formatCurrency(item.price * item.quantity)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                Qty: {item.quantity} ×{" "}
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                      <span className="text-base font-medium text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-medium text-gray-900">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
