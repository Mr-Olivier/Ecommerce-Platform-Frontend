// src/pages/admin/index.tsx
import { motion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$54,230.50",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Orders",
      value: "1,345",
      change: "+5.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Customers",
      value: "2,345",
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Conversion Rate",
      value: "3.15%",
      change: "+8.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const recentOrders = [
    {
      id: "ORD001",
      customer: "John Doe",
      product: "iPhone 13 Pro",
      amount: "$999",
      status: "completed",
      date: "2024-01-29",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      product: "MacBook Air",
      amount: "$1,299",
      status: "pending",
      date: "2024-01-29",
    },
    // Add more orders as needed
  ];

  const lowStockProducts = [
    {
      id: "PRD001",
      name: "iPhone 13 Pro",
      stock: 5,
      threshold: 10,
      category: "Electronics",
    },
    {
      id: "PRD002",
      name: "AirPods Pro",
      stock: 3,
      threshold: 8,
      category: "Electronics",
    },
    // Add more products as needed
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span
                className={`flex items-center space-x-1 text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{stat.change}</span>
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <ShoppingCart className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{order.amount}</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Low Stock Alert
              </h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Package className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">
                      {product.stock} in stock
                    </p>
                    <p className="text-sm text-gray-500">
                      Threshold: {product.threshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
