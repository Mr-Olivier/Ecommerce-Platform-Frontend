import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">E-Commerce Dashboard 1</h1>
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
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Account Settings
              </a>
            </li>
            <li>
              <a href="#" className="block text-blue-600 hover:underline">
                Support
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, [Customer Name]!</h2>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Total Orders</h3>
              <p className="text-gray-600 mt-2">25</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Pending Orders</h3>
              <p className="text-gray-600 mt-2">5</p>
            </div>
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Total Spent</h3>
              <p className="text-gray-600 mt-2">$5,200</p>
            </div>
          </div>

          {/* Order History */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Order History</h3>
            <table className="w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">#12345</td>
                  <td className="p-4">2025-01-01</td>
                  <td className="p-4 text-green-500">Completed</td>
                  <td className="p-4">$120.00</td>
                </tr>
                <tr>
                  <td className="p-4">#12346</td>
                  <td className="p-4">2025-01-10</td>
                  <td className="p-4 text-yellow-500">Pending</td>
                  <td className="p-4">$45.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
