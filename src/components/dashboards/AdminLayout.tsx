// src/components/dashboard/AdminLayout.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart2,
  Box,
  Tag,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
    { name: "Inventory", href: "/admin/inventory", icon: Box },
    { name: "Promotions", href: "/admin/promotions", icon: Tag },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 280 }}
            exit={{ width: 0 }}
            className="hidden md:flex md:flex-col fixed inset-y-0 bg-white shadow-lg"
          >
            {/* Sidebar Content */}
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <Link to="/admin" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary-600">
                    EStore Admin
                  </span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 mr-3 ${
                          isActive ? "text-primary-600" : "text-gray-400"
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Section */}
              <div className="border-t p-4">
                <Link
                  to="/admin/settings"
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                >
                  <Settings className="h-5 w-5 mr-3 text-gray-400" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    /* Add logout logic */
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          isSidebarOpen ? "md:ml-280" : ""
        }`}
      >
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 px-4 py-2 pl-10 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="hidden md:block font-medium text-gray-700">
                    Admin
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
