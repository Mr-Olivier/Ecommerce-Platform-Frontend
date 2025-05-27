// // // import React, { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   Filter,
// // //   ShoppingBag,
// // //   ArrowUpDown,
// // //   Grid,
// // //   List,
// // //   X,
// // //   ChevronDown,
// // //   Search,
// // //   Tag,
// // // } from "lucide-react";
// // // import ProductList from "../../components/products/ProductList";
// // // import { useProduct } from "../../hooks/useProduct";
// // // import { useCart } from "../../hooks/useCart";
// // // import LoadingSpinner from "../../components/shared/LoadingSpinner";

// // // const ProductListingPage: React.FC = () => {
// // //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
// // //   const [selectedSort, setSelectedSort] = useState<string>("featured");
// // //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// // //   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const { allProducts, loading } = useProduct();
// // //   const { addItem } = useCart();
// // //   const navigate = useNavigate();

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <LoadingSpinner />
// // //       </div>
// // //     );
// // //   }

// // //   const categories = Array.from(new Set(allProducts.map((p) => p.category)));

// // //   // Apply filters and sorting
// // //   let filteredProducts = allProducts;

// // //   // Filter by category
// // //   if (selectedCategory) {
// // //     filteredProducts = filteredProducts.filter(
// // //       (p) => p.category === selectedCategory
// // //     );
// // //   }

// // //   // Filter by search term
// // //   if (searchTerm) {
// // //     filteredProducts = filteredProducts.filter(
// // //       (p) =>
// // //         p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         p.description?.toLowerCase().includes(searchTerm.toLowerCase())
// // //     );
// // //   }

// // //   // Sort products based on selection
// // //   switch (selectedSort) {
// // //     case "price-low":
// // //       filteredProducts = [...filteredProducts].sort(
// // //         (a, b) => a.price - b.price
// // //       );
// // //       break;
// // //     case "price-high":
// // //       filteredProducts = [...filteredProducts].sort(
// // //         (a, b) => b.price - a.price
// // //       );
// // //       break;
// // //     case "newest":
// // //       filteredProducts = [...filteredProducts].sort(
// // //         (a, b) =>
// // //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// // //       );
// // //       break;
// // //     case "name-az":
// // //       filteredProducts = [...filteredProducts].sort((a, b) =>
// // //         a.name.localeCompare(b.name)
// // //       );
// // //       break;
// // //     default:
// // //       break;
// // //   }

// // //   const activeFilters = (selectedCategory ? 1 : 0) + (searchTerm ? 1 : 0);

// // //   // Animation variants
// // //   const fadeIn = {
// // //     hidden: { opacity: 0 },
// // //     visible: { opacity: 1, transition: { duration: 0.4 } },
// // //   };

// // //   const slideDown = {
// // //     hidden: { opacity: 0, y: -20 },
// // //     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
// // //   };

// // //   const clearAllFilters = () => {
// // //     setSelectedCategory(null);
// // //     setSearchTerm("");
// // //   };

// // //   // Handle product click navigation
// // //   const handleProductClick = (productId: string) => {
// // //     navigate(`/products/${productId}`);
// // //   };

// // //   // Handle add to cart - Using your exact cart API
// // //   const handleAddToCart = (e: React.MouseEvent, product: any) => {
// // //     e.stopPropagation(); // Prevent navigation when clicking add to cart

// // //     try {
// // //       // Create CartItem object matching your CartItem type
// // //       const cartItem = {
// // //         id: product.id,
// // //         name: product.name,
// // //         price: product.price,
// // //         image: product.image,
// // //         quantity: 1,
// // //         // Add any other properties your CartItem type expects
// // //       };

// // //       // Use your addItem method
// // //       addItem(cartItem);
// // //       console.log("Successfully added to cart:", product.name);
// // //     } catch (error) {
// // //       console.error("Error adding to cart:", error);
// // //       alert("Error adding item to cart. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
// // //       {/* Hero Banner */}
// // //       <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 text-white overflow-hidden">
// // //         <div className="absolute inset-0 bg-black/10"></div>
// // //         <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
// // //         <div className="relative container mx-auto px-4 py-16 md:py-24">
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 30 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6 }}
// // //             className="text-center"
// // //           >
// // //             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
// // //               Explore Our Products
// // //             </h1>
// // //             <p className="text-primary-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
// // //               Discover our extensive collection of premium products designed to
// // //               meet your every need. Quality, innovation, and value in every
// // //               purchase.
// // //             </p>
// // //           </motion.div>
// // //         </div>
// // //       </div>

// // //       {/* Breadcrumbs */}
// // //       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
// // //         <div className="container mx-auto px-4 py-4">
// // //           <div className="text-sm text-gray-500 dark:text-gray-400">
// // //             <span
// // //               onClick={() => navigate("/")}
// // //               className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
// // //             >
// // //               Home
// // //             </span>
// // //             <span className="mx-2">/</span>
// // //             <span className="font-medium text-gray-800 dark:text-gray-200">
// // //               Products
// // //             </span>
// // //             {selectedCategory && (
// // //               <>
// // //                 <span className="mx-2">/</span>
// // //                 <span className="font-medium text-primary-600 dark:text-primary-400">
// // //                   {selectedCategory}
// // //                 </span>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Filters & Controls Section */}
// // //       <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
// // //         <div className="container mx-auto px-4 py-6">
// // //           {/* Search Bar */}
// // //           <motion.div
// // //             className="mb-6"
// // //             initial="hidden"
// // //             animate="visible"
// // //             variants={slideDown}
// // //           >
// // //             <div className="relative max-w-md mx-auto">
// // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search products..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
// // //               />
// // //             </div>
// // //           </motion.div>

// // //           {/* Categories Filter */}
// // //           <motion.div
// // //             className="mb-6"
// // //             initial="hidden"
// // //             animate="visible"
// // //             variants={slideDown}
// // //             transition={{ delay: 0.1 }}
// // //           >
// // //             <div className="flex items-center mb-4">
// // //               <Tag className="h-5 w-5 text-primary-600 mr-2" />
// // //               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
// // //                 Categories
// // //               </h3>
// // //             </div>

// // //             <div className="hidden md:flex flex-wrap gap-3">
// // //               <button
// // //                 onClick={() => setSelectedCategory(null)}
// // //                 className={`px-4 py-2 rounded-full border transition-all duration-200 ${
// // //                   !selectedCategory
// // //                     ? "bg-primary-600 text-white border-primary-600 shadow-md"
// // //                     : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
// // //                 }`}
// // //               >
// // //                 All Products
// // //               </button>
// // //               {categories.map((category) => (
// // //                 <button
// // //                   key={category}
// // //                   onClick={() => setSelectedCategory(category)}
// // //                   className={`px-4 py-2 rounded-full border transition-all duration-200 ${
// // //                     selectedCategory === category
// // //                       ? "bg-primary-600 text-white border-primary-600 shadow-md"
// // //                       : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
// // //                   }`}
// // //                 >
// // //                   {category.replace(/_/g, " ")}
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             {/* Mobile Category Dropdown */}
// // //             <div className="md:hidden">
// // //               <select
// // //                 value={selectedCategory || ""}
// // //                 onChange={(e) => setSelectedCategory(e.target.value || null)}
// // //                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
// // //               >
// // //                 <option value="">All Categories</option>
// // //                 {categories.map((category) => (
// // //                   <option key={category} value={category}>
// // //                     {category.replace(/_/g, " ")}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </motion.div>

// // //           {/* Controls Bar */}
// // //           <motion.div
// // //             className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
// // //             initial="hidden"
// // //             animate="visible"
// // //             variants={slideDown}
// // //             transition={{ delay: 0.2 }}
// // //           >
// // //             {/* Results Count & Active Filters */}
// // //             <div className="flex items-center flex-wrap gap-4">
// // //               <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
// // //                 {filteredProducts.length} of {allProducts.length} products
// // //               </span>

// // //               {activeFilters > 0 && (
// // //                 <div className="flex items-center gap-2">
// // //                   <span className="text-sm text-gray-500">Filters:</span>
// // //                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
// // //                     {activeFilters} active
// // //                   </span>
// // //                   <button
// // //                     onClick={clearAllFilters}
// // //                     className="text-sm text-primary-600 hover:text-primary-700 font-medium"
// // //                   >
// // //                     Clear all
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Sort & View Controls */}
// // //             <div className="flex items-center gap-4">
// // //               {/* Sort Dropdown */}
// // //               <div className="relative">
// // //                 <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
// // //                   <ArrowUpDown className="h-4 w-4 text-gray-500" />
// // //                   <select
// // //                     value={selectedSort}
// // //                     onChange={(e) => setSelectedSort(e.target.value)}
// // //                     className="appearance-none bg-transparent pr-6 font-medium focus:outline-none cursor-pointer text-gray-800 dark:text-gray-200 text-sm"
// // //                   >
// // //                     <option value="featured">Featured</option>
// // //                     <option value="newest">Newest</option>
// // //                     <option value="name-az">Name A-Z</option>
// // //                     <option value="price-low">Price: Low to High</option>
// // //                     <option value="price-high">Price: High to Low</option>
// // //                   </select>
// // //                   <ChevronDown className="h-4 w-4 text-gray-500 absolute right-1 pointer-events-none" />
// // //                 </div>
// // //               </div>

// // //               {/* View Mode Toggle */}
// // //               <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
// // //                 <button
// // //                   onClick={() => setViewMode("grid")}
// // //                   className={`p-2 rounded-md transition-all ${
// // //                     viewMode === "grid"
// // //                       ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
// // //                       : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // //                   }`}
// // //                   aria-label="Grid view"
// // //                 >
// // //                   <Grid className="h-4 w-4" />
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setViewMode("list")}
// // //                   className={`p-2 rounded-md transition-all ${
// // //                     viewMode === "list"
// // //                       ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
// // //                       : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // //                   }`}
// // //                   aria-label="List view"
// // //                 >
// // //                   <List className="h-4 w-4" />
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       </div>

// // //       {/* Products Section */}
// // //       <div className="container mx-auto px-4 py-8">
// // //         <motion.div
// // //           key={`${selectedCategory}-${selectedSort}-${viewMode}-${searchTerm}`}
// // //           initial="hidden"
// // //           animate="visible"
// // //           variants={fadeIn}
// // //         >
// // //           {filteredProducts.length > 0 ? (
// // //             <div
// // //               className={
// // //                 viewMode === "grid"
// // //                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
// // //                   : "space-y-6"
// // //               }
// // //             >
// // //               {filteredProducts.map((product, index) => (
// // //                 <motion.div
// // //                   key={product.id}
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: index * 0.05, duration: 0.3 }}
// // //                   className={
// // //                     viewMode === "grid"
// // //                       ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
// // //                       : "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
// // //                   }
// // //                   onClick={() => handleProductClick(product.id)}
// // //                 >
// // //                   {viewMode === "grid" ? (
// // //                     // Grid Layout - Beautiful Design
// // //                     <div className="h-full flex flex-col">
// // //                       <div className="relative overflow-hidden aspect-square">
// // //                         <img
// // //                           src={product.image || "/api/placeholder/300/300"}
// // //                           alt={product.name}
// // //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// // //                         />
// // //                         {product.isNew && (
// // //                           <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// // //                             New
// // //                           </span>
// // //                         )}
// // //                         {product.originalPrice && (
// // //                           <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// // //                             Sale
// // //                           </span>
// // //                         )}
// // //                       </div>

// // //                       <div className="p-4 flex-1 flex flex-col">
// // //                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
// // //                           {product.name}
// // //                         </h3>
// // //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
// // //                           {product.description}
// // //                         </p>

// // //                         {/* Rating */}
// // //                         <div className="flex items-center mb-3">
// // //                           <div className="flex items-center">
// // //                             {[...Array(5)].map((_, i) => (
// // //                               <svg
// // //                                 key={i}
// // //                                 className={`h-4 w-4 ${
// // //                                   i < Math.floor(product.rating || 4.5)
// // //                                     ? "text-yellow-400 fill-current"
// // //                                     : "text-gray-300"
// // //                                 }`}
// // //                                 fill="currentColor"
// // //                                 viewBox="0 0 20 20"
// // //                               >
// // //                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// // //                               </svg>
// // //                             ))}
// // //                           </div>
// // //                           <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
// // //                             ({product.reviews || 0})
// // //                           </span>
// // //                         </div>

// // //                         <div className="flex items-center justify-between">
// // //                           <div className="flex items-center gap-2">
// // //                             <span className="text-lg font-bold text-gray-900 dark:text-white">
// // //                               ${product.price}
// // //                             </span>
// // //                             {product.originalPrice && (
// // //                               <span className="text-sm text-gray-500 line-through">
// // //                                 ${product.originalPrice}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                           <button
// // //                             onClick={(e) => handleAddToCart(e, product)}
// // //                             className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
// // //                           >
// // //                             <svg
// // //                               className="h-4 w-4"
// // //                               fill="none"
// // //                               viewBox="0 0 24 24"
// // //                               stroke="currentColor"
// // //                             >
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
// // //                               />
// // //                             </svg>
// // //                             Add to Cart
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     // List Layout - Beautiful Design
// // //                     <div className="flex p-4 gap-4">
// // //                       <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
// // //                         <img
// // //                           src={product.image || "/api/placeholder/300/300"}
// // //                           alt={product.name}
// // //                           className="w-full h-full object-cover"
// // //                         />
// // //                         {product.isNew && (
// // //                           <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// // //                             New
// // //                           </span>
// // //                         )}
// // //                         {product.originalPrice && (
// // //                           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// // //                             Sale
// // //                           </span>
// // //                         )}
// // //                       </div>

// // //                       <div className="flex-1 min-w-0">
// // //                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
// // //                           {product.name}
// // //                         </h3>

// // //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
// // //                           {product.description}
// // //                         </p>

// // //                         {/* Rating */}
// // //                         <div className="flex items-center mb-3">
// // //                           <div className="flex items-center">
// // //                             {[...Array(5)].map((_, i) => (
// // //                               <svg
// // //                                 key={i}
// // //                                 className={`h-4 w-4 ${
// // //                                   i < Math.floor(product.rating || 4.5)
// // //                                     ? "text-yellow-400 fill-current"
// // //                                     : "text-gray-300"
// // //                                 }`}
// // //                                 fill="currentColor"
// // //                                 viewBox="0 0 20 20"
// // //                               >
// // //                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// // //                               </svg>
// // //                             ))}
// // //                           </div>
// // //                           <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
// // //                             ({product.reviews || 0})
// // //                           </span>
// // //                         </div>

// // //                         <div className="flex items-center justify-between">
// // //                           <div className="flex items-center gap-2">
// // //                             <span className="text-lg font-bold text-gray-900 dark:text-white">
// // //                               ${product.price}
// // //                             </span>
// // //                             {product.originalPrice && (
// // //                               <span className="text-sm text-gray-500 line-through">
// // //                                 ${product.originalPrice}
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                           <button
// // //                             onClick={(e) => handleAddToCart(e, product)}
// // //                             className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
// // //                           >
// // //                             <svg
// // //                               className="h-4 w-4"
// // //                               fill="none"
// // //                               viewBox="0 0 24 24"
// // //                               stroke="currentColor"
// // //                             >
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
// // //                               />
// // //                             </svg>
// // //                             Add to Cart
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </motion.div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <motion.div
// // //               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center"
// // //               initial={{ opacity: 0, scale: 0.95 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ duration: 0.3 }}
// // //             >
// // //               <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
// // //               <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
// // //                 No products found
// // //               </h3>
// // //               <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
// // //                 We couldn't find any products matching your criteria. Try
// // //                 adjusting your filters or search terms.
// // //               </p>
// // //               <button
// // //                 onClick={clearAllFilters}
// // //                 className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
// // //               >
// // //                 <X className="h-4 w-4 mr-2" />
// // //                 Clear all filters
// // //               </button>
// // //             </motion.div>
// // //           )}
// // //         </motion.div>
// // //       </div>

// // //       {/* Mobile Filters Modal */}
// // //       {showMobileFilters && (
// // //         <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
// // //           <div
// // //             className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
// // //             onClick={() => setShowMobileFilters(false)}
// // //           ></div>

// // //           <motion.div
// // //             className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
// // //             initial={{ x: "-100%", opacity: 0 }}
// // //             animate={{ x: 0, opacity: 1 }}
// // //             exit={{ x: "-100%", opacity: 0 }}
// // //             transition={{ type: "spring", stiffness: 300, damping: 30 }}
// // //           >
// // //             <div className="h-full flex flex-col overflow-y-auto">
// // //               <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
// // //                 <h2 className="text-lg font-semibold flex items-center">
// // //                   <Filter className="h-5 w-5 mr-2 text-primary-600" />
// // //                   Filters
// // //                 </h2>
// // //                 <button
// // //                   onClick={() => setShowMobileFilters(false)}
// // //                   className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
// // //                 >
// // //                   <X className="h-6 w-6" />
// // //                 </button>
// // //               </div>

// // //               <div className="flex-1 p-4">
// // //                 {/* Mobile Search */}
// // //                 <div className="mb-6">
// // //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                     Search Products
// // //                   </label>
// // //                   <div className="relative">
// // //                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// // //                     <input
// // //                       type="text"
// // //                       placeholder="Search..."
// // //                       value={searchTerm}
// // //                       onChange={(e) => setSearchTerm(e.target.value)}
// // //                       className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 {/* Mobile Categories */}
// // //                 <div className="mb-6">
// // //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// // //                     Categories
// // //                   </label>
// // //                   <div className="space-y-2">
// // //                     <button
// // //                       onClick={() => {
// // //                         setSelectedCategory(null);
// // //                         setShowMobileFilters(false);
// // //                       }}
// // //                       className={`w-full text-left px-3 py-2 rounded-md text-sm ${
// // //                         !selectedCategory
// // //                           ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
// // //                           : "hover:bg-gray-100 dark:hover:bg-gray-700"
// // //                       }`}
// // //                     >
// // //                       All Products
// // //                     </button>
// // //                     {categories.map((category) => (
// // //                       <button
// // //                         key={category}
// // //                         onClick={() => {
// // //                           setSelectedCategory(category);
// // //                           setShowMobileFilters(false);
// // //                         }}
// // //                         className={`w-full text-left px-3 py-2 rounded-md text-sm ${
// // //                           selectedCategory === category
// // //                             ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
// // //                             : "hover:bg-gray-100 dark:hover:bg-gray-700"
// // //                         }`}
// // //                       >
// // //                         {category.replace(/_/g, " ")}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="p-4 border-t border-gray-200 dark:border-gray-700">
// // //                 <button
// // //                   onClick={() => setShowMobileFilters(false)}
// // //                   className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
// // //                 >
// // //                   Apply Filters
// // //                 </button>

// // //                 {(selectedCategory || searchTerm) && (
// // //                   <button
// // //                     onClick={() => {
// // //                       clearAllFilters();
// // //                       setShowMobileFilters(false);
// // //                     }}
// // //                     className="w-full mt-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-center font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// // //                   >
// // //                     Clear Filters
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       )}

// // //       {/* Mobile Filters Button */}
// // //       <div className="lg:hidden fixed bottom-6 right-6 z-40">
// // //         <button
// // //           onClick={() => setShowMobileFilters(true)}
// // //           className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center space-x-2"
// // //         >
// // //           <Filter className="h-5 w-5" />
// // //           {activeFilters > 0 && (
// // //             <span className="bg-white text-primary-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
// // //               {activeFilters}
// // //             </span>
// // //           )}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductListingPage;

// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Filter,
// //   ShoppingBag,
// //   ArrowUpDown,
// //   Grid,
// //   List,
// //   X,
// //   ChevronDown,
// //   Search,
// //   Tag,
// // } from "lucide-react";
// // import ProductList from "../../components/products/ProductList";
// // import { useProduct } from "../../hooks/useProduct";
// // import { useCart } from "../../context/CartContext";
// // import LoadingSpinner from "../../components/shared/LoadingSpinner";
// // import axios from "axios";

// // const ProductListingPage: React.FC = () => {
// //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
// //   const [selectedSort, setSelectedSort] = useState<string>("featured");
// //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// //   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [addingToCart, setAddingToCart] = useState<string | null>(null); // Track which product is being added
// //   const { allProducts, loading } = useProduct();
// //   const { addItem } = useCart();
// //   const navigate = useNavigate();

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <LoadingSpinner />
// //       </div>
// //     );
// //   }

// //   const categories = Array.from(new Set(allProducts.map((p) => p.category)));

// //   // Apply filters and sorting
// //   let filteredProducts = allProducts;

// //   // Filter by category
// //   if (selectedCategory) {
// //     filteredProducts = filteredProducts.filter(
// //       (p) => p.category === selectedCategory
// //     );
// //   }

// //   // Filter by search term
// //   if (searchTerm) {
// //     filteredProducts = filteredProducts.filter(
// //       (p) =>
// //         p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         p.description?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   }

// //   // Sort products based on selection
// //   switch (selectedSort) {
// //     case "price-low":
// //       filteredProducts = [...filteredProducts].sort(
// //         (a, b) => a.price - b.price
// //       );
// //       break;
// //     case "price-high":
// //       filteredProducts = [...filteredProducts].sort(
// //         (a, b) => b.price - a.price
// //       );
// //       break;
// //     case "newest":
// //       filteredProducts = [...filteredProducts].sort(
// //         (a, b) =>
// //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// //       );
// //       break;
// //     case "name-az":
// //       filteredProducts = [...filteredProducts].sort((a, b) =>
// //         a.name.localeCompare(b.name)
// //       );
// //       break;
// //     default:
// //       break;
// //   }

// //   const activeFilters = (selectedCategory ? 1 : 0) + (searchTerm ? 1 : 0);

// //   // Animation variants
// //   const fadeIn = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1, transition: { duration: 0.4 } },
// //   };

// //   const slideDown = {
// //     hidden: { opacity: 0, y: -20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
// //   };

// //   const clearAllFilters = () => {
// //     setSelectedCategory(null);
// //     setSearchTerm("");
// //   };

// //   // Handle product click navigation
// //   const handleProductClick = (productId: string) => {
// //     navigate(`/products/${productId}`);
// //   };

// //   // Handle add to cart - Using your exact cart system with authentication
// //   const handleAddToCart = async (e: React.MouseEvent, product: any) => {
// //     e.stopPropagation(); // Prevent navigation when clicking add to cart

// //     // Check if user is logged in
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       // Redirect to login if not authenticated
// //       navigate("/login");
// //       return;
// //     }

// //     // Prevent multiple clicks on same product
// //     if (addingToCart === product.id) return;

// //     setAddingToCart(product.id);
// //     console.log(`Adding product ${product.id} to cart`);

// //     try {
// //       // Make API call to add to cart (matching your ProductDetails implementation)
// //       const response = await axios.post(
// //         "http://localhost:4000/api/cart/items",
// //         {
// //           productId: product.id,
// //           quantity: 1, // Default quantity for quick add
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       if (response.data.status === "success") {
// //         console.log("API success response:", response.data);

// //         // Update local cart state (matching your exact implementation)
// //         const cartData = response.data.data.cart;

// //         // Find the current item in the response
// //         const currentItem = cartData.items.find(
// //           (item: any) => item.productId === product.id
// //         );

// //         if (currentItem) {
// //           // Check if we have an image before adding to cart
// //           const hasImage =
// //             currentItem.product.images && currentItem.product.images.length > 0;

// //           if (hasImage) {
// //             const imageUrl = `http://localhost:4000${currentItem.product.images[0]}`;

// //             // Create cart item with exact structure from your ProductDetails
// //             const cartItem = {
// //               id: currentItem.id,
// //               productId: product.id,
// //               name: product.name,
// //               price:
// //                 typeof product.price === "string"
// //                   ? parseFloat(product.price)
// //                   : product.price,
// //               quantity: currentItem.quantity, // Use quantity from API
// //               image: imageUrl,
// //               stockQuantity: product.stock || 10,
// //               attributes: {},
// //             };

// //             console.log("Adding to local cart:", cartItem);

// //             // Add to cart context
// //             addItem(cartItem);

// //             // Show success message (optional)
// //             console.log(`Successfully added ${product.name} to cart`);
// //           } else {
// //             console.warn("Product has no images, skipping add to cart");
// //           }
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error adding item to cart:", error);

// //       // If auth error, redirect to login
// //       if (axios.isAxiosError(error) && error.response?.status === 401) {
// //         console.log("Auth error, redirecting to login");
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         navigate("/login");
// //       }
// //     } finally {
// //       setAddingToCart(null);
// //     }
// //   };

// //   return (
// //     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
// //       {/* Hero Banner */}
// //       <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 text-white overflow-hidden">
// //         <div className="absolute inset-0 bg-black/10"></div>
// //         <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
// //         <div className="relative container mx-auto px-4 py-16 md:py-24">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="text-center"
// //           >
// //             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
// //               Explore Our Products
// //             </h1>
// //             <p className="text-primary-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
// //               Discover our extensive collection of premium products designed to
// //               meet your every need. Quality, innovation, and value in every
// //               purchase.
// //             </p>
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Breadcrumbs */}
// //       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="text-sm text-gray-500 dark:text-gray-400">
// //             <span
// //               onClick={() => navigate("/")}
// //               className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
// //             >
// //               Home
// //             </span>
// //             <span className="mx-2">/</span>
// //             <span className="font-medium text-gray-800 dark:text-gray-200">
// //               Products
// //             </span>
// //             {selectedCategory && (
// //               <>
// //                 <span className="mx-2">/</span>
// //                 <span className="font-medium text-primary-600 dark:text-primary-400">
// //                   {selectedCategory}
// //                 </span>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filters & Controls Section */}
// //       <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
// //         <div className="container mx-auto px-4 py-6">
// //           {/* Search Bar */}
// //           <motion.div
// //             className="mb-6"
// //             initial="hidden"
// //             animate="visible"
// //             variants={slideDown}
// //           >
// //             <div className="relative max-w-md mx-auto">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search products..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
// //               />
// //             </div>
// //           </motion.div>

// //           {/* Categories Filter */}
// //           <motion.div
// //             className="mb-6"
// //             initial="hidden"
// //             animate="visible"
// //             variants={slideDown}
// //             transition={{ delay: 0.1 }}
// //           >
// //             <div className="flex items-center mb-4">
// //               <Tag className="h-5 w-5 text-primary-600 mr-2" />
// //               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
// //                 Categories
// //               </h3>
// //             </div>

// //             <div className="hidden md:flex flex-wrap gap-3">
// //               <button
// //                 onClick={() => setSelectedCategory(null)}
// //                 className={`px-4 py-2 rounded-full border transition-all duration-200 ${
// //                   !selectedCategory
// //                     ? "bg-primary-600 text-white border-primary-600 shadow-md"
// //                     : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
// //                 }`}
// //               >
// //                 All Products
// //               </button>
// //               {categories.map((category) => (
// //                 <button
// //                   key={category}
// //                   onClick={() => setSelectedCategory(category)}
// //                   className={`px-4 py-2 rounded-full border transition-all duration-200 ${
// //                     selectedCategory === category
// //                       ? "bg-primary-600 text-white border-primary-600 shadow-md"
// //                       : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
// //                   }`}
// //                 >
// //                   {category.replace(/_/g, " ")}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Mobile Category Dropdown */}
// //             <div className="md:hidden">
// //               <select
// //                 value={selectedCategory || ""}
// //                 onChange={(e) => setSelectedCategory(e.target.value || null)}
// //                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
// //               >
// //                 <option value="">All Categories</option>
// //                 {categories.map((category) => (
// //                   <option key={category} value={category}>
// //                     {category.replace(/_/g, " ")}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </motion.div>

// //           {/* Controls Bar */}
// //           <motion.div
// //             className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
// //             initial="hidden"
// //             animate="visible"
// //             variants={slideDown}
// //             transition={{ delay: 0.2 }}
// //           >
// //             {/* Results Count & Active Filters */}
// //             <div className="flex items-center flex-wrap gap-4">
// //               <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
// //                 {filteredProducts.length} of {allProducts.length} products
// //               </span>

// //               {activeFilters > 0 && (
// //                 <div className="flex items-center gap-2">
// //                   <span className="text-sm text-gray-500">Filters:</span>
// //                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
// //                     {activeFilters} active
// //                   </span>
// //                   <button
// //                     onClick={clearAllFilters}
// //                     className="text-sm text-primary-600 hover:text-primary-700 font-medium"
// //                   >
// //                     Clear all
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Sort & View Controls */}
// //             <div className="flex items-center gap-4">
// //               {/* Sort Dropdown */}
// //               <div className="relative">
// //                 <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
// //                   <ArrowUpDown className="h-4 w-4 text-gray-500" />
// //                   <select
// //                     value={selectedSort}
// //                     onChange={(e) => setSelectedSort(e.target.value)}
// //                     className="appearance-none bg-transparent pr-6 font-medium focus:outline-none cursor-pointer text-gray-800 dark:text-gray-200 text-sm"
// //                   >
// //                     <option value="featured">Featured</option>
// //                     <option value="newest">Newest</option>
// //                     <option value="name-az">Name A-Z</option>
// //                     <option value="price-low">Price: Low to High</option>
// //                     <option value="price-high">Price: High to Low</option>
// //                   </select>
// //                   <ChevronDown className="h-4 w-4 text-gray-500 absolute right-1 pointer-events-none" />
// //                 </div>
// //               </div>

// //               {/* View Mode Toggle */}
// //               <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
// //                 <button
// //                   onClick={() => setViewMode("grid")}
// //                   className={`p-2 rounded-md transition-all ${
// //                     viewMode === "grid"
// //                       ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
// //                       : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// //                   }`}
// //                   aria-label="Grid view"
// //                 >
// //                   <Grid className="h-4 w-4" />
// //                 </button>
// //                 <button
// //                   onClick={() => setViewMode("list")}
// //                   className={`p-2 rounded-md transition-all ${
// //                     viewMode === "list"
// //                       ? "bg-white dark:bg-gray-600 text-primary-600 shadow-sm"
// //                       : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// //                   }`}
// //                   aria-label="List view"
// //                 >
// //                   <List className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Products Section */}
// //       <div className="container mx-auto px-4 py-8">
// //         <motion.div
// //           key={`${selectedCategory}-${selectedSort}-${viewMode}-${searchTerm}`}
// //           initial="hidden"
// //           animate="visible"
// //           variants={fadeIn}
// //         >
// //           {filteredProducts.length > 0 ? (
// //             <div
// //               className={
// //                 viewMode === "grid"
// //                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
// //                   : "space-y-6"
// //               }
// //             >
// //               {filteredProducts.map((product, index) => (
// //                 <motion.div
// //                   key={product.id}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: index * 0.05, duration: 0.3 }}
// //                   className={
// //                     viewMode === "grid"
// //                       ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
// //                       : "bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
// //                   }
// //                   onClick={() => handleProductClick(product.id)}
// //                 >
// //                   {viewMode === "grid" ? (
// //                     // Grid Layout - Beautiful Design
// //                     <div className="h-full flex flex-col">
// //                       <div className="relative overflow-hidden aspect-square">
// //                         <img
// //                           src={product.image || "/api/placeholder/300/300"}
// //                           alt={product.name}
// //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                         />
// //                         {product.isNew && (
// //                           <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// //                             New
// //                           </span>
// //                         )}
// //                         {product.originalPrice && (
// //                           <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// //                             Sale
// //                           </span>
// //                         )}
// //                       </div>

// //                       <div className="p-4 flex-1 flex flex-col">
// //                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
// //                           {product.name}
// //                         </h3>
// //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
// //                           {product.description}
// //                         </p>

// //                         {/* Rating */}
// //                         <div className="flex items-center mb-3">
// //                           <div className="flex items-center">
// //                             {[...Array(5)].map((_, i) => (
// //                               <svg
// //                                 key={i}
// //                                 className={`h-4 w-4 ${
// //                                   i < Math.floor(product.rating || 4.5)
// //                                     ? "text-yellow-400 fill-current"
// //                                     : "text-gray-300"
// //                                 }`}
// //                                 fill="currentColor"
// //                                 viewBox="0 0 20 20"
// //                               >
// //                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                               </svg>
// //                             ))}
// //                           </div>
// //                           <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
// //                             ({product.reviews || 0})
// //                           </span>
// //                         </div>

// //                         <div className="flex items-center justify-between">
// //                           <div className="flex items-center gap-2">
// //                             <span className="text-lg font-bold text-gray-900 dark:text-white">
// //                               ${product.price}
// //                             </span>
// //                             {product.originalPrice && (
// //                               <span className="text-sm text-gray-500 line-through">
// //                                 ${product.originalPrice}
// //                               </span>
// //                             )}
// //                           </div>
// //                           <button
// //                             onClick={(e) => handleAddToCart(e, product)}
// //                             disabled={addingToCart === product.id}
// //                             className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
// //                           >
// //                             {addingToCart === product.id ? (
// //                               <>
// //                                 <svg
// //                                   className="animate-spin h-4 w-4 text-white"
// //                                   xmlns="http://www.w3.org/2000/svg"
// //                                   fill="none"
// //                                   viewBox="0 0 24 24"
// //                                 >
// //                                   <circle
// //                                     className="opacity-25"
// //                                     cx="12"
// //                                     cy="12"
// //                                     r="10"
// //                                     stroke="currentColor"
// //                                     strokeWidth="4"
// //                                   ></circle>
// //                                   <path
// //                                     className="opacity-75"
// //                                     fill="currentColor"
// //                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                                   ></path>
// //                                 </svg>
// //                                 Adding...
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <svg
// //                                   className="h-4 w-4"
// //                                   fill="none"
// //                                   viewBox="0 0 24 24"
// //                                   stroke="currentColor"
// //                                 >
// //                                   <path
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth={2}
// //                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
// //                                   />
// //                                 </svg>
// //                                 Add to Cart
// //                               </>
// //                             )}
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     // List Layout - Beautiful Design
// //                     <div className="flex p-4 gap-4">
// //                       <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
// //                         <img
// //                           src={product.image || "/api/placeholder/300/300"}
// //                           alt={product.name}
// //                           className="w-full h-full object-cover"
// //                         />
// //                         {product.isNew && (
// //                           <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// //                             New
// //                           </span>
// //                         )}
// //                         {product.originalPrice && (
// //                           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
// //                             Sale
// //                           </span>
// //                         )}
// //                       </div>

// //                       <div className="flex-1 min-w-0">
// //                         <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
// //                           {product.name}
// //                         </h3>

// //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
// //                           {product.description}
// //                         </p>

// //                         {/* Rating */}
// //                         <div className="flex items-center mb-3">
// //                           <div className="flex items-center">
// //                             {[...Array(5)].map((_, i) => (
// //                               <svg
// //                                 key={i}
// //                                 className={`h-4 w-4 ${
// //                                   i < Math.floor(product.rating || 4.5)
// //                                     ? "text-yellow-400 fill-current"
// //                                     : "text-gray-300"
// //                                 }`}
// //                                 fill="currentColor"
// //                                 viewBox="0 0 20 20"
// //                               >
// //                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                               </svg>
// //                             ))}
// //                           </div>
// //                           <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
// //                             ({product.reviews || 0})
// //                           </span>
// //                         </div>

// //                         <div className="flex items-center justify-between">
// //                           <div className="flex items-center gap-2">
// //                             <span className="text-lg font-bold text-gray-900 dark:text-white">
// //                               ${product.price}
// //                             </span>
// //                             {product.originalPrice && (
// //                               <span className="text-sm text-gray-500 line-through">
// //                                 ${product.originalPrice}
// //                               </span>
// //                             )}
// //                           </div>
// //                           <button
// //                             onClick={(e) => handleAddToCart(e, product)}
// //                             disabled={addingToCart === product.id}
// //                             className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
// //                           >
// //                             {addingToCart === product.id ? (
// //                               <>
// //                                 <svg
// //                                   className="animate-spin h-4 w-4 text-white"
// //                                   xmlns="http://www.w3.org/2000/svg"
// //                                   fill="none"
// //                                   viewBox="0 0 24 24"
// //                                 >
// //                                   <circle
// //                                     className="opacity-25"
// //                                     cx="12"
// //                                     cy="12"
// //                                     r="10"
// //                                     stroke="currentColor"
// //                                     strokeWidth="4"
// //                                   ></circle>
// //                                   <path
// //                                     className="opacity-75"
// //                                     fill="currentColor"
// //                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                                   ></path>
// //                                 </svg>
// //                                 Adding...
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <svg
// //                                   className="h-4 w-4"
// //                                   fill="none"
// //                                   viewBox="0 0 24 24"
// //                                   stroke="currentColor"
// //                                 >
// //                                   <path
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth={2}
// //                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
// //                                   />
// //                                 </svg>
// //                                 Add to Cart
// //                               </>
// //                             )}
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </motion.div>
// //               ))}
// //             </div>
// //           ) : (
// //             <motion.div
// //               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center"
// //               initial={{ opacity: 0, scale: 0.95 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
// //               <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
// //                 No products found
// //               </h3>
// //               <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
// //                 We couldn't find any products matching your criteria. Try
// //                 adjusting your filters or search terms.
// //               </p>
// //               <button
// //                 onClick={clearAllFilters}
// //                 className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
// //               >
// //                 <X className="h-4 w-4 mr-2" />
// //                 Clear all filters
// //               </button>
// //             </motion.div>
// //           )}
// //         </motion.div>
// //       </div>

// //       {/* Mobile Filters Modal */}
// //       {showMobileFilters && (
// //         <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
// //           <div
// //             className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
// //             onClick={() => setShowMobileFilters(false)}
// //           ></div>

// //           <motion.div
// //             className="absolute inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
// //             initial={{ x: "-100%", opacity: 0 }}
// //             animate={{ x: 0, opacity: 1 }}
// //             exit={{ x: "-100%", opacity: 0 }}
// //             transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //           >
// //             <div className="h-full flex flex-col overflow-y-auto">
// //               <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
// //                 <h2 className="text-lg font-semibold flex items-center">
// //                   <Filter className="h-5 w-5 mr-2 text-primary-600" />
// //                   Filters
// //                 </h2>
// //                 <button
// //                   onClick={() => setShowMobileFilters(false)}
// //                   className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
// //                 >
// //                   <X className="h-6 w-6" />
// //                 </button>
// //               </div>

// //               <div className="flex-1 p-4">
// //                 {/* Mobile Search */}
// //                 <div className="mb-6">
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     Search Products
// //                   </label>
// //                   <div className="relative">
// //                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //                     <input
// //                       type="text"
// //                       placeholder="Search..."
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                       className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Mobile Categories */}
// //                 <div className="mb-6">
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     Categories
// //                   </label>
// //                   <div className="space-y-2">
// //                     <button
// //                       onClick={() => {
// //                         setSelectedCategory(null);
// //                         setShowMobileFilters(false);
// //                       }}
// //                       className={`w-full text-left px-3 py-2 rounded-md text-sm ${
// //                         !selectedCategory
// //                           ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
// //                           : "hover:bg-gray-100 dark:hover:bg-gray-700"
// //                       }`}
// //                     >
// //                       All Products
// //                     </button>
// //                     {categories.map((category) => (
// //                       <button
// //                         key={category}
// //                         onClick={() => {
// //                           setSelectedCategory(category);
// //                           setShowMobileFilters(false);
// //                         }}
// //                         className={`w-full text-left px-3 py-2 rounded-md text-sm ${
// //                           selectedCategory === category
// //                             ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
// //                             : "hover:bg-gray-100 dark:hover:bg-gray-700"
// //                         }`}
// //                       >
// //                         {category.replace(/_/g, " ")}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="p-4 border-t border-gray-200 dark:border-gray-700">
// //                 <button
// //                   onClick={() => setShowMobileFilters(false)}
// //                   className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
// //                 >
// //                   Apply Filters
// //                 </button>

// //                 {(selectedCategory || searchTerm) && (
// //                   <button
// //                     onClick={() => {
// //                       clearAllFilters();
// //                       setShowMobileFilters(false);
// //                     }}
// //                     className="w-full mt-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-center font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// //                   >
// //                     Clear Filters
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       )}

// //       {/* Mobile Filters Button */}
// //       <div className="lg:hidden fixed bottom-6 right-6 z-40">
// //         <button
// //           onClick={() => setShowMobileFilters(true)}
// //           className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center space-x-2"
// //         >
// //           <Filter className="h-5 w-5" />
// //           {activeFilters > 0 && (
// //             <span className="bg-white text-primary-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
// //               {activeFilters}
// //             </span>
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductListingPage;

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
// } from "lucide-react";
// import ProductList from "../../components/products/ProductList";
// import { useProduct } from "../../hooks/useProduct";
// import { useCart } from "../../context/CartContext";
// import LoadingSpinner from "../../components/shared/LoadingSpinner";
// import axios from "axios";

// // Login Modal Component (same as ProductDetails)
// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const LoginModal: React.FC<LoginModalProps> = ({
//   isOpen,
//   onClose,
//   onSuccess,
// }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Reset form when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setEmail("");
//       setPassword("");
//       setError("");
//     }
//   }, [isOpen]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.data.status === "success") {
//         // Store token and user data
//         localStorage.setItem("token", response.data.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.data.user));

//         // Clear form
//         setEmail("");
//         setPassword("");

//         // Notify parent component of successful login
//         onSuccess();
//       } else {
//         setError("Invalid login credentials");
//       }
//     } catch (err) {
//       setError("Login failed. Please check your credentials and try again.");
//       console.error("Login error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // If modal is not open, don't render anything
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-[9999]"
//       style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
//     >
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
//         style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
//       ></div>

//       {/* Modal */}
//       <div
//         className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden relative z-[10000]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Sign In Required
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-500 focus:outline-none"
//             type="button"
//           >
//             <svg
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
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-6 py-4">
//           <p className="text-gray-600 mb-6">
//             Please sign in to add items to your cart
//           </p>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Signing in...
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//           <p className="text-sm text-gray-600 text-center">
//             Don't have an account?{" "}
//             <a
//               href="/register"
//               className="text-indigo-600 hover:text-indigo-700 font-medium"
//             >
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductListingPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSort, setSelectedSort] = useState<string>("featured");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [addingToCart, setAddingToCart] = useState<string | null>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [pendingCartProduct, setPendingCartProduct] = useState<any>(null); // Store product to add after login
//   const { allProducts, loading } = useProduct();
//   const { addItem } = useCart();
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

//   // Handle add to cart - Using popup login modal instead of redirect
//   const handleAddToCart = (e: React.MouseEvent, product: any) => {
//     e.stopPropagation(); // Prevent navigation when clicking add to cart

//     // Check if user is logged in
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // Show login modal instead of redirecting
//       console.log("No token found, showing login modal");
//       setPendingCartProduct(product);
//       setIsLoginModalOpen(true);
//       return;
//     }

//     console.log("Token found, processing add to cart");
//     processAddToCart(token, product);
//   };

//   const processAddToCart = async (token: string, product: any) => {
//     // Prevent multiple clicks on same product
//     if (addingToCart === product.id) return;

//     setAddingToCart(product.id);
//     console.log(`Adding product ${product.id} to cart`);

//     try {
//       // Make API call to add to cart (matching your ProductDetails implementation)
//       const response = await axios.post(
//         "http://localhost:4000/api/cart/items",
//         {
//           productId: product.id,
//           quantity: 1, // Default quantity for quick add
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         console.log("API success response:", response.data);

//         // Update local cart state (matching your exact implementation)
//         const cartData = response.data.data.cart;

//         // Find the current item in the response
//         const currentItem = cartData.items.find(
//           (item: any) => item.productId === product.id
//         );

//         if (currentItem) {
//           // Check if we have an image before adding to cart
//           const hasImage =
//             currentItem.product.images && currentItem.product.images.length > 0;

//           if (hasImage) {
//             const imageUrl = `http://localhost:4000${currentItem.product.images[0]}`;

//             // Create cart item with exact structure from your ProductDetails
//             const cartItem = {
//               id: currentItem.id,
//               productId: product.id,
//               name: product.name,
//               price:
//                 typeof product.price === "string"
//                   ? parseFloat(product.price)
//                   : product.price,
//               quantity: currentItem.quantity, // Use quantity from API
//               image: imageUrl,
//               stockQuantity: product.stock || 10,
//               attributes: {},
//             };

//             console.log("Adding to local cart:", cartItem);

//             // Add to cart context
//             addItem(cartItem);

//             // Show success message
//             console.log(`Successfully added ${product.name} to cart`);
//           } else {
//             console.warn("Product has no images, skipping add to cart");
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error);

//       // If auth error, show login modal
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         console.log("Auth error, showing login modal");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setPendingCartProduct(product);
//         setIsLoginModalOpen(true);
//       }
//     } finally {
//       setAddingToCart(null);
//     }
//   };

//   const handleLoginSuccess = () => {
//     console.log("Login success callback triggered");
//     setIsLoginModalOpen(false);

//     // Get the token after successful login
//     const token = localStorage.getItem("token");
//     if (token && pendingCartProduct) {
//       console.log("Processing add to cart after login");
//       processAddToCart(token, pendingCartProduct);
//       setPendingCartProduct(null);
//     }
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       {/* Hero Banner */}
//       <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 text-white overflow-hidden">
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
//       </div>

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
//           <motion.div
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
//           </motion.div>

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
//                             onClick={(e) => handleAddToCart(e, product)}
//                             disabled={addingToCart === product.id}
//                             className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                           >
//                             {addingToCart === product.id ? (
//                               <>
//                                 <svg
//                                   className="animate-spin h-4 w-4 text-white"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                   ></circle>
//                                   <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                   ></path>
//                                 </svg>
//                                 Adding...
//                               </>
//                             ) : (
//                               <>
//                                 <svg
//                                   className="h-4 w-4"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
//                                   />
//                                 </svg>
//                                 Add to Cart
//                               </>
//                             )}
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
//                             onClick={(e) => handleAddToCart(e, product)}
//                             disabled={addingToCart === product.id}
//                             className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                           >
//                             {addingToCart === product.id ? (
//                               <>
//                                 <svg
//                                   className="animate-spin h-4 w-4 text-white"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                   ></circle>
//                                   <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                   ></path>
//                                 </svg>
//                                 Adding...
//                               </>
//                             ) : (
//                               <>
//                                 <svg
//                                   className="h-4 w-4"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   stroke="currentColor"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
//                                   />
//                                 </svg>
//                                 Add to Cart
//                               </>
//                             )}
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
import { motion } from "framer-motion";
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
  Eye,
} from "lucide-react";
import ProductList from "../../components/products/ProductList";
import { useProduct } from "../../hooks/useProduct";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ProductListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const { allProducts, loading } = useProduct();
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

  // Handle product click navigation
  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // // Handle product click navigation (same for clicking image or View button)
  // const handleProductClick = (productId: string) => {
  //   navigate(`/products/${productId}`);
  // };

  // Handle View button click (same as clicking product image)
  const handleViewProduct = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent double navigation
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Banner */}
      {/* <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Explore Our Products
            </h1>
            <p className="text-primary-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our extensive collection of premium products designed to
              meet your every need. Quality, innovation, and value in every
              purchase.
            </p>
          </motion.div>
        </div>
      </div> */}

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
          {/* Search Bar */}
          {/* <motion.div
            className="mb-6"
            initial="hidden"
            animate="visible"
            variants={slideDown}
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </motion.div> */}

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
                            onClick={(e) => handleViewProduct(e, product)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
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
                            onClick={(e) => handleViewProduct(e, product)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
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
