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

import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Icons - Import from your icons directory or use a library like heroicons
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const OrdersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
      clipRule="evenodd"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const AddressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const PaymentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
    <path
      fillRule="evenodd"
      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
      clipRule="evenodd"
    />
  </svg>
);

const WishlistIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const ReviewsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
}) => {
  // DEVELOPMENT MODE: Create a mock user for development purposes
  // This allows you to see the dashboard without being logged in
  const isDevelopment = process.env.NODE_ENV === "development";

  // Use the real auth hook
  const authContext = useAuth();

  // Create a development version that always has a user
  const mockUser = {
    id: "dev-user",
    name: "Development User",
    email: "dev@example.com",
    role: "customer",
  };

  // Use either the real user or the mock user in development
  const user = isDevelopment ? authContext.user || mockUser : authContext.user;
  const logout = authContext.logout;

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/customer/dashboard",
      icon: HomeIcon,
      current: location.pathname === "/customer/dashboard",
    },
    {
      name: "Orders",
      href: "/customer/orders",
      icon: OrdersIcon,
      current: location.pathname === "/customer/orders",
    },
    {
      name: "Account",
      href: "/customer/account",
      icon: ProfileIcon,
      current: location.pathname === "/customer/account",
    },
    {
      name: "Addresses",
      href: "/customer/addresses",
      icon: AddressIcon,
      current: location.pathname === "/customer/addresses",
    },
    {
      name: "Payment Methods",
      href: "/customer/payment-methods",
      icon: PaymentIcon,
      current: location.pathname === "/customer/payment-methods",
    },
    {
      name: "Wishlist",
      href: "/customer/wishlist",
      icon: WishlistIcon,
      current: location.pathname === "/customer/wishlist",
    },
    {
      name: "Reviews",
      href: "/customer/reviews",
      icon: ReviewsIcon,
      current: location.pathname === "/customer/reviews",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
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
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Login
            </Link>
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

      {/* Mobile menu button */}
      <div className="lg:hidden fixed z-20 top-4 left-4">
        <button
          type="button"
          className="bg-white p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              <img src="/your-logo.svg" alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                YourStore
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon />
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "User"}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
