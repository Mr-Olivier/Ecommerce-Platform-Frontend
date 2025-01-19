import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">E-Commerce Admin Dashboard</h1>
          <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-lg p-4">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Dashboard Overview
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Manage Products
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Manage Orders
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Manage Users
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Reports
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>

          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Total Sales</h3>
              <p className="text-gray-600 mt-2">$12,345</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Total Products</h3>
              <p className="text-gray-600 mt-2">500</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Total Orders</h3>
              <p className="text-gray-600 mt-2">1,230</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Total Users</h3>
              <p className="text-gray-600 mt-2">3,456</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <table className="w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">#98765</td>
                  <td className="p-4">John Doe</td>
                  <td className="p-4 text-green-500">Completed</td>
                  <td className="p-4">$250.00</td>
                  <td className="p-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4">#98766</td>
                  <td className="p-4">Jane Smith</td>
                  <td className="p-4 text-yellow-500">Pending</td>
                  <td className="p-4">$120.00</td>
                  <td className="p-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
