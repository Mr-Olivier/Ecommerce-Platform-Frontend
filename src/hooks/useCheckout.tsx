// hooks/useCheckout.tsx
import { useState, useEffect } from "react";
import { useCart } from "./useCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CheckoutSessionResponse {
  status: string;
  data?: {
    clientSecret: string;
    orderId: string;
    amount: number;
  };
  message?: string;
}

interface PaymentConfirmationResponse {
  status: string;
  message: string;
}

interface OrderResponse {
  status: string;
  message: string;
  data: {
    order: {
      id: string;
      userId: string;
      totalAmount: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      items: Array<{
        id: string;
        orderId: string;
        productId: string;
        quantity: number;
        price: string;
        product: {
          id: string;
          name: string;
          images: string[];
        };
      }>;
    };
  };
}

export const useCheckout = () => {
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // Listen for auth state changes (when user logs in or out)
    const handleAuthChange = () => {
      const updatedToken = localStorage.getItem("token");
      setToken(updatedToken);
    };

    window.addEventListener("auth-state-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, []);

  // Create axios instance with base configuration and auth token
  const getApi = () => {
    // Get the latest token (in case it changed)
    const currentToken = localStorage.getItem("token");

    return axios.create({
      baseURL: "http://localhost:4000/api",
      headers: {
        "Content-Type": "application/json",
        // Include token in Authorization header if it exists
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
      },
      withCredentials: true, // Include cookies if needed for authentication
    });
  };

  const createCheckoutSession = async (addressData: any) => {
    // Check if user is authenticated
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      setError("Authentication required. Please log in to continue.");
      return { success: false, error: "Authentication required" };
    }

    setIsLoading(true);
    setError(null);

    // Log the data being sent to the API
    console.log("Creating checkout session with address:", addressData);
    console.log("Cart items being sent:", cart.items);

    try {
      console.log(
        "Making API request to create checkout session with Axios..."
      );

      // Format the items correctly to match what the API expects
      const formattedItems = cart.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price:
          typeof item.price === "string" ? item.price : item.price.toString(),
      }));

      console.log("Formatted items:", formattedItems);

      const requestBody = {
        items: formattedItems,
        address: addressData,
      };

      console.log("Request body:", requestBody);
      console.log("Using auth token:", currentToken?.substring(0, 10) + "...");

      const api = getApi();
      const response = await api.post<CheckoutSessionResponse>(
        "/checkout/create-checkout-session",
        requestBody
      );

      console.log("API response status:", response.status);
      console.log("API response data:", response.data);

      if (response.data.status === "success" && response.data.data) {
        console.log(
          "Checkout session created successfully:",
          response.data.data
        );
        setClientSecret(response.data.data.clientSecret);
        setOrderId(response.data.data.orderId);
        return {
          success: true,
          clientSecret: response.data.data.clientSecret,
          orderId: response.data.data.orderId,
        };
      } else {
        console.error("API returned error or invalid data:", response.data);
        const errorMessage =
          response.data.message || "Failed to create checkout session";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error("Exception in createCheckoutSession:", err);

      // Axios-specific error handling
      if (axios.isAxiosError(err)) {
        console.error("Axios error details:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          message: err.message,
        });

        // Handle 401 Unauthorized specifically
        if (err.response?.status === 401) {
          // Token might be expired or invalid
          setError("Your session has expired. Please log in again.");
          // Redirect to login
          setTimeout(() => {
            navigate("/login?redirect=checkout");
          }, 2000);
          return { success: false, error: "Authentication required" };
        }

        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to connect to the server";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      // Generic error handling
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      console.error("Setting error message:", errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      console.log("Checkout session request completed");
    }
  };

  const confirmPayment = async (
    paymentIntentId: string,
    orderIdParam?: string,
    testMode: boolean = true // Default to true for testing
  ) => {
    // Check if user is authenticated
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      setError("Authentication required. Please log in to continue.");
      return { success: false, error: "Authentication required" };
    }

    setIsLoading(true);
    setError(null);

    // Use orderIdParam if provided, otherwise fall back to the one in state
    const paymentOrderId = orderIdParam || orderId;

    console.log("Exactly replicating successful Postman request");
    console.log("Parameters:", {
      paymentIntentId,
      orderId: paymentOrderId,
      testMode,
    });

    try {
      // Use fetch API directly to match exactly what Postman is doing
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000/api"
        }/checkout/confirm-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify({
            paymentIntentId,
            orderId: paymentOrderId,
            testMode,
          }),
        }
      );

      // Log raw response for debugging
      const text = await response.text();
      console.log("Raw response:", text);

      // Parse response if it's JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response is not valid JSON");
        return { success: false, error: "Invalid response from server" };
      }

      console.log("Parsed response:", data);

      if (data.status === "success") {
        console.log("Payment confirmed successfully");
        setPaymentSuccess(true);

        // Store order details in localStorage for the confirmation page
        localStorage.setItem(
          "completedOrder",
          JSON.stringify({
            id: paymentOrderId,
            paymentId: paymentIntentId,
            date: new Date().toISOString(),
            amount: data.data?.order?.totalAmount || "0",
          })
        );

        // Set a flag to clear cart after redirection completes
        sessionStorage.setItem("clearCartAfterPayment", "true");

        // Don't clear cart here to prevent redirect issues
        // clearCart(); - MOVED TO CONFIRMATION PAGE

        return { success: true };
      } else {
        console.error("Payment confirmation failed:", data.message);
        setError(data.message || "Payment confirmation failed");
        return { success: false, error: data.message };
      }
    } catch (err) {
      console.error("Exception in confirmPayment:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      console.log("Payment confirmation request completed");
    }
  };

  const createOrder = async () => {
    // Check if user is authenticated
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      setError("Authentication required. Please log in to continue.");
      return { success: false, error: "Authentication required" };
    }

    setIsLoading(true);
    setError(null);

    console.log("Creating order...");

    try {
      const api = getApi();
      const response = await api.post<OrderResponse>("/orders");

      console.log("Create order response:", response.data);

      if (response.data.status === "success") {
        console.log("Order created successfully:", response.data.data.order);
        return { success: true, order: response.data.data.order };
      } else {
        console.error("Failed to create order:", response.data.message);
        setError("Failed to create order");
        return { success: false, error: "Failed to create order" };
      }
    } catch (err) {
      console.error("Exception in createOrder:", err);

      if (axios.isAxiosError(err)) {
        // Handle 401 Unauthorized specifically
        if (err.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
          return { success: false, error: "Authentication required" };
        }

        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "An error occurred while creating the order";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      console.log("Create order request completed");
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return {
    isLoading,
    error,
    clientSecret,
    orderId,
    paymentSuccess,
    createCheckoutSession,
    confirmPayment,
    createOrder,
    isAuthenticated,
    showLoginModal,
    setShowLoginModal,
  };
};
