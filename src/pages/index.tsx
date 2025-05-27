// // // src/pages/index.tsx
// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   Star,
// //   Truck,
// //   Shield,
// //   RefreshCcw,
// //   ChevronDown,
// //   ChevronUp,
// //   Clock,
// //   CheckCircle,
// //   // Remove unused ArrowUp import
// //   ArrowRight,
// //   Sparkles,
// // } from "lucide-react";

// // import Layout from "../components/common/Layout";
// // import { ProductCard } from "../components/products/ProductCard";
// // import { useProduct } from "../hooks/useProduct";
// // import HeroCarousel from "../components/hero/HeroCarousel";

// // const LandingPage = () => {
// //   const { featuredProducts, topSellingProducts, loading } = useProduct();
// //   const [showAllFeatured, setShowAllFeatured] = useState(false);
// //   // Remove unused showScrollTop state
// //   const navigate = useNavigate();

// //   // Get only products marked as featured for the landing page
// //   const displayedFeatured = showAllFeatured
// //     ? featuredProducts
// //     : featuredProducts.slice(0, 4);

// //   // Get top selling products for a new section
// //   const topSellers = topSellingProducts?.slice(0, 4) || [];

// //   // Remove unused scroll effect and showScrollTop state

// //   // Navigate to all products
// //   const goToAllProducts = () => {
// //     navigate("/products");
// //   };

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const sectionFadeIn = {
// //     hidden: { opacity: 0, y: 40 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.6,
// //       },
// //     },
// //   };

// //   const testimonials = [
// //     {
// //       text: "Amazing quality and fast shipping. Will definitely shop here again!",
// //       author: "Sarah Johnson",
// //       role: "Verified Buyer",
// //       rating: 5,
// //     },
// //     {
// //       text: "The customer service is exceptional. They went above and beyond to help me.",
// //       author: "Michael Chen",
// //       role: "Premium Member",
// //       rating: 5,
// //     },
// //     {
// //       text: "High-quality products at great prices. This is now my go-to store!",
// //       author: "Emma Davis",
// //       role: "Verified Buyer",
// //       rating: 5,
// //     },
// //   ];

// //   const features = [
// //     {
// //       icon: Truck,
// //       title: "Free Shipping",
// //       desc: "On orders over $100",
// //     },
// //     {
// //       icon: Shield,
// //       title: "Secure Payment",
// //       desc: "100% secure checkout",
// //     },
// //     {
// //       icon: RefreshCcw,
// //       title: "Easy Returns",
// //       desc: "30-day return policy",
// //     },
// //     {
// //       icon: Clock,
// //       title: "24/7 Support",
// //       desc: "Always here to help",
// //     },
// //   ];

// //   // Remove unused navigateToAllProducts function as we're using goToAllProducts

// //   return (
// //     <Layout>
// //       {/* Enhanced Hero Section with Carousel */}
// //       <HeroCarousel />

// //       {/* Features Section */}
// //       <section className="py-20 bg-white dark:bg-gray-800">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
// //             {features.map((feature, index) => (
// //               <motion.div
// //                 key={index}
// //                 className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-200"
// //                 whileHover={{ y: -5 }}
// //                 transition={{ duration: 0.2 }}
// //               >
// //                 <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
// //                 <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
// //                 <p className="text-gray-600 dark:text-gray-300">
// //                   {feature.desc}
// //                 </p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Products - Enhanced */}
// //       <motion.section
// //         className="py-20 bg-gray-50 dark:bg-gray-900"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true, margin: "-100px" }}
// //         variants={sectionFadeIn}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <div className="inline-flex items-center px-4 py-1.5 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
// //               <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
// //               <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide uppercase">
// //                 Featured Collection
// //               </span>
// //             </div>
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
// //               Our Most Popular Items
// //             </h2>
// //             <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
// //               Discover our handpicked selection of premium products that our
// //               customers love
// //             </p>
// //           </div>

// //           {/* ADD THIS: Always visible "See All Products" button */}
// //           <Link
// //             to="/products"
// //             className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
// //           >
// //             See All Products
// //             <ArrowRight className="ml-2 h-5 w-5" />
// //           </Link>

// //           {loading ? (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //               {[...Array(4)].map((_, index) => (
// //                 <div
// //                   key={index}
// //                   className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
// //                 >
// //                   <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
// //                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
// //                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <AnimatePresence mode="wait">
// //               <motion.div
// //                 key={showAllFeatured ? "expanded" : "collapsed"}
// //                 variants={containerVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
// //               >
// //                 {displayedFeatured.map((product) => (
// //                   <ProductCard
// //                     key={product.id}
// //                     product={{
// //                       ...product,
// //                       // Add any additional properties needed for the enhanced product card
// //                       isNew: product.isNew || Math.random() > 0.7, // Example
// //                       originalPrice:
// //                         product.originalPrice || product.price * 1.2,
// //                     }}
// //                   />
// //                 ))}
// //               </motion.div>
// //             </AnimatePresence>
// //           )}

// //           <div className="text-center mt-12 space-y-4">
// //             <button
// //               onClick={() => setShowAllFeatured(!showAllFeatured)}
// //               className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-lg font-medium rounded-full text-primary-600 hover:bg-primary-50 transition-colors duration-200"
// //             >
// //               {showAllFeatured ? (
// //                 <>
// //                   View Less Products
// //                   <ChevronUp className="ml-2 h-5 w-5" />
// //                 </>
// //               ) : (
// //                 <>
// //                   View More Products
// //                   <ChevronDown className="ml-2 h-5 w-5" />
// //                 </>
// //               )}
// //             </button>

// //             {showAllFeatured && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.2 }}
// //               >
// //                 <Link
// //                   to="/products"
// //                   className="inline-flex items-center px-8 py-4 bg-primary-600 text-lg font-medium rounded-full text-white hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg"
// //                 >
// //                   Browse All Products
// //                   <ArrowRight className="ml-2 h-5 w-5" />
// //                 </Link>
// //               </motion.div>
// //             )}
// //           </div>
// //         </div>
// //       </motion.section>

// //       {/* Top Selling Products - New Section */}
// //       {topSellers.length > 0 && (
// //         <motion.section
// //           className="py-20 bg-white dark:bg-gray-800"
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true, margin: "-100px" }}
// //           variants={sectionFadeIn}
// //         >
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
// //               <div>
// //                 <div className="inline-flex items-center px-4 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
// //                   <Star className="h-4 w-4 text-red-600 dark:text-red-400 mr-2 fill-current" />
// //                   <span className="text-red-600 dark:text-red-400 font-semibold text-sm tracking-wide uppercase">
// //                     Bestsellers
// //                   </span>
// //                 </div>
// //                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
// //                   Top Selling Products
// //                 </h2>
// //                 <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
// //                   Our customers' favorites that keep selling out again and again
// //                 </p>
// //               </div>

// //               <Link
// //                 to="/products?category=bestseller"
// //                 className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
// //               >
// //                 View All Bestsellers
// //                 <ArrowRight className="ml-2 h-5 w-5" />
// //               </Link>
// //             </div>

// //             {loading ? (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //                 {[...Array(4)].map((_, index) => (
// //                   <div
// //                     key={index}
// //                     className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
// //                   >
// //                     <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
// //                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
// //                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <motion.div
// //                 variants={containerVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
// //               >
// //                 {topSellers.map((product) => (
// //                   <ProductCard
// //                     key={product.id}
// //                     product={{
// //                       ...product,
// //                       // Add any additional properties needed for the enhanced product card
// //                       originalPrice:
// //                         product.originalPrice ||
// //                         (Math.random() > 0.7 ? product.price * 1.2 : undefined),
// //                     }}
// //                   />
// //                 ))}
// //               </motion.div>
// //             )}
// //           </div>
// //         </motion.section>
// //       )}

// //       {/* Call to Action */}
// //       <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <h2 className="text-3xl font-bold text-white mb-6">
// //             Ready to Explore All Our Products?
// //           </h2>
// //           <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
// //             Discover our complete collection with thousands of products waiting
// //             for you
// //           </p>
// //           <button
// //             onClick={goToAllProducts}
// //             className="inline-flex items-center px-8 py-4 bg-white text-lg font-medium rounded-full text-primary-600 hover:bg-gray-100 transition-colors duration-200 shadow-md"
// //           >
// //             Shop All Products
// //             <ArrowRight className="ml-2 h-5 w-5" />
// //           </button>
// //         </div>
// //       </section>

// //       {/* Testimonials Section */}
// //       <section className="py-20 bg-gray-50 dark:bg-gray-900">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <div className="inline-flex items-center px-4 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
// //               <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
// //               <span className="text-green-600 dark:text-green-400 font-semibold text-sm tracking-wide uppercase">
// //                 Testimonials
// //               </span>
// //             </div>
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
// //               What Our Customers Say
// //             </h2>
// //             <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
// //               Don't just take our word for it - see what our happy customers
// //               have to share
// //             </p>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {testimonials.map((testimonial, index) => (
// //               <motion.div
// //                 key={index}
// //                 className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
// //                 whileHover={{ y: -5 }}
// //                 transition={{ duration: 0.2 }}
// //               >
// //                 <div className="flex text-primary-600 mb-4">
// //                   {[...Array(testimonial.rating)].map((_, i) => (
// //                     <Star key={i} className="h-5 w-5 fill-current" />
// //                   ))}
// //                 </div>
// //                 <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic">
// //                   "{testimonial.text}"
// //                 </p>
// //                 <div className="flex items-center">
// //                   <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
// //                     <span className="text-primary-700 font-bold text-lg">
// //                       {testimonial.author[0]}
// //                     </span>
// //                   </div>
// //                   <div className="ml-4">
// //                     <p className="font-semibold text-gray-900 dark:text-white">
// //                       {testimonial.author}
// //                     </p>
// //                     <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
// //                       <CheckCircle className="h-4 w-4 text-primary-600 mr-1" />
// //                       {testimonial.role}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Scroll to Top Button - Already commented out, but we also removed related code */}
// //     </Layout>
// //   );
// // };

// // export default LandingPage;

// // src/pages/index.tsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Star,
//   Truck,
//   Shield,
//   RefreshCcw,
//   Clock,
//   CheckCircle,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react";

// import Layout from "../components/common/Layout";
// import { ProductCard } from "../components/products/ProductCard";
// import { useProduct } from "../hooks/useProduct";
// import HeroCarousel from "../components/hero/HeroCarousel";

// // Product categories enum
// enum ProductCategory {
//   SMARTPHONES = "SMARTPHONES",
//   LAPTOPS = "LAPTOPS",
//   TVS = "TVS",
//   GAMING = "GAMING",
//   ACCESSORIES = "ACCESSORIES",
//   CAMERAS = "CAMERAS",
//   AUDIO = "AUDIO",
// }

// const LandingPage = () => {
//   const { allProducts, topSellingProducts, loading } = useProduct();
//   const navigate = useNavigate();

//   // Get one product from each of the first 4 categories
//   const getProductsByCategory = () => {
//     const categories = [
//       ProductCategory.SMARTPHONES,
//       ProductCategory.LAPTOPS,
//       ProductCategory.TVS,
//       ProductCategory.GAMING,
//     ];

//     const productsByCategory = categories
//       .map((category) => {
//         return allProducts.find((product) => product.category === category);
//       })
//       .filter(Boolean); // Remove any undefined values

//     return productsByCategory;
//   };

//   const categoryProducts = getProductsByCategory();

//   // Get top selling products for a new section (only first 4)
//   const topSellers = topSellingProducts?.slice(0, 4) || [];

//   // Navigate to all products
//   const goToAllProducts = () => {
//     navigate("/products");
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const sectionFadeIn = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//       },
//     },
//   };

//   const testimonials = [
//     {
//       text: "Amazing quality and fast shipping. Will definitely shop here again!",
//       author: "Sarah Johnson",
//       role: "Verified Buyer",
//       rating: 5,
//     },
//     {
//       text: "The customer service is exceptional. They went above and beyond to help me.",
//       author: "Michael Chen",
//       role: "Premium Member",
//       rating: 5,
//     },
//     {
//       text: "High-quality products at great prices. This is now my go-to store!",
//       author: "Emma Davis",
//       role: "Verified Buyer",
//       rating: 5,
//     },
//   ];

//   const features = [
//     {
//       icon: Truck,
//       title: "Free Shipping",
//       desc: "On orders over $100",
//     },
//     {
//       icon: Shield,
//       title: "Secure Payment",
//       desc: "100% secure checkout",
//     },
//     {
//       icon: RefreshCcw,
//       title: "Easy Returns",
//       desc: "30-day return policy",
//     },
//     {
//       icon: Clock,
//       title: "24/7 Support",
//       desc: "Always here to help",
//     },
//   ];

//   return (
//     <Layout>
//       {/* Enhanced Hero Section with Carousel */}
//       <HeroCarousel />

//       {/* Features Section */}
//       <section className="py-20 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-200"
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
//                 <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   {feature.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products by Category - One from Each Category */}
//       <motion.section
//         className="py-20 bg-gray-50 dark:bg-gray-900"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={sectionFadeIn}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center px-4 py-1.5 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
//               <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
//               <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide uppercase">
//                 Featured Categories
//               </span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
//               Explore Our Top Categories
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
//               Discover the best products from each of our popular categories
//             </p>
//           </div>

//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//               {[...Array(4)].map((_, index) => (
//                 <div
//                   key={index}
//                   className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
//                 >
//                   <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
//             >
//               {categoryProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <ProductCard
//                     product={{
//                       ...product,
//                       isNew: product.isNew || Math.random() > 0.7,
//                       originalPrice:
//                         product.originalPrice || product.price * 1.2,
//                     }}
//                   />
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           {/* View All Products Button */}
//           <div className="text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <Link
//                 to="/products"
//                 className="inline-flex items-center px-12 py-4 bg-primary-600 text-lg font-medium rounded-full text-white hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 View All Products
//                 <ArrowRight className="ml-3 h-6 w-6" />
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Top Selling Products - New Section */}
//       {topSellers.length > 0 && (
//         <motion.section
//           className="py-20 bg-white dark:bg-gray-800"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={sectionFadeIn}
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
//               <div>
//                 <div className="inline-flex items-center px-4 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
//                   <Star className="h-4 w-4 text-red-600 dark:text-red-400 mr-2 fill-current" />
//                   <span className="text-red-600 dark:text-red-400 font-semibold text-sm tracking-wide uppercase">
//                     Bestsellers
//                   </span>
//                 </div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
//                   Top Selling Products
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
//                   Our customers' favorites that keep selling out again and again
//                 </p>
//               </div>

//               <Link
//                 to="/products?category=bestseller"
//                 className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
//               >
//                 View All Bestsellers
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </div>

//             {loading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[...Array(4)].map((_, index) => (
//                   <div
//                     key={index}
//                     className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
//                   >
//                     <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
//               >
//                 {topSellers.map((product, index) => (
//                   <motion.div
//                     key={product.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <ProductCard
//                       product={{
//                         ...product,
//                         originalPrice:
//                           product.originalPrice ||
//                           (Math.random() > 0.7
//                             ? product.price * 1.2
//                             : undefined),
//                       }}
//                     />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </div>
//         </motion.section>
//       )}

//       {/* Call to Action */}
//       <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-6">
//             Ready to Explore All Our Products?
//           </h2>
//           <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
//             Discover our complete collection with thousands of products waiting
//             for you
//           </p>
//           <button
//             onClick={goToAllProducts}
//             className="inline-flex items-center px-8 py-4 bg-white text-lg font-medium rounded-full text-primary-600 hover:bg-gray-100 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//           >
//             Shop All Products
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </button>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center px-4 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
//               <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
//               <span className="text-green-600 dark:text-green-400 font-semibold text-sm tracking-wide uppercase">
//                 Testimonials
//               </span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
//               Don't just take our word for it - see what our happy customers
//               have to share
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
//                 whileHover={{ y: -5 }}
//                 transition={{ duration: 0.2 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <div className="flex text-primary-600 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic">
//                   "{testimonial.text}"
//                 </p>
//                 <div className="flex items-center">
//                   <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
//                     <span className="text-primary-700 font-bold text-lg">
//                       {testimonial.author[0]}
//                     </span>
//                   </div>
//                   <div className="ml-4">
//                     <p className="font-semibold text-gray-900 dark:text-white">
//                       {testimonial.author}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
//                       <CheckCircle className="h-4 w-4 text-primary-600 mr-1" />
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default LandingPage;

// src/pages/index.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Truck,
  Shield,
  RefreshCcw,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Layout from "../components/common/Layout";
import { useProduct } from "../hooks/useProduct";
import HeroCarousel from "../components/hero/HeroCarousel";

// Product categories enum
enum ProductCategory {
  SMARTPHONES = "SMARTPHONES",
  LAPTOPS = "LAPTOPS",
  TVS = "TVS",
  GAMING = "GAMING",
  ACCESSORIES = "ACCESSORIES",
  CAMERAS = "CAMERAS",
  AUDIO = "AUDIO",
}

const LandingPage = () => {
  const { allProducts, topSellingProducts, loading } = useProduct();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!isAutoSliding || !allProducts.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(allProducts.length / 4));
    }, 3000);

    return () => clearInterval(interval);
  }, [allProducts.length, isAutoSliding]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsAutoSliding(false);
  const handleMouseLeave = () => setIsAutoSliding(true);

  // Manual slide controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(allProducts.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(allProducts.length / 4) - 1 : prev - 1
    );
  };

  // Get one product from each of the first 4 categories
  const getProductsByCategory = () => {
    const categories = [
      ProductCategory.SMARTPHONES,
      ProductCategory.LAPTOPS,
      ProductCategory.TVS,
      ProductCategory.GAMING,
    ];

    const productsByCategory = categories
      .map((category) => {
        return allProducts.find((product) => product.category === category);
      })
      .filter(Boolean); // Remove any undefined values

    return productsByCategory;
  };

  const categoryProducts = getProductsByCategory();

  // Get top selling products for a new section (only first 4)
  const topSellers = topSellingProducts?.slice(0, 4) || [];

  // Navigate to all products
  const goToAllProducts = () => {
    navigate("/products");
  };

  // Handle product view
  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const sectionFadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const testimonials = [
    {
      text: "Amazing quality and fast shipping. Will definitely shop here again!",
      author: "Sarah Johnson",
      role: "Verified Buyer",
      rating: 5,
    },
    {
      text: "The customer service is exceptional. They went above and beyond to help me.",
      author: "Michael Chen",
      role: "Premium Member",
      rating: 5,
    },
    {
      text: "High-quality products at great prices. This is now my go-to store!",
      author: "Emma Davis",
      role: "Verified Buyer",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "On orders over $100",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: RefreshCcw,
      title: "Easy Returns",
      desc: "30-day return policy",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      desc: "Always here to help",
    },
  ];

  return (
    <Layout>
      {/* Enhanced Hero Section with Carousel */}
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-200"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Moving Products Carousel - Like Alibaba */}
      <motion.section
        className="py-20 bg-gray-50 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionFadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide uppercase">
                All Products
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Discover Our Complete Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Browse through all our products with our auto-sliding showcase
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="relative overflow-hidden mb-12"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Products Carousel */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {Array.from({
                    length: Math.ceil(allProducts.length / 4),
                  }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                        {allProducts
                          .slice(slideIndex * 4, (slideIndex + 1) * 4)
                          .map((product, index) => (
                            <motion.div
                              key={product.id}
                              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                              whileHover={{ y: -5 }}
                              onClick={() => handleViewProduct(product.id)}
                            >
                              <div className="relative overflow-hidden aspect-square">
                                <img
                                  src={
                                    product.image || "/api/placeholder/300/300"
                                  }
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
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < Math.floor(product.rating || 4.5)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
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
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewProduct(product.id);
                                    }}
                                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                  >
                                    <Eye className="h-4 w-4" />
                                    View
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(allProducts.length / 4) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        currentSlide === index
                          ? "bg-primary-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* View All Products Button */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center px-12 py-4 bg-primary-600 text-lg font-medium rounded-full text-white hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Products
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products by Category - One from Each Category */}
      <motion.section
        className="py-20 bg-white dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionFadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide uppercase">
                Featured Categories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Explore Our Top Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Discover the best products from each of our popular categories
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
              {categoryProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleViewProduct(product.id)}
                >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProduct(product.id);
                        }}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Top Selling Products - New Section */}
      {topSellers.length > 0 && (
        <motion.section
          className="py-20 bg-gray-50 dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionFadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                  <Star className="h-4 w-4 text-red-600 dark:text-red-400 mr-2 fill-current" />
                  <span className="text-red-600 dark:text-red-400 font-semibold text-sm tracking-wide uppercase">
                    Bestsellers
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                  Top Selling Products
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
                  Our customers' favorites that keep selling out again and again
                </p>
              </div>

              <Link
                to="/products?category=bestseller"
                className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                View All Bestsellers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-80 animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {topSellers.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image || "/api/placeholder/300/300"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>

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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProduct(product.id);
                          }}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Explore All Our Products?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Discover our complete collection with thousands of products waiting
            for you
          </p>
          <button
            onClick={goToAllProducts}
            className="inline-flex items-center px-8 py-4 bg-white text-lg font-medium rounded-full text-primary-600 hover:bg-gray-100 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Shop All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm tracking-wide uppercase">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - see what our happy customers
              have to share
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex text-primary-600 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-lg">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-1" />
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
