// src/pages/admin/orders.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Eye,
  Edit,
  ChevronDown,
  ChevronUp,
  Download,
  Loader,
  AlertCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Adjust import path as needed
import Modal from "../../components/common/Modal";
import * as XLSX from "xlsx";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

interface OrderUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Order {
  id: string;
  userId: string;
  totalAmount: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  user: OrderUser;
  items: OrderItem[];
}

interface PaginationInfo {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface OrdersResponse {
  status: string;
  data: {
    orders: Order[];
    pagination: PaginationInfo;
  };
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pages: 1,
    limit: 10,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth(); // Use your existing auth context

  // In your order management component, update the user role check
  useEffect(() => {
    // Get user directly from storage, bypassing useAuth hook
    const storedUserStr =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");

    if (!storedUserStr || !token) {
      navigate("/login", { state: { from: "/admin/orders" } });
      return;
    }

    try {
      const storedUser = JSON.parse(storedUserStr);
      console.log("Using directly stored user:", storedUser);

      // Check role with case-insensitive comparison to handle different formats
      const userRole = storedUser.role?.toUpperCase();
      if (userRole !== "ADMIN") {
        navigate("/customer/dashboard");
        return;
      }

      setAuthChecked(true);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  // Function to update order status
  // const handleStatusChange = async (
  //   orderId: string,
  //   newStatus: Order["status"]
  // ) => {
  //   try {
  //     const token =
  //       localStorage.getItem("auth_token") ||
  //       sessionStorage.getItem("auth_token");
  //     if (!token) {
  //       setError("Authentication required");
  //       return;
  //     }

  //     // Use the proper status update endpoint
  //     await axios.patch(
  //       `http://localhost:4000/api/orders/${orderId}/status`,
  //       { status: newStatus },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Update locally after successful backend update
  //     const updatedOrders = orders.map((order) =>
  //       order.id === orderId ? { ...order, status: newStatus } : order
  //     );
  //     setOrders(updatedOrders);

  //     if (selectedOrder && selectedOrder.id === orderId) {
  //       setSelectedOrder({ ...selectedOrder, status: newStatus });
  //     }
  //   } catch (err: any) {
  //     console.error("Error updating order status:", err);
  //     setError(
  //       `Failed to update order status: ${
  //         err.response?.data?.message || err.message || "Please try again."
  //       }`
  //     );
  //   }
  // };

  // Function to cancel an order
  // const handleCancelOrder = async (orderId: string) => {
  //   try {
  //     const token =
  //       localStorage.getItem("auth_token") ||
  //       sessionStorage.getItem("auth_token");

  //     if (!token) {
  //       setError("Authentication required to cancel order");
  //       return;
  //     }

  //     // Log request details for debugging
  //     console.log("Attempting to cancel order:", orderId);
  //     console.log(
  //       "Using token:",
  //       token ? `${token.substring(0, 10)}...` : "missing"
  //     );

  //     // Make the cancel request with proper authentication
  //     const response = await axios.patch(
  //       `http://localhost:4000/api/orders/${orderId}/cancel`,
  //       {}, // Empty body
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(
  //       "Cancel order response:",
  //       response.status,
  //       response.statusText
  //     );

  //     // Update UI after successful cancel
  //     const updatedOrders = orders.map((order) =>
  //       order.id === orderId ? { ...order, status: "CANCELLED" } : order
  //     );
  //     setOrders(updatedOrders);

  //     if (selectedOrder && selectedOrder.id === orderId) {
  //       setSelectedOrder({ ...selectedOrder, status: "CANCELLED" });
  //     }

  //     // Show success message
  //     setError(null); // Clear any previous errors
  //   } catch (err: any) {
  //     console.error("Error cancelling order:", err);

  //     // Detailed error logging
  //     if (err.response) {
  //       console.error("Response status:", err.response.status);
  //       console.error("Response data:", err.response.data);

  //       // Handle specific error cases
  //       if (err.response.status === 403) {
  //         setError(
  //           "You don't have permission to cancel this order. Only admins or the order owner can cancel orders."
  //         );
  //       } else if (err.response.status === 401) {
  //         setError(
  //           "Your session has expired. Please log in again to cancel the order."
  //         );
  //         // Optionally redirect to login
  //         // navigate('/login', { state: { from: '/admin/orders' } });
  //       } else {
  //         setError(
  //           `Failed to cancel order: ${
  //             err.response?.data?.message || "Access denied"
  //           }. ${err.response?.data?.error || ""}`
  //         );
  //       }
  //     } else if (err.request) {
  //       // Request was made but no response received
  //       setError(
  //         "No response received from server. Please check your connection and try again."
  //       );
  //     } else {
  //       // Error setting up the request
  //       setError(`Failed to cancel order: ${err.message}`);
  //     }
  //   }
  // };
  // Add this function inside your OrderManagement component
  // It will help ensure orders have proper status based on creation date

  const ensureProperOrderStatus = (orders: Order[]): Order[] => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    return orders.map((order) => {
      const orderDate = new Date(order.createdAt);
      const daysSinceCreated = Math.floor(
        (now.getTime() - orderDate.getTime()) / oneDay
      );

      // If the order was just created (less than 1 day old), make sure it's PENDING
      // unless it's already CANCELLED
      if (daysSinceCreated < 1 && order.status !== "CANCELLED") {
        return { ...order, status: "PENDING" as Order["status"] };
      }

      // Don't override CANCELLED status
      if (order.status === "CANCELLED") {
        return order;
      }

      // For demo purposes:
      // - Orders 1-2 days old should be PROCESSING if they're still PENDING
      // - Orders 2-5 days old should be SHIPPED if they're still PROCESSING
      // - Orders 5+ days old should be DELIVERED if they're still SHIPPED

      if (
        daysSinceCreated >= 1 &&
        daysSinceCreated < 2 &&
        order.status === "PENDING"
      ) {
        return { ...order, status: "PROCESSING" as Order["status"] };
      } else if (
        daysSinceCreated >= 2 &&
        daysSinceCreated < 5 &&
        order.status === "PROCESSING"
      ) {
        return { ...order, status: "SHIPPED" as Order["status"] };
      } else if (daysSinceCreated >= 5 && order.status === "SHIPPED") {
        return { ...order, status: "DELIVERED" as Order["status"] };
      }

      return order;
    });
  };

  const fetchOrders = async () => {
    if (!authChecked) return;

    setLoading(true);
    setError(null);
    try {
      // Get token from the same storage used in login form
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");

      if (!token) {
        setError("Authentication required - No token found");
        setLoading(false);
        return;
      }

      console.log("Current user:", user);
      console.log("Token (first few chars):", token.substring(0, 15) + "...");

      // Only add status if filter is not "all"
      let apiUrl = `http://localhost:4000/api/orders/admin/all?page=${pagination.page}&limit=${pagination.limit}`;
      if (filterStatus !== "all") {
        apiUrl += `&status=${filterStatus}`;
      }

      console.log("Fetching from API:", apiUrl);

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log(
        "Using auth header:",
        headers["Authorization"].substring(0, 15) + "..."
      );

      const response = await axios.get<OrdersResponse>(apiUrl, { headers });

      console.log("API Response:", response.status, response.statusText);

      // Apply the status helper function to ensure proper status flow
      const processedOrders = ensureProperOrderStatus(
        response.data.data.orders
      );
      setOrders(processedOrders);
      setPagination(response.data.data.pagination);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);

      if (err.response?.status === 401 || err.response?.status === 403) {
        const serverErrorMsg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Authentication failed";
        setError(
          `Authorization error: ${serverErrorMsg}. Please check your admin credentials.`
        );

        if (err.response?.status === 401) {
          console.log(
            "Unauthorized - Token might be expired. Try logging out and back in."
          );
        }
      } else {
        setError(
          `Failed to fetch orders: ${
            err.response?.data?.message || err.message || "Please try again."
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authChecked) {
      fetchOrders();
    }
  }, [filterStatus, pagination.page, pagination.limit, authChecked]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real implementation, you might want to debounce this
    // and send the search query to the backend
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page when changing filters
  };

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication required");
        return;
      }

      // Use the proper status update endpoint for admins
      await axios.patch(
        `http://localhost:4000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update locally after successful backend update
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus as Order["status"] }
          : order
      );
      setOrders(updatedOrders);

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err: any) {
      console.error("Error updating order status:", err);
      setError(
        `Failed to update order status: ${
          err.response?.data?.message || err.message || "Please try again."
        }`
      );
    }
  };

  // Admin function to cancel an order
  const handleAdminCancelOrder = async (orderId: string) => {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication required");
        return;
      }

      // Use the admin status update endpoint to cancel the order
      await axios.patch(
        `http://localhost:4000/api/orders/${orderId}/status`,
        { status: "CANCELLED" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update UI after successful cancellation
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? { ...order, status: "CANCELLED" as Order["status"] }
          : order
      );
      setOrders(updatedOrders);

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: "CANCELLED" });
      }

      // Show success notification
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error("Error cancelling order:", err);
      setError(
        `Failed to cancel order: ${
          err.response?.data?.message || "An error occurred"
        }`
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleExportOrders = async () => {
    setIsExporting(true);
    try {
      const token =
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication required");
        setIsExporting(false);
        return;
      }

      // Fetch all orders for export (optional - can use a specific export endpoint if available)
      const response = await axios.get<OrdersResponse>(
        `http://localhost:4000/api/orders/admin/all?limit=1000`, // Get more orders for export
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const ordersToExport = response.data.data.orders || orders;

      // Format the data for export
      const exportData = ordersToExport.map((order) => ({
        "Order ID": order.id,
        "Customer Name": `${order.user.firstName} ${order.user.lastName}`,
        "Customer Email": order.user.email,
        "Order Date": new Date(order.createdAt).toLocaleDateString(),
        "Total Amount": `$${parseFloat(order.totalAmount).toFixed(2)}`,
        Status: order.status,
        "Items Count": order.items.length,
        Products: order.items.map((item) => item.product.name).join(", "),
        "Last Updated": new Date(order.updatedAt).toLocaleDateString(),
      }));

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 40 }, // Order ID
        { wch: 20 }, // Customer Name
        { wch: 30 }, // Customer Email
        { wch: 15 }, // Order Date
        { wch: 15 }, // Total Amount
        { wch: 15 }, // Status
        { wch: 10 }, // Items Count
        { wch: 40 }, // Products
        { wch: 15 }, // Last Updated
      ];
      worksheet["!cols"] = colWidths;

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

      // Generate the Excel file
      XLSX.writeFile(
        workbook,
        `Orders_Export_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (err: any) {
      console.error("Error exporting orders:", err);
      setError(
        `Failed to export orders: ${
          err.response?.data?.message || err.message || "Please try again."
        }`
      );
    } finally {
      setIsExporting(false);
    }
  };

  // Filtered orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort orders if sort configuration is set
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let valueA, valueB;

    // Handle nested properties
    if (key === "customer") {
      valueA = `${a.user.firstName} ${a.user.lastName}`.toLowerCase();
      valueB = `${b.user.firstName} ${b.user.lastName}`.toLowerCase();
    } else if (key === "date") {
      valueA = new Date(a.createdAt).getTime();
      valueB = new Date(b.createdAt).getTime();
    } else if (key === "total") {
      valueA = parseFloat(a.totalAmount);
      valueB = parseFloat(b.totalAmount);
    } else if (key in a) {
      valueA = (a as any)[key];
      valueB = (b as any)[key];
    } else {
      return 0;
    }

    if (valueA < valueB) return direction === "ascending" ? -1 : 1;
    if (valueA > valueB) return direction === "ascending" ? 1 : -1;
    return 0;
  });

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const formatCurrency = (amount: string) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <button
          onClick={handleExportOrders}
          disabled={isExporting || loading || orders.length === 0}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <Loader className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Download className="h-5 w-5 mr-2" />
          )}
          Export Orders
        </button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by customer name, email, or order ID..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => handleFilter(e.target.value)}
          className="pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-start"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!authChecked && !error && (
        <div
          className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded relative flex items-center"
          role="alert"
        >
          <Loader className="h-5 w-5 mr-2 animate-spin" />
          <span className="block sm:inline">Verifying authentication...</span>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-indigo-500 animate-spin" />
            <span className="ml-2 text-gray-500">Loading orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { label: "Order ID", key: "id" },
                      { label: "Customer", key: "customer" },
                      { label: "Date", key: "date" },
                      { label: "Total", key: "total" },
                      { label: "Status", key: "status" },
                      { label: "Actions", key: null },
                    ].map((header) => (
                      <th
                        key={header.key || "actions"}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          header.key ? "cursor-pointer" : ""
                        }`}
                        onClick={() => header.key && handleSort(header.key)}
                      >
                        <div className="flex items-center">
                          {header.label}
                          {sortConfig?.key === header.key &&
                            (sortConfig.direction === "ascending" ? (
                              <ChevronUp className="h-4 w-4 ml-1" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-1" />
                            ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          {order.user.firstName} {order.user.lastName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsModalOpen(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/admin/orders/${order.id}/edit`)
                            }
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Order"
                          >
                            <Edit className="h-5 w-5" />
                          </button>

                          {order.status !== "CANCELLED" && (
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to cancel order ${order.id}?`
                                  )
                                ) {
                                  handleAdminCancelOrder(order.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                              title="Cancel Order"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )}
                    </span>{" "}
                    of <span className="font-medium">{pagination.total}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronDown className="h-5 w-5 transform rotate-90" />
                    </button>

                    {/* Page numbers */}
                    {Array.from(
                      { length: pagination.pages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pagination.page
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronDown className="h-5 w-5 transform -rotate-90" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Order {selectedOrder.id}
              </h3>
              <p className="text-sm text-gray-500">
                Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Last updated on{" "}
                {new Date(selectedOrder.updatedAt).toLocaleString()}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">
                Customer Information
              </h4>
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">
                  {selectedOrder.user.firstName} {selectedOrder.user.lastName}
                </p>
                <p>{selectedOrder.user.email}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">Order Status</h4>
              <div className="mt-2 flex items-center space-x-4">
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedOrder.id,
                      e.target.value as Order["status"]
                    )
                  }
                  disabled={selectedOrder.status === "CANCELLED"}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="PENDING">Pending</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                {selectedOrder.status !== "CANCELLED" && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to cancel order ${selectedOrder.id}?`
                        )
                      ) {
                        handleAdminCancelOrder(selectedOrder.id);
                      }
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">Order Items</h4>
              <ul className="mt-2 divide-y divide-gray-200">
                {selectedOrder.items.map((item) => (
                  <li key={item.id} className="py-3 flex items-center">
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
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-900">
                      {formatCurrency(item.price)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-base font-medium text-gray-900">
                Total Amount
              </span>
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(selectedOrder.totalAmount)}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
