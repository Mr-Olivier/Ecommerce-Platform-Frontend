// src/pages/admin/index.tsx
import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  Users,
  ArrowUp,
  ArrowDown,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "../../components/dashboards/AdminLayout";

const AdminDashboard = () => {
  // Sample data - replace with real data from your backend
  const stats = [
    {
      name: "Total Revenue",
      value: "$24,563",
      change: "+2.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      name: "Total Orders",
      value: "452",
      change: "+5.2%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      name: "Total Customers",
      value: "2,342",
      change: "-0.5%",
      trend: "down",
      icon: Users,
    },
    {
      name: "Conversion Rate",
      value: "3.2%",
      change: "+1.2%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    {
      id: "1",
      customer: "John Doe",
      product: "iPhone 13 Pro",
      amount: "$999",
      status: "completed",
      date: "2024-01-27",
    },
    // Add more orders...
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={`ml-2 text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
