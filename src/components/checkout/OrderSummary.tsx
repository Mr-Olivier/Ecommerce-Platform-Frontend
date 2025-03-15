// components/checkout/OrderSummary.tsx
import React from "react";
import { useCart } from "../../hooks/useCart";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";

const OrderSummary: React.FC = () => {
  const { cart } = useCart();

  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99; // Fixed shipping cost
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FaShoppingCart className="text-indigo-600 h-5 w-5 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
      </div>

      <div className="border-b pb-4 mb-4">
        {cart.items.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            Your cart is empty
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 py-1">
                <div className="flex items-center">
                  <div className="bg-gray-100 h-10 w-10 rounded flex items-center justify-center mr-3 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No img</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <span className="text-gray-600">Tax</span>
            <div className="ml-1 group relative">
              <FaInfoCircle className="text-gray-400 h-3 w-3 cursor-help" />
              <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute bottom-full left-0 mb-2 w-40 bg-gray-800 text-white text-xs rounded p-2 pointer-events-none">
                10% tax rate applied
                <div className="absolute top-full left-2 w-2 h-2 rotate-45 bg-gray-800"></div>
              </div>
            </div>
          </div>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-indigo-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span>Fast shipping available</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span>Easy returns within 30 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
