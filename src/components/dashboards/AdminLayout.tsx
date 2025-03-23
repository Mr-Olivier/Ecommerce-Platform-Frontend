import { useState, useRef, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
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
  Bell,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowLeftFromLine,
} from "lucide-react";

const AdminLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Get auth token from localStorage
      const token = localStorage.getItem("token");

      // Call logout API
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Logout successful:", data);

        // Clear authentication data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Dispatch auth state change event
        window.dispatchEvent(new Event("auth-state-changed"));

        // Redirect to login page
        navigate("/login");
      } else {
        console.error("Logout failed:", data);
        alert("Logout failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

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
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white transition-all duration-300 transform border-r border-gray-200
          ${isSidebarCollapsed ? "w-20" : "w-64"} 
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/admin" className="flex items-center flex-shrink-0">
            {!isSidebarCollapsed ? (
              <span className="text-xl font-bold text-primary-600">
                EStore Admin
              </span>
            ) : (
              <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-white font-bold">
                E
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:block p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col h-full overflow-y-auto py-4">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-3 rounded-lg transition-colors font-medium
                    ${
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    }
                  `}
                >
                  <item.icon
                    className={`
                    h-5 w-5 flex-shrink-0 
                    ${isActive ? "text-primary-600" : "text-gray-400"}
                  `}
                  />
                  {!isSidebarCollapsed && (
                    <span className="ml-3 text-sm">{item.name}</span>
                  )}
                  {isSidebarCollapsed && isActive && (
                    <span className="absolute left-0 h-8 w-1 bg-primary-600 rounded-r-md"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="px-2 mt-4 border-t border-gray-200 pt-4">
            <Link
              to="/admin/settings"
              className="flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary-600"
            >
              <Settings className="h-5 w-5 text-gray-400" />
              {!isSidebarCollapsed && (
                <span className="ml-3 text-sm font-medium">Settings</span>
              )}
            </Link>

            {/* Add LeftDash link here */}
            <Link
              to="/"
              className="flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary-600"
            >
              <ArrowLeftFromLine className="h-5 w-5 text-gray-400" />
              {!isSidebarCollapsed && (
                <span className="ml-3 text-sm font-medium">LeftDash</span>
              )}
            </Link>

            {/* Logout button with API integration */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full mt-1 flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <div className="h-5 w-5 text-gray-400 animate-spin rounded-full border-2 border-t-red-600 border-r-red-600 border-b-gray-300 border-l-gray-300" />
              ) : (
                <LogOut className="h-5 w-5 text-gray-400" />
              )}
              {!isSidebarCollapsed && (
                <span className="ml-3 text-sm font-medium">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
        flex-1 transition-all duration-300
        ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
      `}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search */}
            <div className="hidden md:block flex-1 max-w-md mx-auto lg:mx-0 lg:max-w-xs xl:max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="hidden md:flex items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Admin User
                    </span>
                    <ChevronDown
                      className={`ml-1 h-4 w-4 text-gray-500 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200 z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Users className="h-4 w-4 mr-3 text-gray-400" />
                      Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3 text-gray-400" />
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? (
                        <div className="h-4 w-4 mr-3 animate-spin rounded-full border-2 border-t-red-600 border-r-red-600 border-b-gray-300 border-l-gray-300" />
                      ) : (
                        <LogOut className="h-4 w-4 mr-3" />
                      )}
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Add this import
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default AdminLayout;
