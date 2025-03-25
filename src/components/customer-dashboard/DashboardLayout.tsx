// import React, { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// // Icons - Import from your icons directory or use a library like heroicons
// const HomeIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//   </svg>
// );

// const OrdersIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const ProfileIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const AddressIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const PaymentIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
//     <path
//       fillRule="evenodd"
//       d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const WishlistIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const ReviewsIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//     <path
//       fillRule="evenodd"
//       d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// interface DashboardLayoutProps {
//   children: React.ReactNode;
//   title: string;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({
//   children,
//   title,
// }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navigation = [
//     {
//       name: "Dashboard",
//       href: "/customer/dashboard",
//       icon: HomeIcon,
//       current: location.pathname === "/customer/dashboard",
//     },
//     {
//       name: "Orders",
//       href: "/customer/orders",
//       icon: OrdersIcon,
//       current: location.pathname === "/customer/orders",
//     },
//     {
//       name: "Account",
//       href: "/customer/account",
//       icon: ProfileIcon,
//       current: location.pathname === "/customer/account",
//     },
//     {
//       name: "Addresses",
//       href: "/customer/addresses",
//       icon: AddressIcon,
//       current: location.pathname === "/customer/addresses",
//     },
//     {
//       name: "Payment Methods",
//       href: "/customer/payment-methods",
//       icon: PaymentIcon,
//       current: location.pathname === "/customer/payment-methods",
//     },
//     {
//       name: "Wishlist",
//       href: "/customer/wishlist",
//       icon: WishlistIcon,
//       current: location.pathname === "/customer/wishlist",
//     },
//     {
//       name: "Reviews",
//       href: "/customer/reviews",
//       icon: ReviewsIcon,
//       current: location.pathname === "/customer/reviews",
//     },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate("/auth/login");
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-gray-900">
//             You need to be logged in to view this page
//           </h2>
//           <p className="mt-2 text-gray-600">
//             Please login to access your dashboard
//           </p>
//           <div className="mt-5">
//             <Link
//               to="/auth/login"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Go to Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Mobile menu button */}
//       <div className="lg:hidden fixed z-20 top-4 left-4">
//         <button
//           type="button"
//           className="bg-white p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <span className="sr-only">Open menu</span>
//           {isMobileMenuOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         ></div>
//       )}

//       <div
//         className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 lg:translate-x-0 ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="px-4 py-6 border-b border-gray-200">
//             <Link to="/" className="flex items-center">
//               <img src="/your-logo.svg" alt="Logo" className="h-8 w-auto" />
//               <span className="ml-2 text-xl font-bold text-gray-900">
//                 YourStore
//               </span>
//             </Link>
//           </div>
//           <div className="flex-1 overflow-y-auto py-4">
//             <nav className="px-2 space-y-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`${
//                     item.current
//                       ? "bg-indigo-50 text-indigo-700"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                   } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
//                 >
//                   <item.icon />
//                   <span className="ml-3">{item.name}</span>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//           <div className="p-4 border-t border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
//                   {user?.name?.charAt(0) || "U"}
//                 </div>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">
//                   {user?.name || "User"}
//                 </p>
//                 <button
//                   onClick={handleLogout}
//                   className="text-xs font-medium text-gray-500 hover:text-gray-700"
//                 >
//                   Sign out
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           <header className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
//           </header>
//           <main>{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import {
  Home,
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  Heart,
  Star,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  ChevronRight,
  ArrowLeft,
  ChevronDown,
  Eye,
  EyeOff,
  Save,
  Key,
  UserCircle,
  Mail,
  Phone,
} from "lucide-react";

// Define User type with an optional phoneNumber property
interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
}

// Define profile forms state types
interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  showProfileForm?: boolean;
  showPasswordForm?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  showProfileForm = false,
  showPasswordForm = false,
}) => {
  // DEVELOPMENT MODE: Create a mock user for development purposes
  const isDevelopment = process.env.NODE_ENV === "development";

  // Use the real auth hook
  const authContext = useAuth();

  // Create a development version that always has a user
  const mockUser: ExtendedUser = {
    id: "dev-user",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
    phoneNumber: "",
  };

  // Use either the real user or the mock user in development
  const user = isDevelopment
    ? (authContext.user as ExtendedUser | null) || mockUser
    : (authContext.user as ExtendedUser | null);
  const logout = authContext.logout;

  // Form states
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // We're keeping this even though it's not being used (to avoid changing functionality)

  const location = useLocation();

  // Update user form data when user changes (useful after profile updates)
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Cast event.target to Element to use closest method
      const target = event.target as Element;

      // Check if target exists and if it doesn't have user-menu-container as parent
      if (userMenuOpen && target && !target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const navigation = [
    {
      name: "Dashboard",
      href: "/customer/dashboard",
      icon: Home,
      current: location.pathname === "/customer/dashboard",
    },
    {
      name: "Orders",
      href: "/customer/orders",
      icon: ShoppingBag,
      current: location.pathname === "/customer/orders",
    },
    {
      name: "Account",
      href: "/customer/account",
      icon: User,
      current: location.pathname === "/customer/account",
    },
    {
      name: "Addresses",
      href: "/customer/addresses",
      icon: MapPin,
      current: location.pathname === "/customer/addresses",
    },
    {
      name: "Payment Methods",
      href: "/customer/payment-methods",
      icon: CreditCard,
      current: location.pathname === "/customer/payment-methods",
    },
    {
      name: "Wishlist",
      href: "/customer/wishlist",
      icon: Heart,
      current: location.pathname === "/customer/wishlist",
    },
    {
      name: "Reviews",
      href: "/customer/reviews",
      icon: Star,
      current: location.pathname === "/customer/reviews",
    },
  ];

  const handleLogout = async () => {
    try {
      console.log("Logout clicked");
      setIsLoggingOut(true);

      // Call the logout API
      await axios
        .post("http://localhost:4000/api/auth/logout")
        .then(() => {
          console.log("Logout API call successful");
          logout(); // Local auth state update

          // Use window.location.href for direct navigation
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Error during logout API call:", error);
          // Still log out locally even if API fails
          logout();
          window.location.href = "/login"; // Fallback direct navigation
        });
    } catch (error: unknown) {
      console.error("Error in handleLogout function:", error);
      // Force logout and navigation
      logout();
      window.location.href = "/login";
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Update profile API call
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");
    setUpdatingProfile(true);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    try {
      // Change from POST to PATCH to match your backend
      const response = await axios.patch(
        "http://localhost:4000/api/users/profile",
        {
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          email: profileForm.email,
          phoneNumber: profileForm.phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include auth token
          },
        }
      );

      console.log("Profile update response:", response.data);
      setProfileSuccess("Profile updated successfully!");
    } catch (error: unknown) {
      console.error("Profile update error:", error);
      setProfileError(
        error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to update profile. Please try again."
      );
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Change password API call
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    setChangingPassword(true);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/change-password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include auth token
          },
        }
      );

      console.log("Password change response:", response.data);
      setPasswordSuccess("Password changed successfully!");

      // Reset form after success
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      console.error("Password change error:", error);
      setPasswordError(
        error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to change password. Please verify your current password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // In development, always show the dashboard
  // In production, show the login screen if not logged in
  if (!user && !isDevelopment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            You need to be logged in to view this page
          </h2>
          <p className="mt-2 text-gray-600">
            Please login to access your dashboard
          </p>
          <div className="mt-5">
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show a development mode banner when using the mock user
  const showDevBanner = isDevelopment && !authContext.user;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Development mode banner */}
      {showDevBanner && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center">
          <p className="text-sm font-medium">
            Development Mode: Using mock user data
          </p>
        </div>
      )}

      {/* Top navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow h-16 lg:pl-64">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Left side with mobile menu button and back to home */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo for mobile */}
            <div className="lg:hidden font-bold text-xl text-indigo-600">
              YourStore
            </div>

            {/* Back to store link */}
            <a
              href="/"
              className="hidden lg:flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => console.log("Back to Store clicked (navbar)")}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Back to Store</span>
            </a>
          </div>

          {/* Page title - shown on larger screens */}
          <div className="hidden md:block flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          </div>

          {/* Right side with notifications and profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-600 relative"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Mobile back to store */}
            <a
              href="/"
              className="md:hidden flex items-center text-gray-700 p-1 hover:text-indigo-600 transition-colors"
              onClick={() => console.log("Home icon clicked (mobile)")}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </a>

            {/* User menu dropdown */}
            <div className="relative user-menu-container">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="hidden sm:flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 mr-1">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex sm:hidden">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>
              </button>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {user?.email}
                    </p>
                  </div>

                  <a
                    href="/customer/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      console.log("Profile clicked");
                      setUserMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Your Profile
                    </div>
                  </a>

                  <a
                    href="/customer/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      console.log("Settings clicked");
                      setUserMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-gray-500" />
                      Settings
                    </div>
                  </a>

                  <a
                    href="/customer/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      console.log("Orders clicked");
                      setUserMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-gray-500" />
                      Orders
                    </div>
                  </a>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        {isLoggingOut ? "Signing out..." : "Sign out"}
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform ease-in-out duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <a
              href="/"
              className="flex items-center"
              onClick={() => console.log("Logo clicked")}
            >
              <span className="text-xl font-bold text-indigo-600">
                YourStore
              </span>
            </a>
          </div>

          {/* User Profile */}
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">{getGreeting()},</div>
                <div className="text-base font-medium text-gray-800">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 truncate">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-2">
            <nav className="px-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? "bg-indigo-50 text-indigo-700 font-medium border-l-4 border-indigo-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                  } group flex items-center justify-between px-3 py-3 text-sm rounded-r-md transition-all duration-200`}
                  onClick={() => {
                    console.log(`${item.name} clicked`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-500 group-hover:text-gray-600"
                      }`}
                    />
                    {item.name}
                  </div>
                  {item.current && (
                    <ChevronRight className="h-4 w-4 text-indigo-600" />
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2 text-gray-500" />
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>

            {/* Store link for mobile - at the bottom of sidebar */}
            <a
              href="/"
              className="mt-3 flex items-center justify-center w-full px-4 py-2.5 border border-indigo-600 bg-indigo-600 text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={() => console.log("Back to Store clicked (sidebar)")}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Store
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile title */}
          <header className="mb-6 block md:hidden">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </header>

          {/* Back to store link for mobile - shown at the top of content */}
          <div className="mb-6 block md:hidden">
            <a
              href="/"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
              onClick={() =>
                console.log("Back to Store clicked (mobile content)")
              }
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Store
            </a>
          </div>

          {/* Profile Form */}
          {showProfileForm && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Update Profile
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your account information
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-6">
                {/* Success and error messages */}
                {profileSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                    {profileSuccess}
                  </div>
                )}

                {profileError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {profileError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profileForm.firstName}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profileForm.lastName}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {updatingProfile ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Password Form */}
          {showPasswordForm && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Change Password
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your password to keep your account secure
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="p-6">
                {/* Success and error messages */}
                {passwordSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                    {passwordSuccess}
                  </div>
                )}

                {passwordError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {passwordError}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long with
                      uppercase, lowercase letters, and numbers.
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Key className="mr-2 h-4 w-4" />
                    {changingPassword ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Main content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
