/////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   Filter,
//   ShoppingBag,
//   ArrowUpDown,
//   Grid,
//   List,
//   X,
//   ChevronDown,
//   Search,
//   Tag,
//   Eye,
// } from "lucide-react";
// import ProductList from "../../components/products/ProductList";
// import { useProduct } from "../../hooks/useProduct";
// import LoadingSpinner from "../../components/shared/LoadingSpinner";

// const ProductListingPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSort, setSelectedSort] = useState<string>("featured");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const { allProducts, loading } = useProduct();
//   const navigate = useNavigate();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   const categories = Array.from(new Set(allProducts.map((p) => p.category)));

//   // Apply filters and sorting
//   let filteredProducts = allProducts;

//   // Filter by category
//   if (selectedCategory) {
//     filteredProducts = filteredProducts.filter(
//       (p) => p.category === selectedCategory
//     );
//   }

//   // Filter by search term
//   if (searchTerm) {
//     filteredProducts = filteredProducts.filter(
//       (p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.description?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   // Sort products based on selection
//   switch (selectedSort) {
//     case "price-low":
//       filteredProducts = [...filteredProducts].sort(
//         (a, b) => a.price - b.price
//       );
//       break;
//     case "price-high":
//       filteredProducts = [...filteredProducts].sort(
//         (a, b) => b.price - a.price
//       );
//       break;
//     case "newest":
//       filteredProducts = [...filteredProducts].sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );
//       break;
//     case "name-az":
//       filteredProducts = [...filteredProducts].sort((a, b) =>
//         a.name.localeCompare(b.name)
//       );
//       break;
//     default:
//       break;
//   }

//   const activeFilters = (selectedCategory ? 1 : 0) + (searchTerm ? 1 : 0);

//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.4 } },
//   };

//   const slideDown = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   const clearAllFilters = () => {
//     setSelectedCategory(null);
//     setSearchTerm("");
//   };

//   // Handle product click navigation
//   const handleProductClick = (productId: string) => {
//     navigate(`/products/${productId}`);
//   };

//   // // Handle product click navigation (same for clicking image or View button)
//   // const handleProductClick = (productId: string) => {
//   //   navigate(`/products/${productId}`);
//   // };

//   // Handle View button click (same as clicking product image)
//   const handleViewProduct = (e: React.MouseEvent, product: any) => {
//     e.stopPropagation(); // Prevent double navigation
//     navigate(`/products/${product.id}`);
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       {/* Hero Banner */}
//       {/* <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 text-white overflow-hidden">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
//         <div className="relative container mx-auto px-4 py-16 md:py-24">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//               Explore Our Products
//             </h1>
//             <p className="text-primary-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//               Discover our extensive collection of premium products designed to
//               meet your every need. Quality, innovation, and value in every
//               purchase.
//             </p>
//           </motion.div>
//         </div>
//       </div> */}

//       {/* Breadcrumbs */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <div className="container mx-auto px-4 py-4">
//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             <span
//               onClick={() => navigate("/")}
//               className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
//             >
//               Home
//             </span>
//             <span className="mx-2">/</span>
//             <span className="font-medium text-gray-800 dark:text-gray-200">
//               Products
//             </span>
//             {selectedCategory && (
//               <>
//                 <span className="mx-2">/</span>
//                 <span className="font-medium text-primary-600 dark:text-primary-400">
//                   {selectedCategory}
//                 </span>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Filters & Controls Section */}
//       <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
//         <div className="container mx-auto px-4 py-6">
//           {/* Search Bar */}
//           {/* <motion.div
//             className="mb-6"
//             initial="hidden"
//             animate="visible"
//             variants={slideDown}
//           >
//             <div className="relative max-w-md mx-auto">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//               />
//             </div>
//           </motion.div> */}

//           {/* Categories Filter */}
//           <motion.div
//             className="mb-6"
//             initial="hidden"
//             animate="visible"
//             variants={slideDown}
//             transition={{ delay: 0.1 }}
//           >
//             <div className="flex items-center mb-4">
//               <Tag className="h-5 w-5 text-primary-600 mr-2" />
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Categories
//               </h3>
//             </div>

//             <div className="hidden md:flex flex-wrap gap-3">
//               <button
//                 onClick={() => setSelectedCategory(null)}
//                 className={`px-4 py-2 rounded-full border transition-all duration-200 ${
//                   !selectedCategory
//                     ? "bg-primary-600 text-white border-primary-600 shadow-md"
//                     : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 All Products
//               </button>
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-full border transition-all duration-200 ${
//                     selectedCategory === category
//                       ? "bg-primary-600 text-white border-primary-600 shadow-md"
//                       : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                   }`}
//                 >
//                   {category.replace(/_/g, " ")}
//                 </button>
//               ))}
//             </div>

//             {/* Mobile Category Dropdown */}
//             <div className="md:hidden">
//               <select
//                 value={selectedCategory || ""}
//                 onChange={(e) => setSelectedCategory(e.target.value || null)}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category.replace(/_/g, " ")}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </motion.div>

//           {/* Controls Bar */}
//           <motion.div
//             className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//             initial="hidden"
//             animate="visible"
//             variants={slideDown}
//             transition={{ delay: 0.2 }}
//           >
//             {/* Results Count & Active Filters */}
//             <div className="flex items-center flex-wrap gap-4">
//               <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                 {filteredProducts.length} of {allProducts.length} products
//               </span>

//               {activeFilters > 0 && (
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500">Filters:</span>
//                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
//                     {activeFilters} active
//                   </span>
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-sm text-primary-600 hover:text-primary-700 font-medium"
//                   >
//                     Clear all
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Sort & View Controls */}
//             <div className="flex items-center gap-4">
//               {/* Sort Dropdown */}
//               <div className="relative">
//                 <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
//                   <ArrowUpDown className="h-4 w-4 text-gray-500" />
//                   <select
//                     value={selectedSort}
//                     onChange={(e) => setSelectedSort(e.target.value)}
//                     className="appearance-none bg-transparent pr-6 font-medium focus:outline-none cursor-pointer text-gray-800 dark:text-gray-200 text-sm"
//                   >
//                     <option value="featured">Featured</option>
//                     <option value="newest">Newest</option>
//                     <option value="name-az">Name A-Z</option>
//                     <option value="price-low">Price: Low to High</option>
//                     <option value="price-high">Price: High to Low</option>
//                   </select>
//                   <ChevronDown className="h-4 w-4 text-gray-500 absolute right-1 pointer-events-none" />
//                 </div>
//               </div>

//               {/* View Mode Toggle */}
//               <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-md transition-all ${
//                     viewMode === "grid"
//                       ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
//                       : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                   }`}
//                   aria-label="Grid view"
//                 >
//                   <Grid className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-md transition-all ${
//                     viewMode === "list"
//                       ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
//                       : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                   }`}
//                   aria-label="List view"
//                 >
//                   <List className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div className="container mx-auto px-4 py-8">
//         <motion.div
//           key={`${selectedCategory}-${selectedSort}-${viewMode}-${searchTerm}`}
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//         >
//           {filteredProducts.length > 0 ? (
//             <div
//               className={
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//                   : "space-y-6"
//               }
//             >
//               {filteredProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05, duration: 0.3 }}
//                   className={
//                     viewMode === "grid"
//                       ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
//                       : "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
//                   }
//                   onClick={() => handleProductClick(product.id)}
//                 >
//                   {viewMode === "grid" ? (
//                     // Grid Layout - Beautiful Design
//                     <div className="h-full flex flex-col">
//                       <div className="relative overflow-hidden aspect-square">
//                         <img
//                           src={product.image || "/api/placeholder/300/300"}
//                           alt={product.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                         {product.isNew && (
//                           <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                             New
//                           </span>
//                         )}
//                         {product.originalPrice && (
//                           <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                             Sale
//                           </span>
//                         )}
//                       </div>

//                       <div className="p-4 flex-1 flex flex-col">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
//                           {product.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
//                           {product.description}
//                         </p>

//                         {/* Rating */}
//                         <div className="flex items-center mb-3">
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <svg
//                                 key={i}
//                                 className={`h-4 w-4 ${
//                                   i < Math.floor(product.rating || 4.5)
//                                     ? "text-yellow-400 fill-current"
//                                     : "text-gray-300"
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                           <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
//                             ({product.reviews || 0})
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <span className="text-lg font-bold text-gray-900 dark:text-white">
//                               ${product.price}
//                             </span>
//                             {product.originalPrice && (
//                               <span className="text-sm text-gray-500 line-through">
//                                 ${product.originalPrice}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={(e) => handleViewProduct(e, product)}
//                             className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                           >
//                             <Eye className="h-4 w-4" />
//                             View
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     // List Layout - Beautiful Design
//                     <div className="flex p-4 gap-4">
//                       <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
//                         <img
//                           src={product.image || "/api/placeholder/300/300"}
//                           alt={product.name}
//                           className="w-full h-full object-cover"
//                         />
//                         {product.isNew && (
//                           <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                             New
//                           </span>
//                         )}
//                         {product.originalPrice && (
//                           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                             Sale
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
//                           {product.name}
//                         </h3>

//                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                           {product.description}
//                         </p>

//                         {/* Rating */}
//                         <div className="flex items-center mb-3">
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <svg
//                                 key={i}
//                                 className={`h-4 w-4 ${
//                                   i < Math.floor(product.rating || 4.5)
//                                     ? "text-yellow-400 fill-current"
//                                     : "text-gray-300"
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                           </div>
//                           <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
//                             ({product.reviews || 0})
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <span className="text-lg font-bold text-gray-900 dark:text-white">
//                               ${product.price}
//                             </span>
//                             {product.originalPrice && (
//                               <span className="text-sm text-gray-500 line-through">
//                                 ${product.originalPrice}
//                               </span>
//                             )}
//                           </div>
//                           <button
//                             onClick={(e) => handleViewProduct(e, product)}
//                             className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                           >
//                             <Eye className="h-4 w-4" />
//                             View
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                 No products found
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
//                 We couldn't find any products matching your criteria. Try
//                 adjusting your filters or search terms.
//               </p>
//               <button
//                 onClick={clearAllFilters}
//                 className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
//               >
//                 <X className="h-4 w-4 mr-2" />
//                 Clear all filters
//               </button>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* Mobile Filters Modal */}
//       {showMobileFilters && (
//         <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
//           <div
//             className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//             onClick={() => setShowMobileFilters(false)}
//           ></div>

//           <motion.div
//             className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
//             initial={{ x: "-100%", opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: "-100%", opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="h-full flex flex-col overflow-y-auto">
//               <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold flex items-center">
//                   <Filter className="h-5 w-5 mr-2 text-primary-600" />
//                   Filters
//                 </h2>
//                 <button
//                   onClick={() => setShowMobileFilters(false)}
//                   className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               <div className="flex-1 p-4">
//                 {/* Mobile Search */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Search Products
//                   </label>
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                   </div>
//                 </div>

//                 {/* Mobile Categories */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Categories
//                   </label>
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(null);
//                         setShowMobileFilters(false);
//                       }}
//                       className={`w-full text-left px-3 py-2 rounded-md text-sm ${
//                         !selectedCategory
//                           ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
//                           : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                       }`}
//                     >
//                       All Products
//                     </button>
//                     {categories.map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => {
//                           setSelectedCategory(category);
//                           setShowMobileFilters(false);
//                         }}
//                         className={`w-full text-left px-3 py-2 rounded-md text-sm ${
//                           selectedCategory === category
//                             ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
//                             : "hover:bg-gray-100 dark:hover:bg-gray-700"
//                         }`}
//                       >
//                         {category.replace(/_/g, " ")}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={() => setShowMobileFilters(false)}
//                   className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
//                 >
//                   Apply Filters
//                 </button>

//                 {(selectedCategory || searchTerm) && (
//                   <button
//                     onClick={() => {
//                       clearAllFilters();
//                       setShowMobileFilters(false);
//                     }}
//                     className="w-full mt-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-center font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Mobile Filters Button */}
//       <div className="lg:hidden fixed bottom-6 right-6 z-40">
//         <button
//           onClick={() => setShowMobileFilters(true)}
//           className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center space-x-2"
//         >
//           <Filter className="h-5 w-5" />
//           {activeFilters > 0 && (
//             <span className="bg-white text-primary-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {activeFilters}
//             </span>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductListingPage;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  ShoppingBag,
  ArrowUpDown,
  Grid,
  List,
  X,
  ChevronDown,
  Search,
  Tag,
  ShoppingCart,
  Check,
  Plus,
} from "lucide-react";
import ProductList from "../../components/products/ProductList";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

// Toast Notification Component
interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div
            className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
              type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex-shrink-0">
              {type === "success" ? (
                <Check className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-75 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [addingToCart, setAddingToCart] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const { allProducts, loading } = useProduct();
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));

  // Apply filters and sorting
  let filteredProducts = allProducts;

  // Filter by category
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort products based on selection
  switch (selectedSort) {
    case "price-low":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
      break;
    case "price-high":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
      break;
    case "newest":
      filteredProducts = [...filteredProducts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "name-az":
      filteredProducts = [...filteredProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    default:
      break;
  }

  const activeFilters = (selectedCategory ? 1 : 0) + (searchTerm ? 1 : 0);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const slideDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  // Handle product click navigation (clicking on the card itself)
  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // Show toast notification
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Handle Add to Cart functionality
  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent navigation when clicking the button

    if (addingToCart[product.id]) return; // Prevent multiple clicks

    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      // Check if we have an image
      const imageUrl = product.image
        ? product.image.startsWith("http")
          ? product.image
          : `http://localhost:4000${product.image}`
        : "";

      // Create cart item
      const cartItem = {
        id: `item_${Date.now()}_${product.id}`,
        productId: product.id,
        name: product.name,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price,
        quantity: 1, // Default quantity
        image: imageUrl,
        stockQuantity: product.stock || 10,
        attributes: {},
      };

      console.log("Adding product to cart:", cartItem);

      // Add to cart using context
      await addItem(cartItem);

      // Show success notification
      showToast(`${product.name} added to cart!`, "success");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      showToast("Failed to add item to cart. Please try again.", "error");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span
              onClick={() => navigate("/")}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
            >
              Home
            </span>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Products
            </span>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="font-medium text-primary-600 dark:text-primary-400">
                  {selectedCategory}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Controls Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-6">
          {/* Categories Filter */}
          <motion.div
            className="mb-6"
            initial="hidden"
            animate="visible"
            variants={slideDown}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <Tag className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Categories
              </h3>
            </div>

            <div className="hidden md:flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  !selectedCategory
                    ? "bg-primary-600 text-white border-primary-600 shadow-md"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white border-primary-600 shadow-md"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.replace(/_/g, " ")}
                </button>
              ))}
            </div>

            {/* Mobile Category Dropdown */}
            <div className="md:hidden">
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            initial="hidden"
            animate="visible"
            variants={slideDown}
            transition={{ delay: 0.2 }}
          >
            {/* Results Count & Active Filters */}
            <div className="flex items-center flex-wrap gap-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {filteredProducts.length} of {allProducts.length} products
              </span>

              {activeFilters > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Filters:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {activeFilters} active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="appearance-none bg-transparent pr-6 font-medium focus:outline-none cursor-pointer text-gray-800 dark:text-gray-200 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="name-az">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-500 absolute right-1 pointer-events-none" />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          key={`${selectedCategory}-${selectedSort}-${viewMode}-${searchTerm}`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                      : "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  }
                  onClick={() => handleProductClick(product.id)}
                >
                  {viewMode === "grid" ? (
                    // Grid Layout - Beautiful Design
                    <div className="h-full flex flex-col">
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={product.image || "/api/placeholder/300/300"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            Sale
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating || 4.5)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            ({product.reviews || 0})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={
                              addingToCart[product.id] || product.stock === 0
                            }
                            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            {addingToCart[product.id] ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                />
                                Adding...
                              </>
                            ) : product.stock === 0 ? (
                              "Out of Stock"
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List Layout - Beautiful Design
                    <div className="flex p-4 gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={product.image || "/api/placeholder/300/300"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.isNew && (
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            Sale
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating || 4.5)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            ({product.reviews || 0})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={
                              addingToCart[product.id] || product.stock === 0
                            }
                            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            {addingToCart[product.id] ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                />
                                Adding...
                              </>
                            ) : product.stock === 0 ? (
                              "Out of Stock"
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                We couldn't find any products matching your criteria. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <X className="h-4 w-4 mr-2" />
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          ></div>

          <motion.div
            className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary-600" />
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 p-4">
                {/* Mobile Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Mobile Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        !selectedCategory
                          ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCategory === category
                            ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {category.replace(/_/g, " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>

                {(selectedCategory || searchTerm) && (
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setShowMobileFilters(false);
                    }}
                    className="w-full mt-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-center font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Filters Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Filter className="h-5 w-5" />
          {activeFilters > 0 && (
            <span className="bg-white text-primary-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductListingPage;

/////////////////////////////////////////////////////////////////////////////////////
