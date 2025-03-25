// App.tsx - Modified version with customer dashboard routes and professional 404 page
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import AdminProductManagement from "./pages/admin/AdminProductManagement";
import UserManagement from "./pages/admin/users";
import OrderManagement from "./pages/admin/orders";
import AnalyticsDashboard from "./pages/admin/analytics";
import InventoryManager from "./pages/admin/inventory";
import PromotionsManager from "./pages/admin/promotions";

// Customer Dashboard Pages
import CustomerDashboard from "./pages/customer/dashboard";
import CustomerOrders from "./pages/customer/orders";
import CustomerAccount from "./pages/customer/account";
import CustomerAddresses from "./pages/customer/addresses";
import CustomerPaymentMethods from "./pages/customer/payment-methods";
import CustomerReviews from "./pages/customer/reviews";
import CustomerWishlist from "./pages/customer/wishlist";

// Not Found Page
import NotFoundPage from "./pages/404";

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
                {/* Category Routes */}
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
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProductManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="orders" element={<OrderManagement />} />
                  <Route path="analytics" element={<AnalyticsDashboard />} />
                  <Route path="inventory" element={<InventoryManager />} />
                  <Route path="promotions" element={<PromotionsManager />} />
                </Route>
                {/* CUSTOMER DASHBOARD ROUTES */}
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

                {/* 404 Not Found Route - should be last */}
                <Route
                  path="/404"
                  element={
                    <Layout>
                      <NotFoundPage />
                    </Layout>
                  }
                />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
