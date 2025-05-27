// // src/components/common/Navbar.tsx
// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   ShoppingCart,
//   Search,
//   Heart,
//   User,
//   ChevronDown,
//   Bell,
//   LogOut,
//   Settings,
//   Gift,
//   Truck,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
//   const location = useLocation();
//   const searchRef = useRef<HTMLDivElement>(null);
//   const userMenuRef = useRef<HTMLDivElement>(null);
//   const megaMenuRef = useRef<HTMLDivElement>(null);

//   const navigation = [
//     { name: "Home", href: "/" },
//     { name: "Shop", href: "/products", hasMegaMenu: true },
//     { name: "Categories", href: "/categories" },
//     { name: "New Arrivals", href: "/new-arrivals" },
//     { name: "Sale", href: "/sale" },
//     { name: "About", href: "/about" },
//   ];

//   const categories = [
//     {
//       name: "Fashion",
//       subcategories: ["Women", "Men", "Kids", "Accessories"],
//       icon: "👚",
//     },
//     {
//       name: "Electronics",
//       subcategories: ["Phones", "Laptops", "Accessories", "Smart Home"],
//       icon: "📱",
//     },
//     {
//       name: "Home & Living",
//       subcategories: ["Furniture", "Decor", "Kitchenware", "Bedding"],
//       icon: "🏠",
//     },
//     {
//       name: "Beauty",
//       subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance"],
//       icon: "✨",
//     },
//   ];

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle click outside to close menus
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Close search
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setShowSearch(false);
//       }

//       // Close user menu
//       if (
//         userMenuRef.current &&
//         !userMenuRef.current.contains(event.target as Node)
//       ) {
//         setShowUserMenu(false);
//       }

//       // Close mega menu
//       if (
//         megaMenuRef.current &&
//         !megaMenuRef.current.contains(event.target as Node)
//       ) {
//         setIsMegaMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const isActivePath = (path: string) => {
//     if (path === "/" && location.pathname !== "/") {
//       return false;
//     }
//     return location.pathname.startsWith(path);
//   };

//   // Animation variants
//   const menuVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: 10, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: "spring", stiffness: 400, damping: 25 },
//     },
//     exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
//   };

//   const navbarVariants = {
//     scrolled: {
//       height: 70,
//       background: "rgba(255, 255, 255, 0.9)",
//       backdropFilter: "blur(8px)",
//       boxShadow: "0 1px 12px rgba(0, 0, 0, 0.08)",
//     },
//     top: {
//       height: 84,
//       background: "rgba(255, 255, 255, 1)",
//       backdropFilter: "none",
//       boxShadow: "none",
//     },
//   };

//   return (
//     <>
//       <motion.nav
//         className="fixed top-0 w-full z-50"
//         initial="top"
//         animate={isScrolled ? "scrolled" : "top"}
//         variants={navbarVariants}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Top Bar - Promotion / Shipping Info */}
//         <AnimatePresence>
//           {!isScrolled && (
//             <motion.div
//               className="bg-primary-600 text-white text-sm py-1.5"
//               initial={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center space-x-4">
//                 <div className="flex items-center">
//                   <Truck className="h-3.5 w-3.5 mr-1.5" />
//                   <span>Free shipping on orders over $100</span>
//                 </div>
//                 <div className="hidden sm:block">|</div>
//                 <div className="hidden sm:flex items-center">
//                   <Gift className="h-3.5 w-3.5 mr-1.5" />
//                   <span>
//                     20% off for new customers -{" "}
//                     <Link to="/register" className="underline font-medium">
//                       Sign up now
//                     </Link>
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-full">
//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="flex items-center space-x-2">
//                 <img
//                   src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_720.png"
//                   alt="EStore Logo"
//                   className="h-8 w-auto"
//                 />
//                 <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent tracking-tight">
//                   EStore
//                 </span>
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navigation.map((item) => (
//                 <div key={item.name} className="relative group">
//                   <Link
//                     to={item.href}
//                     className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 inline-flex items-center group ${
//                       isActivePath(item.href)
//                         ? "text-primary-600 dark:text-primary-400"
//                         : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
//                     }`}
//                     onMouseEnter={() => {
//                       if (item.hasMegaMenu) setIsMegaMenuOpen(true);
//                     }}
//                   >
//                     {item.name}
//                     {item.hasMegaMenu && (
//                       <ChevronDown
//                         className={`ml-1 h-4 w-4 transition-transform ${
//                           isMegaMenuOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     )}

//                     {isActivePath(item.href) ? (
//                       <motion.div
//                         layoutId="activeNavTab"
//                         className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
//                       />
//                     ) : (
//                       <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
//                     )}
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Desktop Icons/Search */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {/* Search */}
//               <div className="relative" ref={searchRef}>
//                 <button
//                   onClick={() => setShowSearch(!showSearch)}
//                   className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
//                   aria-label="Search"
//                 >
//                   <Search className="h-5 w-5" />
//                 </button>

//                 <AnimatePresence>
//                   {showSearch && (
//                     <motion.div
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       variants={dropdownVariants}
//                       className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-2 origin-top-right"
//                     >
//                       <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
//                         <input
//                           type="text"
//                           placeholder="Search products..."
//                           className="w-full px-4 py-2 outline-none bg-transparent"
//                           autoFocus
//                         />
//                         <button className="bg-primary-600 hover:bg-primary-700 text-white p-2 transition-colors">
//                           <Search className="h-5 w-5" />
//                         </button>
//                       </div>
//                       <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                         Popular: T-shirts, Dresses, Electronics, Home Decor
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Wishlist */}
//               <Link
//                 to="/wishlist"
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors relative"
//                 aria-label="Wishlist"
//               >
//                 <Heart className="h-5 w-5" />
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
//                 >
//                   3
//                 </motion.span>
//               </Link>

//               {/* Notifications */}
//               <button
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors relative"
//                 aria-label="Notifications"
//               >
//                 <Bell className="h-5 w-5" />
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
//                 >
//                   2
//                 </motion.span>
//               </button>

//               {/* Cart */}
//               <Link
//                 to="/cart"
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors relative"
//                 aria-label="Cart"
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
//                 >
//                   2
//                 </motion.span>
//               </Link>

//               <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />

//               {/* User Menu */}
//               <div className="relative" ref={userMenuRef}>
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
//                     <User className="h-5 w-5 text-primary-600" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Account
//                   </span>
//                   <ChevronDown
//                     className={`h-4 w-4 text-gray-500 transition-transform ${
//                       showUserMenu ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 <AnimatePresence>
//                   {showUserMenu && (
//                     <motion.div
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       variants={dropdownVariants}
//                       className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden origin-top-right divide-y divide-gray-100 dark:divide-gray-700"
//                     >
//                       <div className="p-4">
//                         <div className="font-medium">Guest User</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           Sign in to view your account
//                         </div>
//                       </div>

//                       <div className="py-1">
//                         <Link
//                           to="/account/profile"
//                           className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowUserMenu(false)}
//                         >
//                           <User className="h-4 w-4 mr-3 text-gray-500" />
//                           Profile
//                         </Link>
//                         <Link
//                           to="/account/orders"
//                           className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowUserMenu(false)}
//                         >
//                           <Truck className="h-4 w-4 mr-3 text-gray-500" />
//                           Orders
//                         </Link>
//                         <Link
//                           to="/account/settings"
//                           className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowUserMenu(false)}
//                         >
//                           <Settings className="h-4 w-4 mr-3 text-gray-500" />
//                           Settings
//                         </Link>
//                       </div>

//                       <div className="py-1">
//                         <Link
//                           to="/login"
//                           className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowUserMenu(false)}
//                         >
//                           Sign In
//                         </Link>
//                         <Link
//                           to="/register"
//                           className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowUserMenu(false)}
//                         >
//                           Sign Up
//                         </Link>
//                         <button
//                           className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowUserMenu(false)}
//                         >
//                           <LogOut className="h-4 w-4 mr-3 text-gray-500" />
//                           Sign Out
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <div className="lg:hidden flex items-center space-x-4">
//               <Link
//                 to="/cart"
//                 className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 relative"
//                 aria-label="Cart"
//               >
//                 <ShoppingCart className="h-6 w-6" />
//                 <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   2
//                 </span>
//               </Link>

//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
//                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={isMenuOpen ? "close" : "open"}
//                     initial={{ rotate: 0, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {isMenuOpen ? (
//                       <X className="h-6 w-6" />
//                     ) : (
//                       <Menu className="h-6 w-6" />
//                     )}
//                   </motion.div>
//                 </AnimatePresence>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Shop Mega Menu */}
//         <AnimatePresence>
//           {isMegaMenuOpen && (
//             <motion.div
//               ref={megaMenuRef}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               variants={{
//                 hidden: { opacity: 0, y: -10 },
//                 visible: { opacity: 1, y: 0 },
//                 exit: { opacity: 0, y: -10 },
//               }}
//               className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg py-8 z-50"
//               onMouseLeave={() => setIsMegaMenuOpen(false)}
//             >
//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                   {categories.map((category) => (
//                     <div key={category.name} className="space-y-4">
//                       <div className="flex items-center space-x-2">
//                         <span className="text-xl">{category.icon}</span>
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                           {category.name}
//                         </h3>
//                       </div>
//                       <ul className="space-y-2">
//                         {category.subcategories.map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link
//                               to={`/categories/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
//                               className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 text-sm transition-colors"
//                               onClick={() => setIsMegaMenuOpen(false)}
//                             >
//                               {subcategory}
//                             </Link>
//                           </li>
//                         ))}
//                         <li>
//                           <Link
//                             to={`/categories/${category.name.toLowerCase()}`}
//                             className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
//                             onClick={() => setIsMegaMenuOpen(false)}
//                           >
//                             View All
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="rounded-lg overflow-hidden relative">
//                     <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-800/80 flex flex-col justify-center px-6 text-white">
//                       <h3 className="text-xl font-bold mb-2">New Season</h3>
//                       <p className="text-sm mb-4">
//                         Check out the latest arrivals
//                       </p>
//                       <Link
//                         to="/new-arrivals"
//                         className="inline-block bg-white text-primary-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-50"
//                         onClick={() => setIsMegaMenuOpen(false)}
//                       >
//                         Shop Now
//                       </Link>
//                     </div>
//                     <img
//                       src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
//                       alt="New Season Collection"
//                       className="object-cover h-48 w-full"
//                     />
//                   </div>

//                   <div className="rounded-lg overflow-hidden relative">
//                     <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-700/80 flex flex-col justify-center px-6 text-white">
//                       <h3 className="text-xl font-bold mb-2">Special Offer</h3>
//                       <p className="text-sm mb-4">
//                         Up to 50% off on selected items
//                       </p>
//                       <Link
//                         to="/sale"
//                         className="inline-block bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50"
//                         onClick={() => setIsMegaMenuOpen(false)}
//                       >
//                         View Sale
//                       </Link>
//                     </div>
//                     <img
//                       src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3"
//                       alt="Special Offers"
//                       className="object-cover h-48 w-full"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Mobile menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               variants={menuVariants}
//               className="lg:hidden bg-white dark:bg-gray-800 shadow-lg max-h-[calc(100vh-68px)] overflow-y-auto"
//             >
//               <div className="pt-3 pb-5 divide-y divide-gray-200 dark:divide-gray-700">
//                 <div className="px-4 py-3">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div className="py-2">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={`block px-4 py-3 text-base font-medium transition-colors ${
//                         isActivePath(item.href)
//                           ? "bg-primary-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400"
//                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
//                       }`}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="py-3 px-4 space-y-3">
//                   <Link
//                     to="/wishlist"
//                     className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Heart className="h-5 w-5" />
//                     <span>Wishlist</span>
//                     <span className="ml-auto bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       3
//                     </span>
//                   </Link>

//                   <Link
//                     to="/notifications"
//                     className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Bell className="h-5 w-5" />
//                     <span>Notifications</span>
//                     <span className="ml-auto bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       2
//                     </span>
//                   </Link>

//                   <Link
//                     to="/cart"
//                     className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <ShoppingCart className="h-5 w-5" />
//                     <span>Cart</span>
//                     <span className="ml-auto bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       2
//                     </span>
//                   </Link>
//                 </div>

//                 <div className="py-3 px-4 space-y-3">
//                   <Link
//                     to="/login"
//                     className="block w-full py-2.5 text-center bg-white border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Sign In
//                   </Link>

//                   <Link
//                     to="/register"
//                     className="block w-full py-2.5 text-center bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Spacer for fixed navbar */}
//       <div
//         className={`${
//           isScrolled ? "h-[70px]" : "h-[100px]"
//         } transition-all duration-300`}
//       />
//     </>
//   );
// };

// export default Navbar;

/////////////////////////////////////////////////////////////////////////////////////////////////////

// // src/components/common/Navbar.tsx
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import CategoryMegaMenu from "../categories/CategoryMegaMenu";
// import MobileCategoryMenu from "../categories/MobileCategoryMenu";
// import SearchBar from "../SearchBar";
// import { CartIcon } from "../cart/CartIcon"; // Updated import to match your existing component
// import { useAuth } from "../../hooks/useAuth";

// const Navbar: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobileCategoryMenuOpen, setIsMobileCategoryMenuOpen] =
//     useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { isAuthenticated, logout } = useAuth();
//   const location = useLocation();

//   // Close mobile menu when changing routes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsMobileCategoryMenuOpen(false);
//   }, [location.pathname]);

//   // Handle scroll for sticky header effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`w-full z-40 transition-all duration-200 ${
//         isScrolled ? "sticky top-0 shadow-md bg-white" : "bg-white"
//       }`}
//     >
//       {/* Top Bar */}
//       <div className="bg-gray-900 text-white py-2 text-sm">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <div className="hidden md:block">
//             <span>Free shipping on orders over $50</span>
//           </div>
//           <div className="flex space-x-4">
//             <a href="tel:+1234567890" className="hover:text-gray-300">
//               <span className="hidden sm:inline">Call us: </span>(123) 456-7890
//             </a>
//             <span className="hidden md:inline">|</span>
//             <a href="#" className="hover:text-gray-300 hidden md:block">
//               Store Locator
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-xl font-bold text-gray-800">
//               ElectroTech
//             </Link>
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:block w-full max-w-xl mx-4">
//             <SearchBar />
//           </div>

//           {/* User Actions */}
//           <div className="flex items-center">
//             {/* User Menu - Desktop */}
//             <div className="hidden md:flex items-center space-x-5">
//               {isAuthenticated ? (
//                 <div className="relative group">
//                   <button className="flex items-center text-gray-700 hover:text-blue-600">
//                     <span></span>
//                     <svg
//                       className="ml-1 h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
//                     <Link
//                       to="/user/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       My Profile
//                     </Link>
//                     <Link
//                       to="/user/orders"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       My Orders
//                     </Link>
//                     <Link
//                       to="/user/wishlist"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Wishlist
//                     </Link>
//                     <button
//                       onClick={logout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="text-gray-700 hover:text-blue-600"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Cart Icon - Using your existing component */}
//             <div className="ml-5">
//               <CartIcon />
//             </div>

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden ml-4 text-gray-700 hover:text-blue-600 focus:outline-none"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={
//                     isMobileMenuOpen
//                       ? "M6 18L18 6M6 6l12 12"
//                       : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Search Bar - Mobile */}
//         <div className="md:hidden pb-4">
//           <SearchBar />
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <nav className="bg-gray-50 border-y border-gray-200">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center h-12">
//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-6 h-full">
//               <Link
//                 to="/"
//                 className="text-gray-700 hover:text-blue-600 h-full flex items-center"
//               >
//                 Home
//               </Link>
//               <CategoryMegaMenu />
//               <Link
//                 to="/products"
//                 className="text-gray-700 hover:text-blue-600 h-full flex items-center"
//               >
//                 All Products
//               </Link>
//               <Link
//                 to="/deals"
//                 className="text-gray-700 hover:text-blue-600 h-full flex items-center"
//               >
//                 Deals
//               </Link>
//               <Link
//                 to="/products"
//                 className="text-gray-700 hover:text-blue-600 h-full flex items-center"
//               >
//                 New Arrivals
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-gray-700 hover:text-blue-600 h-full flex items-center"
//               >
//                 Contact Us
//               </Link>
//             </div>

//             {/* Mobile Category Button */}
//             <div className="md:hidden flex items-center h-full">
//               <button
//                 className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none"
//                 onClick={() => setIsMobileCategoryMenuOpen(true)}
//               >
//                 <svg
//                   className="h-5 w-5 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//                 Categories
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Navigation Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg">
//           <div className="px-4 py-3 space-y-3">
//             <Link
//               to="/"
//               className="block text-gray-700 hover:text-blue-600"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <button
//               className="flex items-center text-gray-700 hover:text-blue-600 w-full focus:outline-none"
//               onClick={() => {
//                 setIsMobileMenuOpen(false);
//                 setIsMobileCategoryMenuOpen(true);
//               }}
//             >
//               <span>Categories</span>
//               <svg
//                 className="ml-auto h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//             <Link
//               to="/products"
//               className="block text-gray-700 hover:text-blue-600"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               All Products
//             </Link>
//             <Link
//               to="/deals"
//               className="block text-gray-700 hover:text-blue-600"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Deals
//             </Link>
//             <Link
//               to="/new-arrivals"
//               className="block text-gray-700 hover:text-blue-600"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               New Arrivals
//             </Link>
//             <Link
//               to="/contact"
//               className="block text-gray-700 hover:text-blue-600"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Contact Us
//             </Link>

//             <div className="border-t border-gray-200 pt-3">
//               {isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/user/profile"
//                     className="block py-2 text-gray-700 hover:text-blue-600"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     My Profile
//                   </Link>
//                   <Link
//                     to="/user/orders"
//                     className="block py-2 text-gray-700 hover:text-blue-600"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     My Orders
//                   </Link>
//                   <Link
//                     to="/user/wishlist"
//                     className="block py-2 text-gray-700 hover:text-blue-600"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Wishlist
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
//                   >
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex flex-col space-y-3">
//                   <Link
//                     to="/auth/login"
//                     className="text-gray-700 hover:text-blue-600"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/auth/register"
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Category Menu */}
//       <MobileCategoryMenu
//         isOpen={isMobileCategoryMenuOpen}
//         onClose={() => setIsMobileCategoryMenuOpen(false)}
//       />
//     </header>
//   );
// };

// export default Navbar;

// src/components/common/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";
import { CartIcon } from "../cart/CartIcon"; // Updated import to match your existing component
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-40 transition-all duration-200 ${
        isScrolled ? "sticky top-0 shadow-md bg-white" : "bg-white"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:block">
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex space-x-4">
            <a href="tel:+1234567890" className="hover:text-gray-300">
              <span className="hidden sm:inline">Call us: </span>(123) 456-7890
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-gray-300 hidden md:block">
              Store Locator
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              ElectroTech
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block w-full max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center">
            {/* User Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-5">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-blue-600">
                    <span>Account</span>
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/user/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/user/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Cart Icon - Using your existing component */}
            <div className="ml-5">
              <CartIcon />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-4 text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Navigation Links - Simplified to 3 items only */}
      <nav className="bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-12">
            {/* Desktop Menu - Only 3 items */}
            <div className="hidden md:flex items-center space-x-12 h-full">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 h-full flex items-center font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 h-full flex items-center font-medium transition-colors duration-200"
              >
                All Products
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 h-full flex items-center font-medium transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile - Show simplified menu button */}
            <div className="md:hidden flex items-center h-full">
              <span className="text-gray-700 font-medium">Menu</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Simplified */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            <div className="border-t border-gray-200 pt-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/user/profile"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/user/orders"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/user/wishlist"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

///////////////////////////////////////////////////////////////////////////////////////

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
