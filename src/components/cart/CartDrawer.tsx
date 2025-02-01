// components/cart/CartDrawer.tsx
import React from "react";
import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../../utils/currency";

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, toggleCart } = useCart();

  const handleClose = () => {
    toggleCart();
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4">
            {cart.items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cart.items.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

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
                  onClick={() => (window.location.href = "/checkout")}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
