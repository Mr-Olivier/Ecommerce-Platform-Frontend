// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ProductGallery from "./ProductGallery";
// import RelatedProducts from "./RelatedProducts";
// import ReviewSummary from "../reviews/ReviewSummary";
// import { formatCurrency } from "../../utils/currency";
// import { Product } from "../../types/Product";
// import { useCart } from "../../context/CartContext";

// interface ProductDetailsProps {
//   product: Product;
// }

// // Login Modal Component defined inline to ensure it works
// const LoginModal = ({ isOpen, onClose, onSuccess }) => {
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

//   const handleSubmit = async (e) => {
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

//   // Using a higher z-index to ensure it appears on top
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-[9999]">
//       {/* Overlay - stopping propagation to prevent closing when clicking inside */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50"
//         onClick={onClose}
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

// const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
//   const { addItem } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const navigate = useNavigate();

//   // Debugging - log when login modal state changes
//   useEffect(() => {
//     console.log("Login modal state changed:", isLoginModalOpen);
//   }, [isLoginModalOpen]);

//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
//       setQuantity(newQuantity);
//     }
//   };

//   // Fix for quantity multiplication - use a dedicated addToCart function
//   // that doesn't call addItem twice
//   const handleAddToCart = () => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("No token found, showing login modal");
//       setIsLoginModalOpen(true);
//       return;
//     }

//     console.log("Token found, processing add to cart");
//     processAddToCart(token);
//   };

//   const processAddToCart = async (token: string) => {
//     if (isAdding) return; // Prevent multiple clicks

//     setIsAdding(true);
//     console.log(`Adding product ${product.id} with quantity ${quantity}`);

//     try {
//       // Make direct API call instead of using context to avoid duplication
//       const response = await axios.post(
//         "http://localhost:4000/api/cart/items",
//         {
//           productId: product.id,
//           quantity: quantity, // Send exact quantity
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         console.log("API success response:", response.data);

//         // Update local cart state ONCE
//         const cartData = response.data.data.cart;

//         // Find the current item in the response
//         const currentItem = cartData.items.find(
//           (item) => item.productId === product.id
//         );

//         if (currentItem) {
//           const imageUrl =
//             currentItem.product.images && currentItem.product.images.length > 0
//               ? `http://localhost:4000${currentItem.product.images[0]}`
//               : null;

//           // Create cart item with exact quantity from API response
//           const cartItem = {
//             id: currentItem.id,
//             productId: product.id,
//             name: product.name,
//             price:
//               typeof product.price === "string"
//                 ? parseFloat(product.price)
//                 : product.price,
//             quantity: currentItem.quantity, // Use quantity from API
//             image: imageUrl,
//             stockQuantity: product.stock || 10,
//             attributes: {},
//           };

//           console.log("Adding to local cart:", cartItem);

//           // Add to cart context - just once!
//           addItem(cartItem);
//         }

//         // Navigate to cart
//         setTimeout(() => {
//           setIsAdding(false);
//           navigate("/cart");
//         }, 500);
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       setIsAdding(false);

//       // If auth error, show login modal
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         console.log("Auth error, showing login modal");
//         setIsLoginModalOpen(true);
//       }
//     }
//   };

//   const handleLoginSuccess = () => {
//     console.log("Login success callback triggered");
//     setIsLoginModalOpen(false);

//     // Get the token after successful login
//     const token = localStorage.getItem("token");
//     if (token) {
//       console.log("Processing add to cart after login");
//       processAddToCart(token);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <ProductGallery images={[product.image]} />
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-xl font-semibold mb-4">
//             {formatCurrency(product.price)}
//           </p>
//           <p className="mb-4">{product.description}</p>
//           <ReviewSummary
//             rating={product.rating}
//             reviewCount={product.reviews}
//           />

//           {/* Quantity selector */}
//           <div className="flex items-center my-4">
//             <span className="mr-4 text-gray-700">Quantity:</span>
//             <div className="flex items-center border rounded-md">
//               <button
//                 type="button"
//                 onClick={() => handleQuantityChange(quantity - 1)}
//                 className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
//                 disabled={quantity <= 1}
//               >
//                 -
//               </button>
//               <span className="px-4 py-1 text-gray-800">{quantity}</span>
//               <button
//                 type="button"
//                 onClick={() => handleQuantityChange(quantity + 1)}
//                 className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
//                 disabled={quantity >= (product.stock || 10)}
//               >
//                 +
//               </button>
//             </div>
//             <span className="ml-4 text-sm text-gray-500">
//               {product.stock ? `${product.stock} available` : "In stock"}
//             </span>
//           </div>

//           <button
//             type="button"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white w-full px-6 py-3 rounded-lg mt-4 flex items-center justify-center transition-colors"
//             onClick={handleAddToCart}
//             disabled={isAdding || product.stock === 0}
//           >
//             {isAdding ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Adding...
//               </>
//             ) : product.stock === 0 ? (
//               "Out of Stock"
//             ) : (
//               "Add to Cart"
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <LoginModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         onSuccess={handleLoginSuccess}
//       />

//       <RelatedProducts
//         category={product.category}
//         currentProductId={product.id}
//       />
//     </div>
//   );
// };

// export default ProductDetails;

// // Direct ProductDetails with debugging
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define inline LoginModal to ensure it works directly without imports
// const LoginModalDirect = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.data.status === "success") {
//         alert("Login successful! Now adding item to cart.");
//         localStorage.setItem("token", response.data.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.data.user));

//         // Reload the page to reflect login state
//         window.location.reload();
//       } else {
//         setError("Login failed");
//       }
//     } catch (err) {
//       setError("Login failed. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       style={{ zIndex: 9999 }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
//         <p className="mb-4">You must be logged in to add items to your cart.</p>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Sign In"}
//             </button>
//             <button
//               type="button"
//               className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               onClick={() =>
//                 (document.getElementById("login-modal").style.display = "none")
//               }
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const ProductDetails = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const navigate = useNavigate();

//   // Debug: Log whenever login form state changes
//   useEffect(() => {
//     console.log("Show login form:", showLoginForm);
//   }, [showLoginForm]);

//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleAddToCart = () => {
//     console.log("Add to Cart clicked");

//     // Check for token
//     const token = localStorage.getItem("token");
//     console.log("Token exists:", !!token);

//     if (!token) {
//       console.log("No token found, showing login form");

//       // Direct DOM manipulation to ensure modal shows
//       const modal = document.getElementById("login-modal");
//       if (modal) {
//         modal.style.display = "block";
//       } else {
//         console.error("Login modal element not found");
//       }

//       // Also use React state
//       setShowLoginForm(true);
//       return;
//     }

//     console.log("Token found, proceeding to add to cart");
//     addToCartWithToken(token);
//   };

//   const addToCartWithToken = async (token) => {
//     console.log("Adding to cart with token");

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/cart/items",
//         {
//           productId: product.id,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         alert("Product added to cart successfully!");
//         navigate("/cart");
//       } else {
//         alert("Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Error adding product to cart");

//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         console.log("Auth error, showing login form");
//         setShowLoginForm(true);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Debug button - click this to test login popup */}
//       <div className="mb-4 bg-yellow-100 p-4 rounded">
//         <p className="font-bold">Debug Tools:</p>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           onClick={() => setShowLoginForm(true)}
//         >
//           Test Login Popup
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded"
//           onClick={() => localStorage.removeItem("token")}
//         >
//           Clear Token
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         <div className="bg-gray-100 rounded-lg p-4">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-auto object-contain"
//           />
//         </div>

//         {/* Product Details */}
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-2xl font-semibold mb-4">${product.price}</p>
//           <p className="mb-6">{product.description}</p>

//           {/* Quantity Selector */}
//           <div className="flex items-center mb-6">
//             <span className="mr-4">Quantity:</span>
//             <div className="flex border border-gray-300 rounded">
//               <button
//                 className="px-3 py-1 border-r"
//                 onClick={() => handleQuantityChange(quantity - 1)}
//                 disabled={quantity <= 1}
//               >
//                 -
//               </button>
//               <span className="px-4 py-1">{quantity}</span>
//               <button
//                 className="px-3 py-1 border-l"
//                 onClick={() => handleQuantityChange(quantity + 1)}
//                 disabled={quantity >= (product.stock || 10)}
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Login Modal - both with React state and direct DOM */}
//       <div
//         id="login-modal"
//         style={{ display: showLoginForm ? "block" : "none" }}
//       >
//         {showLoginForm && <LoginModalDirect />}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// // ProductDetails.tsx - Fixed Add to Cart Implementation
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define inline LoginModal
// const LoginModalDirect = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.data.status === "success") {
//         alert("Login successful! Now adding item to cart.");
//         localStorage.setItem("token", response.data.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.data.user));

//         // Reload the page to reflect login state
//         window.location.reload();
//       } else {
//         setError("Login failed");
//       }
//     } catch (err) {
//       console.error("Login error details:", err);
//       setError("Login failed. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       style={{ zIndex: 9999 }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
//         <p className="mb-4">You must be logged in to add items to your cart.</p>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Sign In"}
//             </button>
//             <button
//               type="button"
//               className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               onClick={() =>
//                 (document.getElementById("login-modal").style.display = "none")
//               }
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const ProductDetails = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const navigate = useNavigate();

//   // Debug: Log whenever login form state changes
//   useEffect(() => {
//     console.log("Show login form:", showLoginForm);
//   }, [showLoginForm]);

//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleAddToCart = () => {
//     console.log("Add to Cart clicked");

//     // Prevent multiple clicks
//     if (isAddingToCart) {
//       console.log("Already processing add to cart request");
//       return;
//     }

//     // Check for token
//     const token = localStorage.getItem("token");
//     console.log("Token exists:", !!token);

//     if (!token) {
//       console.log("No token found, showing login form");
//       setShowLoginForm(true);

//       // Direct DOM manipulation as fallback
//       const modal = document.getElementById("login-modal");
//       if (modal) {
//         modal.style.display = "block";
//       } else {
//         console.error("Login modal element not found");
//       }
//       return;
//     }

//     console.log("Token found, proceeding to add to cart");
//     addToCartWithToken(token);
//   };

//   const addToCartWithToken = async (token) => {
//     console.log("Adding to cart with token");
//     setIsAddingToCart(true);

//     try {
//       // Log the request data for debugging
//       console.log("Request data:", {
//         productId: product.id,
//         quantity: quantity,
//       });

//       const response = await axios.post(
//         "http://localhost:4000/api/cart/items",
//         {
//           productId: product.id,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Log the full response for debugging
//       console.log("API Response:", response.data);

//       if (response.data.status === "success") {
//         alert("Product added to cart successfully!");
//         navigate("/cart");
//       } else {
//         console.error("API returned success: false", response.data);
//         alert(
//           "Failed to add product to cart: " +
//             (response.data.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);

//       if (axios.isAxiosError(error)) {
//         console.log("Axios error details:", {
//           status: error.response?.status,
//           data: error.response?.data,
//           headers: error.response?.headers,
//         });

//         if (error.response?.status === 401) {
//           alert("Your session has expired. Please log in again.");
//           setShowLoginForm(true);
//           localStorage.removeItem("token"); // Clear invalid token
//         } else {
//           alert(
//             "Error adding product to cart: " +
//               (error.response?.data?.message || error.message)
//           );
//         }
//       } else {
//         alert("Error adding product to cart: " + error.message);
//       }
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Debug button - click this to test login popup */}
//       <div className="mb-4 bg-yellow-100 p-4 rounded">
//         <p className="font-bold">Debug Tools:</p>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           onClick={() => setShowLoginForm(true)}
//         >
//           Test Login Popup
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded"
//           onClick={() => {
//             localStorage.removeItem("token");
//             alert("Token cleared. You are now logged out.");
//           }}
//         >
//           Clear Token
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Product Image */}
//         <div className="bg-gray-100 rounded-lg p-4">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-auto object-contain"
//           />
//         </div>

//         {/* Product Details */}
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-2xl font-semibold mb-4">${product.price}</p>
//           <p className="mb-6">{product.description}</p>

//           {/* Current Token Status */}
//           <div className="mb-4 p-2 bg-gray-100 rounded">
//             <p>
//               {localStorage.getItem("token")
//                 ? "✅ You are logged in"
//                 : "❌ You are not logged in"}
//             </p>
//           </div>

//           {/* Quantity Selector */}
//           <div className="flex items-center mb-6">
//             <span className="mr-4">Quantity:</span>
//             <div className="flex border border-gray-300 rounded">
//               <button
//                 className="px-3 py-1 border-r"
//                 onClick={() => handleQuantityChange(quantity - 1)}
//                 disabled={quantity <= 1}
//               >
//                 -
//               </button>
//               <span className="px-4 py-1">{quantity}</span>
//               <button
//                 className="px-3 py-1 border-l"
//                 onClick={() => handleQuantityChange(quantity + 1)}
//                 disabled={quantity >= (product.stock || 10)}
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
//             onClick={handleAddToCart}
//             disabled={isAddingToCart}
//           >
//             {isAddingToCart ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Adding...
//               </>
//             ) : (
//               "Add to Cart"
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Login Modal - visible based on state */}
//       <div
//         id="login-modal"
//         style={{ display: showLoginForm ? "block" : "none" }}
//       >
//         {showLoginForm && <LoginModalDirect />}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductGallery from "./ProductGallery";
import RelatedProducts from "./RelatedProducts";
import ReviewSummary from "../reviews/ReviewSummary";
import { formatCurrency } from "../../utils/currency";
import { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProductDetailsProps {
  product: Product;
}

// Login Modal Component defined inline to ensure it works
const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.status === "success") {
        // Store token and user data
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        // Clear form
        setEmail("");
        setPassword("");

        // Notify parent component of successful login
        onSuccess();
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Using a higher z-index to ensure it appears on top
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Overlay - stopping propagation to prevent closing when clicking inside */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      ></div>

      {/* Modal */}
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden relative z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Sign In Required
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            type="button"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-gray-600 mb-6">
            Please sign in to add items to your cart
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  // Force check auth status on mount and every 5 seconds
  useEffect(() => {
    // Clear token if it's invalid JSON to prevent issues
    try {
      const user = localStorage.getItem("user");
      if (user) {
        JSON.parse(user);
      }
    } catch (e) {
      console.error("Invalid user data in localStorage, clearing token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  // Debugging - log when login modal state changes
  useEffect(() => {
    console.log("Login modal state changed:", isLoginModalOpen);
  }, [isLoginModalOpen]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  // Enhanced add to cart function with stronger auth check
  const handleAddToCart = () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");

    // Important: Always force check if token exists before proceeding
    if (!token) {
      console.log("No token found, showing login modal");
      setIsLoginModalOpen(true);
      return;
    }

    console.log("Token found, processing add to cart");
    processAddToCart(token);
  };

  const processAddToCart = async (token: string) => {
    if (isAdding) return; // Prevent multiple clicks

    setIsAdding(true);
    console.log(`Adding product ${product.id} with quantity ${quantity}`);

    try {
      // Make direct API call instead of using context to avoid duplication
      const response = await axios.post(
        "http://localhost:4000/api/cart/items",
        {
          productId: product.id,
          quantity: quantity, // Send exact quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        console.log("API success response:", response.data);

        // Update local cart state ONCE
        const cartData = response.data.data.cart;

        // Find the current item in the response
        const currentItem = cartData.items.find(
          (item: any) => item.productId === product.id
        );

        if (currentItem) {
          // Check if we have an image before adding to cart
          const hasImage =
            currentItem.product.images && currentItem.product.images.length > 0;

          if (hasImage) {
            const imageUrl = `http://localhost:4000${currentItem.product.images[0]}`;

            // Create cart item with exact quantity from API response
            const cartItem = {
              id: currentItem.id,
              productId: product.id,
              name: product.name,
              price:
                typeof product.price === "string"
                  ? parseFloat(product.price)
                  : product.price,
              quantity: currentItem.quantity, // Use quantity from API
              image: imageUrl, // This will now always be a string
              stockQuantity: product.stock || 10,
              attributes: {},
            };

            console.log("Adding to local cart:", cartItem);

            // Add to cart context - just once!
            addItem(cartItem);
          } else {
            console.warn("Product has no images, skipping add to cart");
            // You could also show a user message here
          }
        }

        // Navigate to cart
        setTimeout(() => {
          setIsAdding(false);
          navigate("/cart");
        }, 500);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsAdding(false);

      // If auth error, show login modal
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("Auth error, showing login modal");
        // Clear invalid token
        localStorage.removeItem("token");
        setIsLoginModalOpen(true);
      }
    }
  };

  const handleLoginSuccess = () => {
    console.log("Login success callback triggered");
    setIsLoginModalOpen(false);

    // Get the token after successful login
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Processing add to cart after login");
      processAddToCart(token);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={[product.image]} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">
            {formatCurrency(product.price)}
          </p>
          <p className="mb-4">{product.description}</p>
          <ReviewSummary
            rating={product.rating}
            reviewCount={product.reviews}
          />

          {/* Quantity selector */}
          <div className="flex items-center my-4">
            <span className="mr-4 text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 text-gray-800">{quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                disabled={quantity >= (product.stock || 10)}
              >
                +
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-500">
              {product.stock ? `${product.stock} available` : "In stock"}
            </span>
          </div>

          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full px-6 py-3 rounded-lg mt-4 flex items-center justify-center transition-colors"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : product.stock === 0 ? (
              "Out of Stock"
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>

      {/* Login Modal - using a separate variable to ensure it renders correctly */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={true}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductDetails;
