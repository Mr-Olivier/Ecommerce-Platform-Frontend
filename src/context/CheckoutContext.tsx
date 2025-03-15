// context/CheckoutContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";
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
  createCheckoutSession: (
    addressData: any
  ) => Promise<{ success: boolean; error?: string }>;
  confirmPayment: (
    paymentIntentId: string
  ) => Promise<{ success: boolean; error?: string }>;
}

// Create the context with a default value
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Provider component
interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
  children,
}) => {
  const [addressData, setAddressData] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const {
    clientSecret,
    orderId,
    paymentSuccess,
    isLoading,
    error,
    createCheckoutSession: apiCreateCheckoutSession,
    confirmPayment: apiConfirmPayment,
  } = useCheckout();

  const saveAddressData = (data: any) => {
    setAddressData(data);
  };

  const createCheckoutSession = async (data: any) => {
    setAddressData(data);
    setPaymentError(null);

    try {
      return await apiCreateCheckoutSession(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create checkout session";
      setPaymentError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const confirmPayment = async (paymentIntentId: string) => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const result = await apiConfirmPayment(paymentIntentId);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment confirmation failed";
      setPaymentError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Create the value object
  const value: CheckoutContextType = {
    addressData,
    saveAddressData,
    clientSecret,
    orderId,
    isProcessingPayment,
    paymentError,
    paymentSuccess,
    createCheckoutSession,
    confirmPayment,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the checkout context
export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }
  return context;
};
