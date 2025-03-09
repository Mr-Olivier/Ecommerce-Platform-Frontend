// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import LandingPage from "./pages";

// function App() {
//   return (
//     <CartProvider>
//       <WishlistProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />

//             {/* Add other routes here */}
//           </Routes>
//         </Router>
//       </WishlistProvider>
//     </CartProvider>
//   );
// }

// export default App;

// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistProvider";
// import { AuthProvider } from "./context/AuthContext";
// import LandingPage from "./pages";
// import LoginPage from "./pages/auth/login";
// import RegisterPage from "./pages/auth/register";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import ProductsPage from "./pages/products";
// import ProductDetailsPage from "./pages/products/[id]";
// import CartPage from "./pages/cart";
// import CheckoutPage from "./pages/checkout";
// import UserProfilePage from "./pages/user/profile";
// import UserOrdersPage from "./pages/user/orders";
// import UserWishlistPage from "./pages/user/wishlist";
// import AdminDashboard from "./pages/admin";
// import AdminProducts from "./pages/admin/products";
// import AdminOrders from "./pages/admin/orders";
// import AdminAnalytics from "./pages/admin/analytics";

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <Router>
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<LandingPage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//               <Route path="/products" element={<ProductsPage />} />
//               <Route path="/products/:id" element={<ProductDetailsPage />} />

//               {/* Protected User Routes */}
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/checkout" element={<CheckoutPage />} />
//               <Route path="/user/profile" element={<UserProfilePage />} />
//               <Route path="/user/orders" element={<UserOrdersPage />} />
//               <Route path="/user/wishlist" element={<UserWishlistPage />} />

//               {/* Protected Admin Routes */}
//               <Route path="/admin" element={<AdminDashboard />} />
//               <Route path="/admin/products" element={<AdminProducts />} />
//               <Route path="/admin/orders" element={<AdminOrders />} />
//               <Route path="/admin/analytics" element={<AdminAnalytics />} />
//             </Routes>
//           </Router>
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { AuthProvider } from "./context/AuthContext";
// import LandingPage from "./pages";
// import Login from "./pages/auth/Login";
// import RegisterPage from "./pages/auth/register";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// // import ProductsPage from "./pages/products";
// // import ProductDetailsPage from "./pages/products/[id]";
// // import CartPage from "./pages/cart";
// // import CheckoutPage from "./pages/checkout";
// // import UserProfilePage from "./pages/user/profile";
// // import UserOrdersPage from "./pages/user/orders";
// // import UserWishlistPage from "./pages/user/wishlist";
// // import AdminDashboard from "./pages/admin";
// // import AdminProducts from "./pages/admin/products";
// // import AdminOrders from "./pages/admin/orders";
// // import AdminAnalytics from "./pages/admin/analytics";

// // import ProtectedRoute from "./components/Auth/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <Router>
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<LandingPage />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//               {/* <Route path="/products" element={<ProductsPage />} />
//               <Route path="/products/:id" element={<ProductDetailsPage />} /> */}

//               {/* Protected User Routes */}
//               {/* <Route
//                 path="/cart"
//                 element={
//                   <ProtectedRoute>
//                     <CartPage />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/checkout"
//                 element={
//                   <ProtectedRoute>
//                     <CheckoutPage />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/user/profile"
//                 element={
//                   <ProtectedRoute>
//                     <UserProfilePage />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/user/orders"
//                 element={
//                   <ProtectedRoute>
//                     <UserOrdersPage />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/user/wishlist"
//                 element={
//                   <ProtectedRoute>
//                     <UserWishlistPage />
//                   </ProtectedRoute>
//                 }
//               /> */}

//               {/* Protected Admin Routes */}
//               {/* <Route
//                 path="/admin"
//                 element={
//                   <ProtectedRoute adminOnly>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/admin/products"
//                 element={
//                   <ProtectedRoute adminOnly>
//                     <AdminProducts />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/admin/orders"
//                 element={
//                   <ProtectedRoute adminOnly>
//                     <AdminOrders />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               {/* <Route
//                 path="/admin/analytics"
//                 element={
//                   <ProtectedRoute adminOnly>
//                     <AdminAnalytics />
//                   </ProtectedRoute>
//                 }
//               /> */}
//             </Routes>
//           </Router>
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { AuthProvider } from "./context/AuthContext";
// import Layout from "./components/common/Layout";

// // Pages
// import LandingPage from "./pages";
// import LoginPage from "./pages/auth/Login";
// import RegisterPage from "./pages/auth/register";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import AdminDashboard from "./pages/admin";

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <Router>
//             <Layout>
//               <Routes>
//                 <Route path="/" element={<LandingPage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route
//                   path="/forgot-password"
//                   element={<ForgotPasswordPage />}
//                 />
//                 <Route path="/admin" element={<AdminDashboard />} />
//                 {/* Add other routes here */}
//               </Routes>
//             </Layout>
//           </Router>
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { AuthProvider } from "./context/AuthContext";
// import Layout from "./components/common/Layout";

// // Pages
// import LandingPage from "./pages";
// import LoginPage from "./pages/auth/Login";
// import RegisterPage from "./pages/auth/register";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import AdminDashboard from "./pages/admin";

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <Router>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <Layout>
//                     <LandingPage />
//                   </Layout>
//                 }
//               />
//               <Route
//                 path="/login"
//                 element={
//                   <Layout>
//                     <LoginPage />
//                   </Layout>
//                 }
//               />
//               <Route
//                 path="/register"
//                 element={
//                   <Layout>
//                     <RegisterPage />
//                   </Layout>
//                 }
//               />
//               <Route
//                 path="/forgot-password"
//                 element={
//                   <Layout>
//                     <ForgotPasswordPage />
//                   </Layout>
//                 }
//               />
//               <Route path="/admin" element={<AdminDashboard />} />
//               {/* Add other routes here */}
//             </Routes>
//           </Router>
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// App.tsx - Modified version with customer dashboard routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/common/Layout";
import AdminLayout from "./components/dashboards/AdminLayout";

// Pages
import LandingPage from "./pages";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import ConfirmationPage from "./pages/checkout/confirmation";
import ContactPage from "./pages/contact";

// Product Pages
import ProductListingPage from "./pages/products";
import ProductDetailPage from "./pages/products/[id]";

import CategoriesPage from "./pages/categories";
import CategoryPage from "./pages/products/category/[slug]";

// Admin Pages
import AdminDashboard from "./pages/admin";
// import ProductManagement from "./pages/admin/products";
import AdminProductManagement from "./pages/admin/AdminProductManagement";
import UserManagement from "./pages/admin/users";
import OrderManagement from "./pages/admin/orders";
import AnalyticsDashboard from "./pages/admin/analytics";
import InventoryManager from "./pages/admin/inventory";
import PromotionsManager from "./pages/admin/promotions";

// Customer Dashboard Pages - ADD THESE IMPORTS
import CustomerDashboard from "./pages/customer/dashboard";
import CustomerOrders from "./pages/customer/orders";
import CustomerAccount from "./pages/customer/account";
import CustomerAddresses from "./pages/customer/addresses";
import CustomerPaymentMethods from "./pages/customer/payment-methods";
import CustomerReviews from "./pages/customer/reviews";
import CustomerWishlist from "./pages/customer/wishlist";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                {/* Public Routes with Main Layout */}
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/login"
                  element={
                    <Layout>
                      <LoginPage />
                    </Layout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Layout>
                      <RegisterPage />
                    </Layout>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <Layout>
                      <ForgotPasswordPage />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <ContactPage />
                    </Layout>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Layout>
                      <CartPage />
                    </Layout>
                  }
                />
                {/* Product Routes */}
                <Route
                  path="/products"
                  element={
                    <Layout>
                      <ProductListingPage />
                    </Layout>
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <Layout>
                      <ProductDetailPage />
                    </Layout>
                  }
                />
                {/* Category Routes - ADD THESE */}
                <Route
                  path="/categories"
                  element={
                    <Layout>
                      <CategoriesPage />
                    </Layout>
                  }
                />
                <Route
                  path="/products/category/:slug"
                  element={
                    <Layout>
                      <CategoryPage />
                    </Layout>
                  }
                />
                {/* Checkout Routes */}
                <Route
                  path="/checkout"
                  element={
                    <Layout>
                      <CheckoutPage />
                    </Layout>
                  }
                />
                <Route
                  path="/checkout/confirmation"
                  element={
                    <Layout>
                      <ConfirmationPage />
                    </Layout>
                  }
                />
                {/* Admin Routes with Admin Layout */}
                // In your App.tsx file, update the route for admin products:
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route
                    path="products"
                    element={<AdminProductManagement />}
                  />{" "}
                  {/* Use the new component */}
                  <Route path="users" element={<UserManagement />} />
                  <Route path="orders" element={<OrderManagement />} />
                  <Route path="analytics" element={<AnalyticsDashboard />} />
                  <Route path="inventory" element={<InventoryManager />} />
                  <Route path="promotions" element={<PromotionsManager />} />
                </Route>
                {/* CUSTOMER DASHBOARD ROUTES - ADD THESE ROUTES */}
                <Route
                  path="/customer/dashboard"
                  element={<CustomerDashboard />}
                />
                <Route path="/customer/orders" element={<CustomerOrders />} />
                <Route path="/customer/account" element={<CustomerAccount />} />
                <Route
                  path="/customer/addresses"
                  element={<CustomerAddresses />}
                />
                <Route
                  path="/customer/payment-methods"
                  element={<CustomerPaymentMethods />}
                />
                <Route path="/customer/reviews" element={<CustomerReviews />} />
                <Route
                  path="/customer/wishlist"
                  element={<CustomerWishlist />}
                />
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

// // App.tsx - With protected routes for admin and customer dashboard
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { AuthProvider } from "./context/AuthContext";
// import { useAuth } from "./hooks/useAuth";
// import Layout from "./components/common/Layout";
// import AdminLayout from "./components/dashboards/AdminLayout";

// // Pages
// import LandingPage from "./pages";
// import LoginPage from "./pages/auth/Login";
// import RegisterPage from "./pages/auth/register";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import CartPage from "./pages/cart";
// import CheckoutPage from "./pages/checkout";
// import ConfirmationPage from "./pages/checkout/confirmation";
// import ContactPage from "./pages/contact";

// // Product Pages
// import ProductListingPage from "./pages/products";
// import ProductDetailPage from "./pages/products/[id]";

// import CategoriesPage from "./pages/categories";
// import CategoryPage from "./pages/products/category/[slug]";

// // Admin Pages
// import AdminDashboard from "./pages/admin";
// import AdminProductManagement from "./pages/admin/AdminProductManagement";
// import UserManagement from "./pages/admin/users";
// import OrderManagement from "./pages/admin/orders";
// import AnalyticsDashboard from "./pages/admin/analytics";
// import InventoryManager from "./pages/admin/inventory";
// import PromotionsManager from "./pages/admin/promotions";

// // Customer Dashboard Pages
// import CustomerDashboard from "./pages/customer/dashboard";
// import CustomerOrders from "./pages/customer/orders";
// import CustomerAccount from "./pages/customer/account";
// import CustomerAddresses from "./pages/customer/addresses";
// import CustomerPaymentMethods from "./pages/customer/payment-methods";
// import CustomerReviews from "./pages/customer/reviews";
// import CustomerWishlist from "./pages/customer/wishlist";

// // Protected route components
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated, loading } = useAuth();

//   console.log("ProtectedRoute check:", { isAuthenticated, loading });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// const AdminRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated, user, loading } = useAuth();

//   console.log("AdminRoute check:", { isAuthenticated, user, loading });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check exact case - API returns "ADMIN" (uppercase)
//   if (user?.role !== "ADMIN") {
//     console.log("User is not admin:", user?.role);
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// const CustomerRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated, user, loading } = useAuth();

//   console.log("CustomerRoute check:", { isAuthenticated, user, loading });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check exact case - API returns "CUSTOMER" (uppercase)
//   if (user?.role !== "CUSTOMER") {
//     console.log("User is not customer:", user?.role);
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// // Wrapper component for customer dashboard layout
// const CustomerDashboardLayout = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//     <div className="customer-dashboard-layout">
//       {/* Add your customer dashboard layout here if needed */}
//       {children}
//     </div>
//   );
// };

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public Routes with Main Layout */}
//       <Route path="/" element={<LandingPage />} />
//       <Route
//         path="/login"
//         element={
//           <Layout>
//             <LoginPage />
//           </Layout>
//         }
//       />
//       <Route
//         path="/register"
//         element={
//           <Layout>
//             <RegisterPage />
//           </Layout>
//         }
//       />
//       <Route
//         path="/forgot-password"
//         element={
//           <Layout>
//             <ForgotPasswordPage />
//           </Layout>
//         }
//       />
//       <Route
//         path="/contact"
//         element={
//           <Layout>
//             <ContactPage />
//           </Layout>
//         }
//       />
//       <Route
//         path="/cart"
//         element={
//           <Layout>
//             <CartPage />
//           </Layout>
//         }
//       />

//       {/* Product Routes */}
//       <Route
//         path="/products"
//         element={
//           <Layout>
//             <ProductListingPage />
//           </Layout>
//         }
//       />
//       <Route
//         path="/products/:id"
//         element={
//           <Layout>
//             <ProductDetailPage />
//           </Layout>
//         }
//       />

//       {/* Category Routes */}
//       <Route
//         path="/categories"
//         element={
//           <Layout>
//             <CategoriesPage />
//           </Layout>
//         }
//       />
//       <Route
//         path="/products/category/:slug"
//         element={
//           <Layout>
//             <CategoryPage />
//           </Layout>
//         }
//       />

//       {/* Checkout Routes - Protected */}
//       <Route
//         path="/checkout"
//         element={
//           <ProtectedRoute>
//             <Layout>
//               <CheckoutPage />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/checkout/confirmation"
//         element={
//           <ProtectedRoute>
//             <Layout>
//               <ConfirmationPage />
//             </Layout>
//           </ProtectedRoute>
//         }
//       />

//       {/* Admin Routes with Admin Layout - PROTECTED */}
//       <Route
//         path="/admin"
//         element={
//           <AdminRoute>
//             <AdminLayout />
//           </AdminRoute>
//         }
//       >
//         <Route index element={<AdminDashboard />} />
//         <Route path="products" element={<AdminProductManagement />} />
//         <Route path="users" element={<UserManagement />} />
//         <Route path="orders" element={<OrderManagement />} />
//         <Route path="analytics" element={<AnalyticsDashboard />} />
//         <Route path="inventory" element={<InventoryManager />} />
//         <Route path="promotions" element={<PromotionsManager />} />
//       </Route>

//       {/* CUSTOMER DASHBOARD ROUTES - PROTECTED */}
//       <Route path="/customer">
//         <Route
//           path="dashboard"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerDashboard />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//         <Route
//           path="orders"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerOrders />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//         <Route
//           path="account"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerAccount />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//         <Route
//           path="addresses"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerAddresses />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//         <Route
//           path="payment-methods"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerPaymentMethods />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//         <Route
//           path="reviews"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerReviews />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//         <Route
//           path="wishlist"
//           element={
//             <CustomerRoute>
//               <CustomerDashboardLayout>
//                 <CustomerWishlist />
//               </CustomerDashboardLayout>
//             </CustomerRoute>
//           }
//         />
//       </Route>

//       {/* Catch-all route for 404 */}
//       <Route
//         path="*"
//         element={
//           <Layout>
//             <div className="min-h-screen flex items-center justify-center">
//               <div className="text-center">
//                 <h1 className="text-4xl font-bold text-gray-800">404</h1>
//                 <p className="text-xl text-gray-600">Page not found</p>
//                 <a
//                   href="/"
//                   className="mt-4 inline-block px-6 py-2 bg-primary-600 text-white rounded-md"
//                 >
//                   Go Home
//                 </a>
//               </div>
//             </div>
//           </Layout>
//         }
//       />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <HelmetProvider>
//       <AuthProvider>
//         <CartProvider>
//           <WishlistProvider>
//             <Router>
//               <AppRoutes />
//             </Router>
//           </WishlistProvider>
//         </CartProvider>
//       </AuthProvider>
//     </HelmetProvider>
//   );
// }

// export default App;
