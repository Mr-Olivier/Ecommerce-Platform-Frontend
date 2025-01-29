// src/components/common/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-800/80"
            : "bg-white dark:bg-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  EStore
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group ${
                    isActivePath(item.href)
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActivePath(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-40 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 focus:w-60"
                />
                <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <Link
                to="/wishlist"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Link>

              <Link
                to="/cart"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Link>

              <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />

              {/* Sign In/Sign Up for large screens */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActivePath(item.href)
                      ? "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              {/* Sign In/Sign Up for mobile */}
              <div className="px-3 pt-2 flex space-x-4">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2 text-gray-600 hover:text-primary-600 font-medium border border-gray-300 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;

// // src/components/common/Navbar.tsx
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   ShoppingCart,
//   User,
//   Search,
//   Heart,
//   LogIn,
//   ChevronDown,
//   MessageSquare,
//   Bell,
//   HelpCircle,
//   ShoppingBag,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useAuth } from "../../context/AuthContext";
// import Dropdown from "./Dropdown";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const { user, logout } = useAuth();

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navigation = [
//     { name: "Home", href: "/" },
//     { name: "Products", href: "/products" },
//     { name: "Categories", href: "/categories" },
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ];

//   const isActivePath = (path: string) => {
//     if (path === "/" && location.pathname !== "/") {
//       return false;
//     }
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <>
//       {/* Top bar */}
//       <div className="bg-gray-100 dark:bg-gray-900 py-1 text-sm hidden md:block">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Link
//                 to="/help"
//                 className="text-gray-600 dark:text-gray-400 hover:text-primary-600 flex items-center gap-1"
//               >
//                 <HelpCircle className="h-4 w-4" />
//                 Help Center
//               </Link>
//               <Link
//                 to="/messages"
//                 className="text-gray-600 dark:text-gray-400 hover:text-primary-600 flex items-center gap-1"
//               >
//                 <MessageSquare className="h-4 w-4" />
//                 Messages
//               </Link>
//             </div>

//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <Dropdown
//                   trigger={
//                     <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600">
//                       <User className="h-4 w-4" />
//                       <span>{user.firstName}</span>
//                       <ChevronDown className="h-4 w-4" />
//                     </button>
//                   }
//                 >
//                   <Link
//                     to="/user/profile"
//                     className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Profile
//                   </Link>
//                   <Link
//                     to="/user/orders"
//                     className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Orders
//                   </Link>
//                   <button
//                     onClick={logout}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Sign Out
//                   </button>
//                 </Dropdown>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     to="/login"
//                     className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav
//         className={`sticky top-0 w-full z-50 transition-all duration-300 ${
//           isScrolled
//             ? "bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-800/80"
//             : "bg-white dark:bg-gray-800"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="flex items-center space-x-2">
//                 <ShoppingBag className="h-8 w-8 text-primary-600" />
//                 <span className="text-2xl font-bold text-gray-900 dark:text-white">
//                   EStore
//                 </span>
//               </Link>
//             </div>

//             {/* Search Bar */}
//             <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   placeholder="Search products, brands and categories..."
//                   className="w-full h-10 px-4 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 />
//                 <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
//                   Search
//                 </button>
//               </div>
//             </div>

//             {/* Action Icons */}
//             <div className="hidden md:flex items-center space-x-6">
//               <Link
//                 to="/wishlist"
//                 className="flex flex-col items-center text-gray-600 hover:text-primary-600"
//               >
//                 <div className="relative">
//                   <Heart className="h-6 w-6" />
//                   <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     0
//                   </span>
//                 </div>
//                 <span className="text-xs mt-1">Wishlist</span>
//               </Link>

//               <Link
//                 to="/cart"
//                 className="flex flex-col items-center text-gray-600 hover:text-primary-600"
//               >
//                 <div className="relative">
//                   <ShoppingCart className="h-6 w-6" />
//                   <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     0
//                   </span>
//                 </div>
//                 <span className="text-xs mt-1">Cart</span>
//               </Link>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//               >
//                 {isMenuOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="hidden md:block border-t border-gray-200 dark:border-gray-700">
//             <div className="flex space-x-8 py-3">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`${
//                     isActivePath(item.href)
//                       ? "text-primary-600"
//                       : "text-gray-600 hover:text-primary-600"
//                   } relative group`}
//                 >
//                   {item.name}
//                   {isActivePath(item.href) && (
//                     <motion.div
//                       layoutId="activeTab"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
//                     />
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`${
//                     isActivePath(item.href)
//                       ? "bg-primary-50 text-primary-600"
//                       : "text-gray-600 hover:bg-gray-50"
//                   } block px-3 py-2 rounded-md text-base font-medium`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <div className="px-2 space-y-1">
//                 {!user ? (
//                   <>
//                     <Link
//                       to="/login"
//                       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/profile"
//                       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Orders
//                     </Link>
//                     <button
//                       onClick={() => {
//                         logout();
//                         setIsMenuOpen(false);
//                       }}
//                       className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
//                     >
//                       Sign Out
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </nav>

//       {/* Category Bar - Optional */}
//       <div className="hidden md:block bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8 py-3">
//             <Dropdown
//               trigger={
//                 <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600">
//                   <span>All Categories</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//               }
//             >
//               <div className="py-1">
//                 <Link
//                   to="/categories/electronics"
//                   className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   Electronics
//                 </Link>
//                 <Link
//                   to="/categories/fashion"
//                   className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   Fashion
//                 </Link>
//                 <Link
//                   to="/categories/home"
//                   className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   Home & Garden
//                 </Link>
//                 {/* Add more categories as needed */}
//               </div>
//             </Dropdown>

//             {/* Popular Categories */}
//             <Link
//               to="/categories/electronics"
//               className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
//             >
//               Electronics
//             </Link>
//             <Link
//               to="/categories/fashion"
//               className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
//             >
//               Fashion
//             </Link>
//             <Link
//               to="/categories/home"
//               className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
//             >
//               Home & Garden
//             </Link>
//             {/* Add more popular categories */}
//           </div>
//         </div>
//       </div>

//       {/* Spacer for fixed navbar */}
//       <div className="h-16 md:h-32" />
//     </>
//   );
// };

// export default Navbar;
