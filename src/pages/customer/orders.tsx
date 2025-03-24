import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
// import OrderHistory from "../../components/customer-dashboard/OrderHistory";
import { useOrder } from "../../hooks/useOrder";
import { Order } from "../../components/customer-dashboard/OrderHistory";
import axios from "axios";
import Modal from "../../components/common/Modal"; // Adjust import path if needed

const OrdersPage: React.FC = () => {
  const { orders, fetchOrders } = useOrder();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

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
        return orders.filter((order) => order.status === "PENDING");
      case "processing":
        return orders.filter((order) => order.status === "PROCESSING");
      case "shipped":
        return orders.filter((order) => order.status === "SHIPPED");
      case "delivered":
        return orders.filter((order) => order.status === "DELIVERED");
      case "cancelled":
        return orders.filter((order) => order.status === "CANCELLED");
      default:
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();

  // Function to fetch order details
  const fetchOrderDetails = async (orderId: string) => {
    setDetailsLoading(true);
    setError(null);
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");

      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await axios.get(
        `http://localhost:4000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setOrderDetails(response.data.data.order);
      setIsModalOpen(true);
    } catch (err: any) {
      console.error("Error fetching order details:", err);
      setError(
        `Failed to load order details: ${
          err.response?.data?.message || "Please try again"
        }`
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  // Function to cancel an order
  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    setCancelLoading(true);
    setError(null);
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");

      if (!token) {
        setError("Authentication required");
        return;
      }

      // Use the cancel endpoint
      await axios.patch(
        `http://localhost:4000/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh the orders list
      await fetchOrders();

      // Update order details if modal is open
      if (orderDetails && orderDetails.id === orderId) {
        setOrderDetails({
          ...orderDetails,
          status: "CANCELLED",
        });
      }

      // Show success message
      setError(null);
    } catch (err: any) {
      console.error("Error cancelling order:", err);
      if (err.response?.status === 400) {
        setError("Only pending orders can be cancelled");
      } else {
        setError(
          `Failed to cancel order: ${
            err.response?.data?.message || "Please try again"
          }`
        );
      }
    } finally {
      setCancelLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: string | number) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  // Define status colors for badges
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  // Get payment status based on order status
  const getPaymentStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Payment Required",
          color: "text-red-600 font-semibold",
        };
      case "PROCESSING":
      case "SHIPPED":
      case "DELIVERED":
        return {
          label: "Payment Completed",
          color: "text-green-600 font-semibold",
        };
      case "CANCELLED":
        return { label: "Order Cancelled", color: "text-gray-600" };
      default:
        return { label: "Unknown", color: "text-gray-600" };
    }
  };

  return (
    <DashboardLayout title="My Orders">
      <div className="space-y-6">
        {/* Error message */}
        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li
                  key={order.id}
                  className="border-l-4 border-transparent hover:border-indigo-500 transition-colors duration-200"
                >
                  <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Order #{order.id.substring(0, 8)}
                        </p>
                        <p className="flex-shrink-0 text-sm text-gray-500">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[
                              order.status as keyof typeof statusColors
                            ]
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {order.status === "PENDING" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={cancelLoading}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            {cancelLoading ? "Cancelling..." : "Cancel Order"}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            fetchOrderDetails(order.id);
                          }}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Order summary with payment info */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1">
                        <div className="text-sm text-gray-500">Items</div>
                        <div className="mt-1 text-sm font-medium text-gray-900">
                          {order.items?.length || 0} items
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <div className="text-sm text-gray-500">
                          Payment Status
                        </div>
                        <div
                          className={`mt-1 text-sm ${
                            getPaymentStatus(order.status).color
                          }`}
                        >
                          {getPaymentStatus(order.status).label}
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <div className="text-sm text-gray-500">Amount Due</div>
                        <div className="mt-1 text-lg font-bold text-gray-900">
                          {formatCurrency(
                            order.totalAmount
                              ? parseFloat(order.totalAmount)
                              : order.total
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Payment action for pending orders */}
                    {order.status === "PENDING" && (
                      <div className="mt-4 flex justify-end">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            // This would navigate to payment page in a real app
                            alert(
                              "This would redirect to the payment page in a real application"
                            );
                          }}
                        >
                          Complete Payment
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
      >
        {detailsLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : orderDetails ? (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{orderDetails.id.substring(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(orderDetails.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Amount Due</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatCurrency(orderDetails.totalAmount)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Order Status</h4>
                <div className="mt-2 flex items-center">
                  <span
                    className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      statusColors[
                        orderDetails.status as keyof typeof statusColors
                      ]
                    }`}
                  >
                    {orderDetails.status}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <h4 className="font-medium text-gray-900">Payment Status</h4>
                <div
                  className={`mt-2 text-sm ${
                    getPaymentStatus(orderDetails.status).color
                  }`}
                >
                  {getPaymentStatus(orderDetails.status).label}
                </div>
              </div>
            </div>

            {/* Payment Action for pending orders */}
            {orderDetails.status === "PENDING" && (
              <div className="flex justify-between items-center space-x-4">
                <button
                  onClick={() => handleCancelOrder(orderDetails.id)}
                  disabled={cancelLoading}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {cancelLoading ? "Cancelling..." : "Cancel Order"}
                </button>

                <button
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    // This would navigate to payment page in a real app
                    alert(
                      "This would redirect to the payment page in a real application"
                    );
                  }}
                >
                  Complete Payment
                </button>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-900">Order Items</h4>
              <ul className="mt-2 divide-y divide-gray-200">
                {orderDetails.items.map((item: any) => (
                  <li key={item.id} className="py-4 flex items-center">
                    {item.product.images && item.product.images.length > 0 && (
                      <div className="flex-shrink-0 h-16 w-16 mr-4">
                        <img
                          src={
                            item.product.images[0].startsWith("/")
                              ? `http://localhost:4000${item.product.images[0]}`
                              : item.product.images[0]
                          }
                          alt={item.product.name}
                          className="h-16 w-16 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.price)} each
                      </p>
                      <p className="text-sm text-gray-500">
                        Total:{" "}
                        {formatCurrency(parseFloat(item.price) * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(orderDetails.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-base font-medium">Total</span>
                <span className="text-xl font-bold">
                  {formatCurrency(orderDetails.totalAmount)}
                </span>
              </div>
            </div>

            {/* Shipping information - this could be real or placeholder */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900">
                Shipping Information
              </h4>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-gray-500">Shipping Address</div>
                  <div className="mt-1 text-sm">
                    <p className="font-medium">Home Address</p>
                    <p>123 Main Street</p>
                    <p>Anytown, ST 12345</p>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    Estimated Delivery
                  </div>
                  <div className="mt-1 text-sm">
                    {orderDetails.status === "DELIVERED" ? (
                      <p className="font-medium text-green-600">Delivered</p>
                    ) : orderDetails.status === "SHIPPED" ? (
                      <p className="font-medium">
                        {new Date(
                          new Date(orderDetails.updatedAt).getTime() +
                            5 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                    ) : orderDetails.status === "PROCESSING" ? (
                      <p className="font-medium">Processing</p>
                    ) : orderDetails.status === "CANCELLED" ? (
                      <p className="font-medium text-red-600">Cancelled</p>
                    ) : (
                      <p className="font-medium text-yellow-600">
                        Pending Payment
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p>No order details available</p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default OrdersPage;
