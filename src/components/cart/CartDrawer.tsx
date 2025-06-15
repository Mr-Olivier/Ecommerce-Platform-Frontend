import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utils/currency";
import LoginModal from "../Auth/LoginModal";
import authService from "../../services/authService";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    isLoading,
    toggleCart,
    clearCart,
    requiresAuth,
    clearAuthRequirement,
  } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const isAuthenticated = authService.isAuthenticated();

  // Watch for requiresAuth changes from cart context
  useEffect(() => {
    if (requiresAuth) {
      setIsLoginModalOpen(true);
    }
  }, [requiresAuth]);

  const handleClose = () => {
    toggleCart();
  };

  const handleClearCart = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    setIsClearingCart(true);
    await clearCart();
    setIsClearingCart(false);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    clearAuthRequirement();
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    clearAuthRequirement();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Shopping Cart
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
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
          </div>

          {/* Login requirement message if not authenticated */}
          {!isAuthenticated && (
            <div className="bg-blue-50 text-blue-700 p-4 border-b border-blue-100">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  Please{" "}
                  <button
                    className="font-semibold underline"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    sign in
                  </button>{" "}
                  to access your cart.
                </p>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-8 text-gray-500">
              <svg
                className="animate-spin h-8 w-8 mr-2"
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
              Loading your cart...
            </div>
          )}

          {/* Cart Items */}
          {!isLoading && (
            <div className="flex-1 overflow-y-auto px-4">
              {cart.items.length === 0 ? (
                <div className="py-8 text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="text-gray-500 mt-4">Your cart is empty</p>
                  <button
                    onClick={handleClose}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {isAuthenticated && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleClearCart}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center"
                        disabled={isClearingCart}
                      >
                        {isClearingCart ? (
                          <>
                            <svg
                              className="animate-spin h-3 w-3 mr-1"
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
                            Clearing...
                          </>
                        ) : (
                          <>
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Clear Cart
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </>
              )}
            </div>
          )}

          {/* Summary */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(cart.tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {cart.shipping === 0
                      ? "Free"
                      : formatCurrency(cart.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      window.location.href = "/checkout";
                    } else {
                      setIsLoginModalOpen(true);
                    }
                  }}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {isAuthenticated
                    ? "Proceed to Checkout"
                    : "Sign In to Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default CartDrawer;
