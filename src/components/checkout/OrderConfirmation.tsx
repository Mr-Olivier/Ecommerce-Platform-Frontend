// components/checkout/OrderConfirmation.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaShippingFast,
  FaFileInvoice,
  FaHome,
} from "react-icons/fa";
import { useCheckout } from "../../hooks/useCheckout";

interface OrderConfirmationProps {
  resetCheckout: () => void;
}

interface OrderDetails {
  id: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: string;
    product: {
      name: string;
      images: string[];
    };
  }>;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  resetCheckout,
}) => {
  const navigate = useNavigate();
  const { orderId, paymentSuccess, createOrder } = useCheckout();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no orderId or payment wasn't successful, redirect to home
    if (!orderId || !paymentSuccess) {
      navigate("/");
      return;
    }

    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd fetch order details from your API
        // For this example, we'll create a new order and use its details
        const result = await createOrder();

        if (result.success && result.order) {
          setOrderDetails(result.order);
        } else {
          setError("Failed to retrieve order details");
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("An error occurred while retrieving your order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, paymentSuccess, navigate, createOrder]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleContinueShopping = () => {
    resetCheckout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center text-red-600 mb-4">
          <svg
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold mt-2">Something went wrong</h2>
        </div>
        <p className="text-gray-600 text-center mb-6">{error}</p>
        <div className="flex justify-center">
          <button
            onClick={handleContinueShopping}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center text-yellow-600 mb-4">
          <svg
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold mt-2">Order details not found</h2>
        </div>
        <p className="text-gray-600 text-center mb-6">
          We couldn't find details for your order. Please contact customer
          support.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleContinueShopping}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center text-green-600 mb-8">
        <FaCheckCircle className="h-16 w-16 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Order Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
      </div>

      <div className="border-t border-b py-4 my-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Order Number:</span>
          <span className="font-medium">{orderDetails.id}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Order Date:</span>
          <span>{formatDate(orderDetails.createdAt)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Order Status:</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {orderDetails.status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-bold">
            ${parseFloat(orderDetails.totalAmount).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Order Items</h3>
        <div className="space-y-4">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden mr-4">
                {item.product.images && item.product.images.length > 0 ? (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No Image</div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-600">
                    Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                  </span>
                  <span className="font-medium">
                    ${(item.quantity * parseFloat(item.price)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 text-center">
            <FaShippingFast className="h-8 w-8 text-indigo-600 mb-2" />
            <h4 className="font-medium mb-1">Shipping</h4>
            <p className="text-sm text-gray-600">
              Your order will be shipped within 1-2 business days.
            </p>
          </div>
          <div className="flex flex-col items-center p-3 text-center">
            <FaFileInvoice className="h-8 w-8 text-indigo-600 mb-2" />
            <h4 className="font-medium mb-1">Order Updates</h4>
            <p className="text-sm text-gray-600">
              You'll receive email updates about your order status.
            </p>
          </div>
          <div className="flex flex-col items-center p-3 text-center">
            <FaHome className="h-8 w-8 text-indigo-600 mb-2" />
            <h4 className="font-medium mb-1">Need Help?</h4>
            <p className="text-sm text-gray-600">
              Contact our customer support for any questions.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleContinueShopping}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
