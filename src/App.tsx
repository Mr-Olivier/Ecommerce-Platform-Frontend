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

// App.tsx
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

// Product Pages
import ProductListingPage from "./pages/products";
import ProductDetailPage from "./pages/products/[id]";

// Admin Pages
import AdminDashboard from "./pages/admin";
import ProductManagement from "./pages/admin/products";
import UserManagement from "./pages/admin/users";
import OrderManagement from "./pages/admin/orders";
import AnalyticsDashboard from "./pages/admin/analytics";
import InventoryManager from "./pages/admin/inventory";
import PromotionsManager from "./pages/admin/promotions";

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
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="orders" element={<OrderManagement />} />
                  <Route path="analytics" element={<AnalyticsDashboard />} />
                  <Route path="inventory" element={<InventoryManager />} />
                  <Route path="promotions" element={<PromotionsManager />} />
                </Route>
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
