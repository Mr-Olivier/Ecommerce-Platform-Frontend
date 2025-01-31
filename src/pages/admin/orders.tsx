// src/pages/admin/orders.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Edit,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import Modal from "../../components/common/Modal";

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: { name: string; quantity: number; price: number }[];
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call to fetch orders
    const sampleOrders: Order[] = [
      {
        id: "ORD001",
        customerName: "John Doe",
        orderDate: "2024-02-01",
        total: 125.99,
        status: "pending",
        items: [
          { name: "Product A", quantity: 2, price: 49.99 },
          { name: "Product B", quantity: 1, price: 26.01 },
        ],
      },
      {
        id: "ORD002",
        customerName: "Jane Smith",
        orderDate: "2024-02-02",
        total: 89.99,
        status: "shipped",
        items: [{ name: "Product C", quantity: 1, price: 89.99 }],
      },
      // Add more sample orders here
    ];
    setOrders(sampleOrders);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  const handleSort = (key: keyof Order) => {
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

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filteredAndSortedOrders = orders
    .filter(
      (order) =>
        (order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterStatus === "all" || order.status === filterStatus)
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <button
          onClick={() => {
            /* Implement export functionality */
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Orders
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search orders..."
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
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Order ID",
                "Customer",
                "Date",
                "Total",
                "Status",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleSort(
                      header.toLowerCase().replace(" ", "") as keyof Order
                    )
                  }
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig?.key ===
                      header.toLowerCase().replace(" ", "") &&
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
            {filteredAndSortedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/admin/orders/${order.id}/edit`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Order {selectedOrder.id}</h3>
              <p className="text-sm text-gray-500">
                Placed on{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Customer</h4>
              <p>{selectedOrder.customerName}</p>
            </div>
            <div>
              <h4 className="font-medium">Status</h4>
              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  handleStatusChange(
                    selectedOrder.id,
                    e.target.value as Order["status"]
                  )
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <h4 className="font-medium">Items</h4>
              <ul className="divide-y divide-gray-200">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-medium text-right">
              Total: ${selectedOrder.total.toFixed(2)}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
