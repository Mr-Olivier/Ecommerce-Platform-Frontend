// components/cart/CartSummary.tsx
import React from "react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import { CartItem } from "../../types/Cart";

export const CartSummary: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      <div className="space-y-2">
        {cart.items.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
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
            {cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}
          </span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
          <span>Total</span>
          <span>{formatCurrency(cart.total)}</span>
        </div>
      </div>

      {cart.subtotal > 0 && cart.subtotal < 100 && (
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-700">
            Add ${formatCurrency(100 - cart.subtotal)} more to your cart for
            free shipping!
          </p>
        </div>
      )}

      <div className="mt-6">
        <button
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          onClick={() => (window.location.href = "/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
