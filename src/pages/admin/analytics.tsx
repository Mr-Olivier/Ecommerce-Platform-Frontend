// src/pages/admin/analytics.tsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics: React.FC = () => {
  const [salesData, setSalesData] = useState<{ name: string; sales: number }[]>(
    []
  );
  const [userActivityData, setUserActivityData] = useState<
    { name: string; value: number }[]
  >([]);
  const [productPerformanceData, setProductPerformanceData] = useState<
    { name: string; sales: number; revenue: number }[]
  >([]);

  useEffect(() => {
    // Simulating API calls to fetch analytics data
    const fetchAnalyticsData = async () => {
      // In a real application, these would be API calls
      const salesData = [
        { name: "Jan", sales: 4000 },
        { name: "Feb", sales: 3000 },
        { name: "Mar", sales: 5000 },
        { name: "Apr", sales: 4500 },
        { name: "May", sales: 6000 },
        { name: "Jun", sales: 5500 },
      ];

      const userActivityData = [
        { name: "Active Users", value: 400 },
        { name: "Inactive Users", value: 300 },
        { name: "New Signups", value: 100 },
      ];

      const productPerformanceData = [
        { name: "Product A", sales: 4000, revenue: 24000 },
        { name: "Product B", sales: 3000, revenue: 18000 },
        { name: "Product C", sales: 2000, revenue: 12000 },
        { name: "Product D", sales: 2780, revenue: 16680 },
        { name: "Product E", sales: 1890, revenue: 11340 },
      ];

      setSalesData(salesData);
      setUserActivityData(userActivityData);
      setProductPerformanceData(productPerformanceData);
    };

    fetchAnalyticsData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userActivityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {userActivityData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Product Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Sales", value: "$54,000", change: "+5.4%" },
          { title: "Average Order Value", value: "$75", change: "+2.1%" },
          { title: "Conversion Rate", value: "3.2%", change: "-0.4%" },
          { title: "Active Users", value: "1,240", change: "+10.8%" },
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">
              {metric.title}
            </h3>
            <p className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">
                {metric.value}
              </span>
              <span
                className={`ml-2 text-sm font-medium ${
                  metric.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
