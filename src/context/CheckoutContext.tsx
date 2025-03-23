// context/CheckoutContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useCheckout } from "../hooks/useCheckout";

// Define the shape of the checkout context
interface CheckoutContextType {
  addressData: any;
  saveAddressData: (data: any) => void;
  clientSecret: string | null;
  orderId: string | null;
  isProcessingPayment: boolean;
  paymentError: string | null;
  paymentSuccess: boolean;
  isLoading: boolean;
  error: string | null;
  createCheckoutSession: (addressData: any) => Promise<{
    success: boolean;
    error?: string;
    clientSecret?: string;
    orderId?: string;
  }>;
  confirmPayment: (
    paymentIntentId: string,
    orderIdParam?: string,
    testMode?: boolean,
    skipValidation?: boolean // Add this parameter
  ) => Promise<{ success: boolean; error?: string }>;
  validatePayment: (
    paymentIntentId: string,
    orderIdParam?: string
  ) => Promise<{
    success: boolean;
    error?: string;
    status?: string;
    paymentDetails?: any;
  }>;
  validateSession: () => Promise<boolean>;
  debugCheckout: () => void;
}

// Create the context with a default value
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Provider component
interface CheckoutProviderProps {
  children: ReactNode;
}

const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const [addressData, setAddressData] = useState<any>(() => {
    // Try to load from localStorage if available
    const savedAddress = localStorage.getItem("checkoutAddressData");
    return savedAddress ? JSON.parse(savedAddress) : null;
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [localClientSecret, setLocalClientSecret] = useState<string | null>(
    () => localStorage.getItem("checkoutClientSecret")
  );
  const [localOrderId, setLocalOrderId] = useState<string | null>(() =>
    localStorage.getItem("checkoutOrderId")
  );
  const [paymentState, setPaymentState] = useState<string>("initial"); // 'initial', 'processing', 'confirmed', 'failed'
  const [lastPaymentIntentId, setLastPaymentIntentId] = useState<string | null>(
    null
  );

  // For debugging: Track context renders
  console.log("🔄 CheckoutProvider rendering");

  const {
    clientSecret: hookClientSecret,
    orderId: hookOrderId,
    paymentSuccess,
    isLoading,
    error,
    createCheckoutSession: apiCreateCheckoutSession,
    confirmPayment: apiConfirmPayment,
  } = useCheckout();

  // Sync hook values with local state when they change
  useEffect(() => {
    if (hookClientSecret && hookClientSecret !== localClientSecret) {
      console.log(
        "🔄 Updating local client secret from hook:",
        hookClientSecret
      );
      setLocalClientSecret(hookClientSecret);
      localStorage.setItem("checkoutClientSecret", hookClientSecret);
    }
  }, [hookClientSecret, localClientSecret]);

  useEffect(() => {
    if (hookOrderId && hookOrderId !== localOrderId) {
      console.log("🔄 Updating local order ID from hook:", hookOrderId);
      setLocalOrderId(hookOrderId);
      localStorage.setItem("checkoutOrderId", hookOrderId);
    }
  }, [hookOrderId, localOrderId]);

  // For debugging: Log when values change
  useEffect(() => {
    console.log("🔐 Context: Client secret updated:", localClientSecret);
  }, [localClientSecret]);

  useEffect(() => {
    console.log("📋 Context: Order ID updated:", localOrderId);
  }, [localOrderId]);

  const saveAddressData = useCallback((data: any) => {
    console.log("📝 Context: Saving address data:", data);
    setAddressData(data);
    localStorage.setItem("checkoutAddressData", JSON.stringify(data));
  }, []);

  const validatePayment = useCallback(
    async (paymentIntentId: string, orderIdParam?: string) => {
      if (!paymentIntentId) {
        console.error("❌ No payment intent ID provided for validation");
        return { success: false, error: "No payment intent ID provided" };
      }

      console.log("🔍 Context: Validating payment", paymentIntentId);

      try {
        // Call the hook's validatePayment function with appropriate parameters
        const result = await apiValidatePayment(paymentIntentId, orderIdParam);

        if (result.success) {
          console.log("✅ Context: Payment validation successful");
          // If the payment is valid, we can store the payment intent ID
          setLastPaymentIntentId(paymentIntentId);

          // Update payment state based on validation result
          if (result.status === "valid" || result.status === "succeeded") {
            setPaymentState("confirmed");
          } else if (result.status === "processing") {
            setPaymentState("processing");
          } else {
            setPaymentState("initial");
          }
        } else {
          console.error("❌ Context: Payment validation failed", result.error);
          setPaymentState("failed");
        }

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Payment validation failed";
        console.error("❌ Context: Error validating payment:", errorMessage);
        setPaymentError(errorMessage);
        setPaymentState("failed");
        return { success: false, error: errorMessage };
      }
    },
    []
  );

  const createCheckoutSession = useCallback(
    async (data: any) => {
      console.log("🛒 Context: Creating checkout session with data:", data);
      setAddressData(data);
      localStorage.setItem("checkoutAddressData", JSON.stringify(data));
      setPaymentError(null);

      try {
        console.log("⏳ Context: Calling API createCheckoutSession...");
        const result = await apiCreateCheckoutSession(data);
        console.log("📦 Context: API returned result:", result);

        if (result.success) {
          // Store data from the result in localStorage and local state
          if (result.clientSecret) {
            console.log(
              "💾 Context: Storing client secret:",
              result.clientSecret
            );
            setLocalClientSecret(result.clientSecret);
            localStorage.setItem("checkoutClientSecret", result.clientSecret);
          } else {
            console.warn("⚠️ Context: No client secret in successful result!");
          }

          if (result.orderId) {
            console.log("💾 Context: Storing order ID:", result.orderId);
            setLocalOrderId(result.orderId);
            localStorage.setItem("checkoutOrderId", result.orderId);
          } else {
            console.warn("⚠️ Context: No order ID in successful result!");
          }
        } else {
          console.error("❌ Context: API call failed:", result.error);
        }

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to create checkout session";
        console.error(
          "❌ Context: Error in createCheckoutSession:",
          errorMessage
        );
        setPaymentError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [apiCreateCheckoutSession]
  );

  const confirmPayment = useCallback(
    async (
      paymentIntentId: string,
      orderIdParam?: string,
      testMode: boolean = true,
      skipValidation: boolean = false
    ) => {
      console.log("💳 Context: Confirming payment with ID:", paymentIntentId);
      console.log("🔐 Context: Using client secret:", localClientSecret);
      console.log("📋 Context: Using order ID:", localOrderId);
      console.log("🔄 Context: Skip validation:", skipValidation);

      // Backup: if context state doesn't have values, try localStorage
      const backupClientSecret = localStorage.getItem("checkoutClientSecret");
      const backupOrderId = localStorage.getItem("checkoutOrderId");

      if (!localClientSecret && backupClientSecret) {
        console.warn(
          "⚠️ Context: Using backup client secret from localStorage"
        );
        setLocalClientSecret(backupClientSecret);
      }

      if (!localOrderId && backupOrderId) {
        console.warn("⚠️ Context: Using backup order ID from localStorage");
        setLocalOrderId(backupOrderId);
      }

      setIsProcessingPayment(true);
      setPaymentError(null);

      try {
        console.log("⏳ Context: Calling API confirmPayment...");
        // Pass the skipValidation parameter to the hook function
        const result = await apiConfirmPayment(
          paymentIntentId,
          orderIdParam,
          testMode,
          skipValidation
        );
        console.log("📦 Context: Payment confirmation result:", result);

        if (result.success) {
          // Clear checkout data after successful payment
          localStorage.removeItem("checkoutClientSecret");
          localStorage.removeItem("checkoutOrderId");
          setLocalClientSecret(null);
          setLocalOrderId(null);
          setPaymentState("initial");
          setLastPaymentIntentId(null);
        }

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Payment confirmation failed";
        console.error("❌ Context: Error in confirmPayment:", errorMessage);
        setPaymentError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsProcessingPayment(false);
      }
    },
    [localClientSecret, localOrderId, apiConfirmPayment]
  );

  // Add a function to validate the checkout session
  const validateSession = useCallback(async () => {
    if (!addressData) {
      console.warn("⚠️ Cannot validate session: No address data available");
      return false;
    }

    // Simple validation for now - just checks if we have client secret and order ID
    const hasClientSecret = !!(localClientSecret || hookClientSecret);
    const hasOrderId = !!(localOrderId || hookOrderId);

    console.log("🔍 Validating checkout session");
    console.log("Has client secret:", hasClientSecret);
    console.log("Has order ID:", hasOrderId);

    if (hasClientSecret && hasOrderId) {
      return true;
    }

    // If we don't have both, try to create a new session
    if (addressData) {
      console.log("Creating new checkout session...");
      const result = await createCheckoutSession(addressData);
      return result.success;
    }

    return false;
  }, [
    addressData,
    localClientSecret,
    localOrderId,
    hookClientSecret,
    hookOrderId,
    createCheckoutSession,
  ]);

  // Add a debug function
  const debugCheckout = useCallback(() => {
    const debug = {
      clientSecret: localClientSecret || hookClientSecret,
      orderId: localOrderId || hookOrderId,
      addressData: addressData ? "exists" : "null",
      paymentSuccess,
      isLoading,
      error,
    };
    console.log("Debug checkout state:", debug);
    return debug;
  }, [
    localClientSecret,
    localOrderId,
    hookClientSecret,
    hookOrderId,
    addressData,
    paymentSuccess,
    isLoading,
    error,
  ]);

  // Create the value object with final values
  const value: CheckoutContextType = {
    addressData,
    saveAddressData,
    clientSecret: localClientSecret || hookClientSecret,
    orderId: localOrderId || hookOrderId,
    isProcessingPayment,
    paymentError,
    paymentSuccess,
    isLoading,
    error,
    createCheckoutSession,
    confirmPayment,
    validateSession,
    debugCheckout,
  };

  // Debug the context value being provided
  console.log("🔄 Context value being provided:", {
    addressData: value.addressData ? "exists" : "null",
    clientSecret: value.clientSecret ? "exists" : "null",
    orderId: value.orderId ? "exists" : "null",
    paymentSuccess: value.paymentSuccess,
  });

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the checkout context
const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }

  // Debug whenever the context is accessed
  console.log("🔄 useCheckoutContext called, values:", {
    clientSecret: context.clientSecret ? "exists" : "null",
    orderId: context.orderId ? "exists" : "null",
  });

  return context;
};

export { CheckoutProvider, useCheckoutContext };
