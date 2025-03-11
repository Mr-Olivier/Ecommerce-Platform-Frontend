// pages/checkout/confirmation.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, ClockIcon, TruckIcon, ReceiptIcon } from "lucide-react";
import confetti from "canvas-confetti";

const ConfirmationPage: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  });

  // Trigger confetti effect on successful order
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Send page view analytics
    // analytics.track("Order Completed", { orderNumber: orderDetails.orderNumber });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-8 px-6 text-white text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-4">
            <CheckIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-white/90">
            Your order has been successfully placed and is being processed
          </p>
        </div>

        {/* Order Information */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
            <div>
              <p className="text-sm text-gray-500">Order Number:</p>
              <p className="font-medium text-gray-900">
                {orderDetails.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date:</p>
              <p className="font-medium text-gray-900">{orderDetails.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery:</p>
              <p className="font-medium text-gray-900">
                {orderDetails.estimatedDelivery}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Status:</p>
              <p className="font-medium text-green-600">Processing</p>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Order Status
          </h2>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="h-0.5 w-full bg-gray-200"></div>
            </div>
            <ol className="relative flex justify-between">
              <li className="flex flex-col items-center">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-2 text-xs font-medium text-gray-900">
                  Confirmed
                </p>
              </li>
              <li className="flex flex-col items-center">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-white text-green-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-green-600"
                    aria-hidden="true"
                  ></span>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-900">
                  Processing
                </p>
              </li>
              <li className="flex flex-col items-center">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent"
                    aria-hidden="true"
                  ></span>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-500">
                  Shipped
                </p>
              </li>
              <li className="flex flex-col items-center">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent"
                    aria-hidden="true"
                  ></span>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-500">
                  Delivered
                </p>
              </li>
            </ol>
          </div>
        </div>

        {/* What's Next */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            What Happens Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center md:items-start">
              <ReceiptIcon className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Order Confirmation</h3>
              <p className="mt-1 text-sm text-gray-500 text-center md:text-left">
                A confirmation email has been sent to your email address.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <ClockIcon className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Order Processing</h3>
              <p className="mt-1 text-sm text-gray-500 text-center md:text-left">
                We'll prepare your items and update you when they ship.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <TruckIcon className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Delivery</h3>
              <p className="mt-1 text-sm text-gray-500 text-center md:text-left">
                Your order should arrive within 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <Link
            to="/customer/orders"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
          >
            View Order Details
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Customer Support */}
      <div className="mt-8 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          Need help with your order?
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Our customer service team is here to help.{" "}
          <a
            href="/contact"
            className="text-green-600 hover:text-green-800 font-medium"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
