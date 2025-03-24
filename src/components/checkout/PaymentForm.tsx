// Updated PaymentForm component with API integration
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaPaypal,
  FaLock,
  FaRegQuestionCircle,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import {
  SiMastercard,
  SiVisa,
  SiAmericanexpress,
  SiDiscover,
} from "react-icons/si";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCheckoutContext } from "../../context/CheckoutContext.tsx";

interface PaymentFormProps {
  prevStep: () => void;
}

interface SavedCard {
  id: string;
  cardType: string;
  lastFour: string;
  expiryDate: string;
  nameOnCard: string;
  isDefault: boolean;
}

interface PaypalData {
  orderId: string;
  paypalOrderId: string;
  approvalUrl: string;
  amount: string;
}

interface FormData {
  paymentMethod: string;
  selectedSavedCard: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  savePaymentInfo: boolean;
  setAsDefault: boolean;
  paypalEmail: string;
  idType?: string;
  idNumber?: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm: React.FC<PaymentFormProps> = ({ prevStep }) => {
  const {
    confirmPayment,
    // isProcessingPayment,
    // paymentError: contextPaymentError,
    clientSecret,
    isLoading,
    error,
    orderId,
    addressData,
    createCheckoutSession,
  } = useCheckoutContext();

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showIdVerification, setShowIdVerification] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [isLoadingSavedCards, setIsLoadingSavedCards] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // const [paymentState, setPaymentState] = useState("initial"); // 'initial', 'processing', 'confirmed', 'failed'
  // const [paymentIntentId, setPaymentIntentId] = useState(null);

  ////////////////////////////////////////////////

  const [paymentState, setPaymentState] = useState("initial"); // 'initial', 'processing', 'confirmed', 'failed'
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [paypalData, setPaypalData] = useState<PaypalData | null>(null);
  const [isCreatingPaypalSession, setIsCreatingPaypalSession] = useState(false);

  // Add this useEffect near the top of your PaymentForm component
  useEffect(() => {
    // Check URL parameters for PayPal return
    const urlParams = new URLSearchParams(window.location.search);
    const paypalToken = urlParams.get("token");
    const paypalPayerId = urlParams.get("PayerID");

    if (paypalToken && paypalPayerId) {
      console.log("Detected return from PayPal. Processing payment...");

      // Get stored order information
      const paypalOrderId = localStorage.getItem("paypalOrderId");
      const orderId = localStorage.getItem("pendingOrderId");

      if (paypalOrderId && orderId) {
        // Show a loading message
        setPaymentState("processing");
        setIsProcessing(true);
        setPaymentError(null);
        setSuccessMessage("Processing your PayPal payment...");
        setShowSuccessMessage(true);

        // Call your existing confirmPaypalPayment function
        confirmPaypalPayment()
          .then(() => {
            // Clean URL without reloading the page
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          })
          .catch((error) => {
            console.error("Error confirming PayPal payment:", error);
            // Clean URL even on error
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          });
      } else {
        setPaymentError(
          "PayPal payment information is missing. Please try again."
        );
        // Clean URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  }, []);

  // Add this function to handle PayPal checkout
  const handlePaypalCheckout = async () => {
    try {
      setIsProcessing(true);
      setIsCreatingPaypalSession(true);
      setPaymentError(null);

      console.log("Creating PayPal checkout session...");

      // Get token for authentication
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please log in to continue.");
      }

      // Create a PayPal checkout session
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000/api"
        }/checkout/create-paypal-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // Specify your return URL to be your checkout page
          body: JSON.stringify({
            returnUrl: window.location.origin + "/checkout",
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("PayPal session creation failed:", errorText);
        throw new Error("Failed to create PayPal checkout session");
      }

      const data = await response.json();
      console.log("PayPal session created:", data);

      if (data.status === "success" && data.data) {
        // Store necessary data in localStorage for when user returns
        localStorage.setItem("paypalOrderId", data.data.paypalOrderId);
        localStorage.setItem("pendingOrderId", data.data.orderId);

        // IMPORTANT CHANGE: Directly redirect to PayPal instead of showing intermediate screen
        console.log("Redirecting to PayPal:", data.data.approvalUrl);
        window.location.href = data.data.approvalUrl;
      } else {
        throw new Error(
          data.message || "Failed to create PayPal checkout session"
        );
      }
    } catch (error) {
      console.error("PayPal checkout error:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "There was an error setting up PayPal checkout. Please try again."
      );
      setPaymentState("failed");
    } finally {
      setIsProcessing(false);
      setIsCreatingPaypalSession(false);
    }
  };
  // Add this function to handle redirecting to PayPal
  const handlePayWithPaypal = () => {
    if (paypalData && paypalData.approvalUrl) {
      // Store orderId and paypalOrderId in localStorage for when the user returns
      localStorage.setItem("paypalOrderId", paypalData.paypalOrderId);
      localStorage.setItem("pendingOrderId", paypalData.orderId);

      // Redirect to PayPal
      window.location.href = paypalData.approvalUrl;
    } else {
      setPaymentError(
        "PayPal checkout information is missing. Please try again."
      );
    }
  };

  // Add this function to confirm PayPal payment (used when returning from PayPal)
  const confirmPaypalPayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentError(null);

      // Get stored data
      const paypalOrderId = localStorage.getItem("paypalOrderId");
      const orderId = localStorage.getItem("pendingOrderId");

      if (!paypalOrderId || !orderId) {
        throw new Error(
          "PayPal payment information is missing. Please start over."
        );
      }

      // Get token for authentication
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please log in to continue.");
      }

      console.log("Confirming PayPal payment...");
      console.log("PayPal Order ID:", paypalOrderId);
      console.log("Order ID:", orderId);

      // Confirm the PayPal payment
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000/api"
        }/checkout/confirm-paypal-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paypalOrderId,
            orderId,
            testMode: true, // Set to false for production
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("PayPal payment confirmation failed:", errorText);
        throw new Error("Failed to confirm PayPal payment");
      }

      const data = await response.json();
      console.log("PayPal payment confirmed:", data);

      if (data.status === "success") {
        // Show success message
        setSuccessMessage("PayPal payment confirmed! Order has been placed.");
        setShowSuccessMessage(true);

        // Store order details for confirmation page
        localStorage.setItem(
          "completedOrder",
          JSON.stringify({
            id: orderId,
            paymentId: paypalOrderId,
            date: new Date().toISOString(),
            amount: data.data?.order?.totalAmount || paypalData?.amount || "0",
            paymentMethod: "PayPal",
          })
        );

        // Clear PayPal session data
        localStorage.removeItem("paypalOrderId");
        localStorage.removeItem("pendingOrderId");

        // Set flag to clear cart
        sessionStorage.setItem("clearCartAfterPayment", "true");

        // Redirect to confirmation page after short delay
        setTimeout(() => {
          navigate("/checkout/confirmation");
        }, 1500);
      } else {
        throw new Error(data.message || "Failed to confirm PayPal payment");
      }
    } catch (error) {
      console.error("PayPal confirmation error:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "There was an error confirming your PayPal payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Add this to check for returning from PayPal
  useEffect(() => {
    // Check if returning from PayPal
    const urlParams = new URLSearchParams(window.location.search);
    const paypalToken = urlParams.get("token");
    const paypalPayerId = urlParams.get("PayerID");

    if (paypalToken && paypalPayerId) {
      console.log("Detected return from PayPal. Processing payment...");
      // User has returned from PayPal, need to confirm the payment
      confirmPaypalPayment();

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Add this helper function to process payment only (not placing order)
  const processPaymentOnly = async (
    clientSecretStr: string,
    orderIdStr?: string
  ) => {
    try {
      console.log("Processing payment only...");
      console.log("Client secret:", clientSecretStr.substring(0, 10) + "...");

      // For credit card payments
      if (selectedPaymentMethod === "credit-card") {
        if (stripe && elements) {
          const cardElement = elements.getElement(CardElement);

          if (cardElement) {
            // eslint-disable-next-line no-useless-catch
            try {
              // Process with Stripe
              console.log("Processing with Stripe...");
              const stripeResult = await stripe.confirmCardPayment(
                clientSecretStr,
                {
                  payment_method: {
                    card: cardElement,
                    billing_details: {
                      name: watch("nameOnCard"),
                    },
                  },
                }
              );

              if (stripeResult.error) {
                throw new Error(stripeResult.error.message || "Payment failed");
              }

              // Payment succeeded
              console.log(
                "Stripe payment succeeded:",
                stripeResult.paymentIntent
              );
              setPaymentIntentId(stripeResult.paymentIntent.id);
            } catch (error) {
              throw error;
            }
          } else {
            // Fallback for testing when CardElement is not available
            console.log("CardElement not available, using test payment flow");
            const mockPaymentId =
              clientSecretStr.split("_secret_")[0] ||
              "mock_payment_" + Date.now();
            setPaymentIntentId(mockPaymentId);
          }
        } else {
          // Fallback for when Stripe is not available
          console.log("Stripe not available, using test payment flow");
          const mockPaymentId =
            clientSecretStr.split("_secret_")[0] ||
            "mock_payment_" + Date.now();
          setPaymentIntentId(mockPaymentId);
        }
      }
      // For PayPal or other payment methods
      else {
        console.log("Processing with PayPal or other method...");
        const mockPaymentId =
          clientSecretStr.split("_secret_")[0] || "mock_payment_" + Date.now();
        setPaymentIntentId(mockPaymentId);
      }

      // Set payment as confirmed
      setPaymentState("confirmed");

      // Show success message
      setSuccessMessage("Payment processed successfully!");
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return true;
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "There was an error processing your payment. Please try again."
      );
      setPaymentState("failed");
      return false;
    }
  };

  // Add this function to handle the Pay Now button
  const handlePayNow = async () => {
    // If PayPal is selected, use the PayPal flow
    if (selectedPaymentMethod === "paypal") {
      await handlePaypalCheckout();
      return;
    }

    // Otherwise proceed with the existing credit card flow
    setIsProcessing(true);
    setPaymentError(null);
    setPaymentState("processing");

    setIsProcessing(true);
    setPaymentError(null);
    setPaymentState("processing");

    console.log("==== PAYMENT PROCESSING STARTED ====");

    // Get client secret from context or localStorage with more detailed logging
    const paymentClientSecret =
      clientSecret || localStorage.getItem("checkoutClientSecret");
    const paymentOrderId = orderId || localStorage.getItem("checkoutOrderId");

    console.log(
      "💳 PaymentForm: Using client secret:",
      paymentClientSecret
        ? `exists (${paymentClientSecret.substring(0, 10)}...)`
        : "MISSING"
    );
    console.log("📝 PaymentForm: Using order ID:", paymentOrderId || "MISSING");
    console.log(
      "🧾 PaymentForm: Address data:",
      addressData ? "exists" : "missing"
    );

    // Check if client secret is missing
    if (!paymentClientSecret) {
      console.error("❌ PaymentForm: Missing client secret");

      // Try to recreate checkout session if address data is available
      if (addressData && typeof createCheckoutSession === "function") {
        console.log("🔄 PaymentForm: Attempting to recreate checkout session");
        try {
          const result = await createCheckoutSession(addressData);
          console.log("📦 Checkout session result:", result);

          if (result.success && result.clientSecret) {
            console.log(
              "✅ PaymentForm: Successfully recreated checkout session"
            );

            // Directly store in localStorage to ensure availability
            if (result.clientSecret) {
              localStorage.setItem("checkoutClientSecret", result.clientSecret);
            }

            if (result.orderId) {
              localStorage.setItem("checkoutOrderId", result.orderId);
            }

            // Wait a moment for state to update
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Get the new client secret
            const newClientSecret =
              result.clientSecret ||
              localStorage.getItem("checkoutClientSecret");

            if (newClientSecret) {
              console.log(
                "🔑 PaymentForm: Using new client secret:",
                newClientSecret.substring(0, 10) + "..."
              );

              // Process payment only
              await processPaymentOnly(newClientSecret, result.orderId);
            } else {
              throw new Error(
                "Failed to retrieve client secret after session creation"
              );
            }
          } else {
            throw new Error("Session creation failed or missing client secret");
          }
        } catch (err) {
          console.error(
            "❌ PaymentForm: Error recreating checkout session:",
            err
          );
          setPaymentError(
            err instanceof Error
              ? err.message
              : "Failed to create checkout session"
          );
          setPaymentState("failed");
        }
      } else {
        // Provide more detailed error message based on what's missing
        let errorMessage = "Missing payment information. ";

        if (!addressData) {
          errorMessage += "No shipping address found. ";
        }

        if (typeof createCheckoutSession !== "function") {
          errorMessage += "Payment system not properly initialized. ";
        }

        errorMessage += "Please try again or go back to the cart.";

        setPaymentError(errorMessage);
        setPaymentState("failed");
      }
    } else {
      // Process payment with existing client secret
      await processPaymentOnly(
        paymentClientSecret,
        paymentOrderId || undefined
      );
    }

    setIsProcessing(false);
  };

  // Add this function to handle the Place Order button
  const handlePlaceOrder = async () => {
    if (!paymentIntentId) {
      setPaymentError("Payment must be completed before placing order");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      console.log("==== PLACING ORDER ====");
      const paymentOrderId = orderId || localStorage.getItem("checkoutOrderId");

      if (!paymentOrderId) {
        throw new Error("Order information is missing. Please try again.");
      }

      console.log("Using payment ID:", paymentIntentId);
      console.log("Using order ID:", paymentOrderId);
      console.log(
        "API URL:",
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000/api"
        }/checkout/confirm-payment`
      );

      // Get token for authentication
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please log in to continue.");
      }

      // Make direct API call to confirm payment and place order
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000/api"
        }/checkout/confirm-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentIntentId,
            orderId: paymentOrderId,
            testMode: true, // Enable test mode
          }),
        }
      );

      // Process the response
      const text = await response.text();
      console.log("Raw response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      console.log("Parsed response:", data);

      if (data.status === "success") {
        console.log("Order placed successfully!");

        // Show order success message
        setSuccessMessage(
          "Order placed successfully! Redirecting to confirmation page..."
        );
        setShowSuccessMessage(true);

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

        // Set flag to clear cart after redirection completes
        sessionStorage.setItem("clearCartAfterPayment", "true");

        // Short delay before redirecting
        setTimeout(() => {
          navigate("/checkout/confirmation");
        }, 1500);
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "There was an error placing your order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  /////////////////////////////////////////////////////////////////

  // Add this after your useState declarations
  useEffect(() => {
    console.log("📋 PaymentForm: clientSecret from context:", clientSecret);
    console.log("📋 PaymentForm: orderId from context:", orderId);

    // Also check localStorage as fallback
    const storedSecret = localStorage.getItem("checkoutClientSecret");
    const storedOrderId = localStorage.getItem("checkoutOrderId");

    console.log(
      "📋 PaymentForm: clientSecret from localStorage:",
      storedSecret
    );
    console.log("📋 PaymentForm: orderId from localStorage:", storedOrderId);
  }, [clientSecret, orderId]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "credit-card",
      savePaymentInfo: false,
      setAsDefault: false,
    },
  });

  const navigate = useNavigate();
  const selectedPaymentMethod = watch("paymentMethod");
  const selectedSavedCard = watch("selectedSavedCard");

  // Mock function to fetch saved cards - in a real app, this would come from your API
  useEffect(() => {
    const fetchSavedCards = async () => {
      setIsLoadingSavedCards(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - this would come from your backend
        const mockSavedCards: SavedCard[] = [
          {
            id: "card_1",
            cardType: "visa",
            lastFour: "4242",
            expiryDate: "12/24",
            nameOnCard: "John Doe",
            isDefault: true,
          },
          {
            id: "card_2",
            cardType: "mastercard",
            lastFour: "5678",
            expiryDate: "09/25",
            nameOnCard: "John Doe",
            isDefault: false,
          },
        ];

        setSavedCards(mockSavedCards);

        // If there are saved cards, select the default one
        if (mockSavedCards.length > 0) {
          const defaultCard =
            mockSavedCards.find((card) => card.isDefault) || mockSavedCards[0];
          setValue("selectedSavedCard", defaultCard.id);
          setValue("paymentMethod", "credit-card");
          setShowNewCardForm(false);
        } else {
          setShowNewCardForm(true);
        }
      } catch (error) {
        console.error("Error fetching saved cards:", error);
        setShowNewCardForm(true);
      } finally {
        setIsLoadingSavedCards(false);
      }
    };

    fetchSavedCards();
  }, [setValue]);

  // Add this function to handle the "Pay Now" functionality
  // const handlePayNow = async () => {
  //   setIsProcessing(true);
  //   setPaymentError(null);
  //   setPaymentState("processing");

  //   console.log("==== PAYMENT PROCESSING STARTED ====");

  //   // Get client secret from context or localStorage with more detailed logging
  //   const paymentClientSecret =
  //     clientSecret || localStorage.getItem("checkoutClientSecret");
  //   const paymentOrderId = orderId || localStorage.getItem("checkoutOrderId");

  //   console.log(
  //     "💳 PaymentForm: Using client secret:",
  //     paymentClientSecret
  //       ? `exists (${paymentClientSecret.substring(0, 10)}...)`
  //       : "MISSING"
  //   );
  //   console.log("📝 PaymentForm: Using order ID:", paymentOrderId || "MISSING");

  //   if (!paymentClientSecret) {
  //     console.error("❌ PaymentForm: Missing client secret");
  //     setPaymentError(
  //       "Payment information is missing. Please try again or go back to the cart."
  //     );
  //     setIsProcessing(false);
  //     setPaymentState("failed");
  //     return;
  //   }

  //   try {
  //     // Process payment based on selected payment method
  //     if (selectedPaymentMethod === "paypal") {
  //       // Simulate PayPal payment for testing
  //       console.log("Processing PayPal payment...");
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Generate test payment ID
  //       const mockPaymentId = "mock_paypal_" + Date.now();
  //       setPaymentIntentId(mockPaymentId);
  //       setPaymentState("confirmed");
  //     } else {
  //       // Credit card payment
  //       if (
  //         selectedSavedCard &&
  //         selectedSavedCard !== "new_card" &&
  //         !showNewCardForm
  //       ) {
  //         // Using saved card
  //         console.log(`Using saved card ${selectedSavedCard}`);
  //         await new Promise((resolve) => setTimeout(resolve, 1000));

  //         // Generate test payment ID
  //         const mockPaymentId = "mock_saved_card_" + Date.now();
  //         setPaymentIntentId(mockPaymentId);
  //         setPaymentState("confirmed");
  //       } else {
  //         // Using Stripe or fallback
  //         if (stripe && elements && paymentClientSecret) {
  //           const cardElement = elements.getElement(CardElement);

  //           if (cardElement) {
  //             try {
  //               // Process with Stripe
  //               console.log("Processing payment with Stripe...");
  //               const stripeResult = await stripe.confirmCardPayment(
  //                 paymentClientSecret,
  //                 {
  //                   payment_method: {
  //                     card: cardElement,
  //                     billing_details: {
  //                       name: watch("nameOnCard"),
  //                     },
  //                   },
  //                 }
  //               );

  //               if (stripeResult.error) {
  //                 console.error("Stripe payment error:", stripeResult.error);
  //                 setPaymentError(
  //                   stripeResult.error.message || "Payment failed"
  //                 );
  //                 setPaymentState("failed");
  //               } else if (stripeResult.paymentIntent) {
  //                 console.log(
  //                   "Stripe payment successful!",
  //                   stripeResult.paymentIntent
  //                 );
  //                 setPaymentIntentId(stripeResult.paymentIntent.id);
  //                 setPaymentState("confirmed");
  //               }
  //             } catch (stripeError) {
  //               console.error("Stripe API error:", stripeError);
  //               setPaymentError("Error processing payment with Stripe");
  //               setPaymentState("failed");
  //             }
  //           } else {
  //             // Fallback for testing
  //             console.log("Using test payment flow");
  //             const mockPaymentId = "mock_payment_" + Date.now();
  //             setPaymentIntentId(mockPaymentId);
  //             setPaymentState("confirmed");
  //           }
  //         } else {
  //           // Simple fallback
  //           console.log("Payment processor not available. Using fallback...");
  //           const mockPaymentId = "mock_fallback_" + Date.now();
  //           setPaymentIntentId(mockPaymentId);
  //           setPaymentState("confirmed");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Payment processing error:", error);
  //     setPaymentError(
  //       "There was an error processing your payment. Please try again."
  //     );
  //     setPaymentState("failed");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // Add this function to handle the final "Place Order" step
  // const handlePlaceOrder = async () => {
  //   if (!paymentIntentId) {
  //     setPaymentError("Payment must be completed before placing order");
  //     return;
  //   }

  //   setIsProcessing(true);
  //   setPaymentError(null);

  //   try {
  //     const paymentOrderId = orderId || localStorage.getItem("checkoutOrderId");

  //     // Call the confirm payment API to finalize the order
  //     const result = await confirmPayment(
  //       paymentIntentId,
  //       paymentOrderId,
  //       true // Use test mode for now
  //     );

  //     if (result.success) {
  //       // Redirect to order confirmation
  //       navigate("/checkout/confirmation");
  //     } else {
  //       setPaymentError(result.error || "Failed to place order");
  //     }
  //   } catch (error) {
  //     console.error("Order placement error:", error);
  //     setPaymentError(
  //       "There was an error placing your order. Please try again."
  //     );
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // Format credit card number with spaces
  const formatCreditCardNumber = (value: string) => {
    if (!value) return value;

    // Remove all non-digit characters
    const v = value.replace(/\D/g, "");

    // Format with spaces after every 4 digits
    const formatted = v.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Return formatted string, max 19 chars (16 digits + 3 spaces)
    return formatted.substr(0, 19);
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    if (!value) return value;

    // Remove all non-digit characters
    const v = value.replace(/\D/g, "");

    // Add slash after first 2 digits
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  // Validate expiry date
  const validateExpiryDate = (value: string) => {
    if (!value) return "Expiry date is required";

    const pattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!pattern.test(value)) return "Invalid format (MM/YY)";

    const [month, year] = value.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed

    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      return "Card has expired";
    }

    return true;
  };

  // Detect card type based on number
  const detectCardType = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, "");

    // Visa: Starts with 4
    if (/^4/.test(cleanNumber)) return "visa";

    // Mastercard: Starts with 51-55 or 2221-2720
    if (
      /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/.test(
        cleanNumber
      )
    )
      return "mastercard";

    // American Express: Starts with 34 or 37
    if (/^3[47]/.test(cleanNumber)) return "amex";

    // Discover: Starts with 6011, 622126-622925, 644-649, 65
    if (
      /^(6011|65|64[4-9]|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5]))/.test(
        cleanNumber
      )
    )
      return "discover";

    return "unknown";
  };

  const cardType = watch("cardNumber")
    ? detectCardType(watch("cardNumber"))
    : null;

  // Function to remove a saved card
  const handleRemoveSavedCard = (cardId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // In a real app, you would call your API to delete the card
    console.log(`Removing card ${cardId}`);

    setSavedCards((prev) => prev.filter((card) => card.id !== cardId));

    // If we're removing the selected card, select another one or show the new card form
    if (selectedSavedCard === cardId) {
      const remainingCards = savedCards.filter((card) => card.id !== cardId);
      if (remainingCards.length > 0) {
        setValue("selectedSavedCard", remainingCards[0].id);
      } else {
        setShowNewCardForm(true);
      }
    }
  };

  // Function to handle adding a new card
  const handleAddNewCard = () => {
    setValue("selectedSavedCard", "");
    setShowNewCardForm(true);
  };

  // Function to set a card as default
  const handleSetAsDefault = (cardId: string) => {
    // In a real app, you would call your API to update the default card
    setSavedCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Determine what action to take based on the current payment state
    if (paymentState === "initial") {
      // If payment hasn't been processed yet, trigger the payment flow
      await handlePayNow();
    } else if (paymentState === "confirmed" && paymentIntentId) {
      // If payment is confirmed, trigger the order placement
      await handlePlaceOrder();
    } else {
      // Use the existing flow for backward compatibility or fallback
      setIsProcessing(true);
      setPaymentError(null);

      console.log("==== PAYMENT SUBMISSION STARTED ====");

      // Get client secret from context or localStorage with more detailed logging
      const paymentClientSecret =
        clientSecret || localStorage.getItem("checkoutClientSecret");
      const paymentOrderId = orderId || localStorage.getItem("checkoutOrderId");

      console.log(
        "💳 PaymentForm: Using client secret:",
        paymentClientSecret
          ? `exists (${paymentClientSecret.substring(0, 10)}...)`
          : "MISSING"
      );
      console.log(
        "📝 PaymentForm: Using order ID:",
        paymentOrderId || "MISSING"
      );
      console.log(
        "🧾 PaymentForm: Address data:",
        addressData ? "exists" : "missing"
      );

      // Check if client secret is missing
      if (!paymentClientSecret) {
        console.error("❌ PaymentForm: Missing client secret");

        // Try to recreate checkout session if address data is available
        if (addressData && typeof createCheckoutSession === "function") {
          console.log(
            "🔄 PaymentForm: Attempting to recreate checkout session"
          );
          try {
            const result = await createCheckoutSession(addressData);
            console.log("📦 Checkout session result:", result);

            if (result.success && result.clientSecret) {
              console.log(
                "✅ PaymentForm: Successfully recreated checkout session"
              );

              // Directly store in localStorage to ensure availability
              if (result.clientSecret) {
                localStorage.setItem(
                  "checkoutClientSecret",
                  result.clientSecret
                );
              }

              if (result.orderId) {
                localStorage.setItem("checkoutOrderId", result.orderId);
              }

              // Wait a moment for state to update
              await new Promise((resolve) => setTimeout(resolve, 500));

              // Get the new client secret
              const newClientSecret =
                result.clientSecret ||
                localStorage.getItem("checkoutClientSecret");

              if (newClientSecret) {
                console.log(
                  "🔑 PaymentForm: Using new client secret:",
                  newClientSecret.substring(0, 10) + "..."
                );
                // Continue with payment using the new client secret and test mode enabled
                await processPaymentWithSecret({
                  data,
                  paymentClientSecret: newClientSecret,
                  paymentOrderId: result.orderId,
                  testMode: true, // Enable test mode
                });
                return;
              } else {
                console.error(
                  "❌ PaymentForm: Failed to retrieve new client secret after session creation"
                );
              }
            } else {
              console.error(
                "❌ PaymentForm: Session creation failed or missing client secret:",
                result
              );
            }
          } catch (err) {
            console.error(
              "❌ PaymentForm: Error recreating checkout session:",
              err
            );
          }
        } else {
          console.error(
            "❌ PaymentForm: Cannot recreate session - missing address data or createCheckoutSession function"
          );
        }

        // Provide more detailed error message based on what's missing
        let errorMessage = "Missing payment information. ";

        if (!addressData) {
          errorMessage += "No shipping address found. ";
        }

        if (typeof createCheckoutSession !== "function") {
          errorMessage += "Payment system not properly initialized. ";
        }

        errorMessage += "Please try again or go back to the cart.";

        setPaymentError(errorMessage);
        setIsProcessing(false);

        // Try manual recovery - Check if we can force set client secret from URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlClientSecret = urlParams.get("payment_intent_client_secret");
        if (urlClientSecret) {
          console.log("🔍 Found client secret in URL, trying to use it");
          await processPaymentWithSecret({
            data,
            paymentClientSecret: paymentClientSecret || "", // Convert null to empty string
            paymentOrderId: paymentOrderId || undefined,
            testMode: true,
          });
        }

        return;
      }
    }
  };

  interface ProcessPaymentWithSecretParams {
    data: FormData;
    paymentClientSecret: string;
    paymentOrderId?: string;
    testMode?: boolean;
  }

  // Helper function to process payment with a valid client secret
  const processPaymentWithSecret = async ({
    data,
    paymentClientSecret,
    paymentOrderId,
    testMode = true,
  }: ProcessPaymentWithSecretParams) => {
    try {
      console.log("Processing payment with test mode:", testMode);
      console.log(
        "Client secret:",
        paymentClientSecret
          ? paymentClientSecret.substring(0, 10) + "..."
          : "missing"
      );
      console.log("Order ID:", paymentOrderId);

      // Handle different payment methods
      if (data.paymentMethod === "paypal") {
        // Simulate PayPal redirect
        console.log("Redirecting to PayPal...");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For testing in development:
        const paymentIntentId =
          paymentClientSecret.split("_secret_")[0] || "mock_paypal_payment_id";

        console.log(
          "Simulating successful PayPal payment with ID:",
          paymentIntentId
        );

        // Pass test mode parameter
        const result = await confirmPayment(
          paymentIntentId,
          paymentOrderId,
          testMode
        );

        if (result.success) {
          console.log(
            "Payment successful! Redirecting to confirmation page..."
          );

          // Store the completed order details in localStorage
          localStorage.setItem(
            "completedOrder",
            JSON.stringify({
              id: paymentOrderId,
              paymentId: paymentIntentId,
              date: new Date().toISOString(),
            })
          );

          // Use window.location for direct navigation
          window.location.href = "/checkout/confirmation";
          return; // Stop further execution
        } else {
          setPaymentError(result.error || "Payment failed with saved card");
        }
      } else {
        // Credit card payment
        if (
          selectedSavedCard &&
          selectedSavedCard !== "new_card" &&
          !showNewCardForm
        ) {
          // Using saved card
          console.log(`Using saved card ${selectedSavedCard}`);

          const paymentIntentId =
            paymentClientSecret.split("_secret_")[0] ||
            "mock_saved_card_payment_id";

          console.log(
            "Simulating successful saved card payment with ID:",
            paymentIntentId
          );

          // Pass testMode and orderId
          const result = await confirmPayment(
            paymentIntentId,
            paymentOrderId,
            testMode
          );

          if (result.success) {
            navigate("/checkout/confirmation");
          } else {
            setPaymentError(result.error || "Payment failed with saved card");
          }
        } else {
          // Using new card with Stripe
          if (stripe && elements && paymentClientSecret) {
            const cardElement = elements.getElement(CardElement);

            if (cardElement && !testMode) {
              // Only use actual Stripe if NOT in test mode
              console.log("Processing payment with Stripe...");
              console.log(
                "Using client secret:",
                paymentClientSecret.substring(0, 10) + "..."
              );

              try {
                // First confirm payment with Stripe
                const stripeResult = await stripe.confirmCardPayment(
                  paymentClientSecret,
                  {
                    payment_method: {
                      card: cardElement,
                      billing_details: {
                        name: data.nameOnCard,
                      },
                    },
                  }
                );

                if (stripeResult.error) {
                  console.error("Stripe payment error:", stripeResult.error);
                  setPaymentError(
                    stripeResult.error.message || "Payment failed"
                  );
                } else if (stripeResult.paymentIntent) {
                  console.log(
                    "Stripe payment successful!",
                    stripeResult.paymentIntent
                  );
                  console.log("Payment ID:", stripeResult.paymentIntent.id);
                  console.log(
                    "Payment status:",
                    stripeResult.paymentIntent.status
                  );

                  const result = await confirmPayment(
                    stripeResult.paymentIntent.id,
                    paymentOrderId,
                    false
                  );

                  if (result.success) {
                    navigate("/checkout/confirmation");
                  } else {
                    setPaymentError(
                      result.error || "Payment confirmation failed"
                    );
                  }
                }
              } catch (stripeError) {
                console.error("Stripe API error:", stripeError);
                setPaymentError("Error processing payment with Stripe");
              }
            } else {
              // Test mode or CardElement not available, use simpler flow
              console.log("Using test mode or fallback payment flow");

              const paymentIntentId =
                paymentClientSecret.split("_secret_")[0] ||
                "mock_payment_intent_id";

              console.log("Using payment ID:", paymentIntentId);
              console.log("Test mode enabled:", testMode);

              // Pass testMode parameter
              const result = await confirmPayment(
                paymentIntentId,
                paymentOrderId,
                testMode
              );

              if (result.success) {
                navigate("/checkout/confirmation");
              } else {
                setPaymentError(result.error || "Payment processing failed");
              }
            }
          } else {
            // If Stripe isn't available at all
            console.log("Stripe not available. Using direct API payment...");

            const paymentIntentId =
              paymentClientSecret.split("_secret_")[0] ||
              "mock_payment_intent_id";

            console.log("Using direct payment ID:", paymentIntentId);

            // Pass testMode parameter
            const result = await confirmPayment(
              paymentIntentId,
              paymentOrderId,
              testMode
            );

            if (result.success) {
              navigate("/checkout/confirmation");
            } else {
              setPaymentError(result.error || "Payment processing failed");
            }
          }
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentError(
        "There was an error processing your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return <SiVisa className="h-6 w-8 text-blue-800" />;
      case "mastercard":
        return <SiMastercard className="h-6 w-8 text-orange-500" />;
      case "amex":
        return <SiAmericanexpress className="h-6 w-8 text-blue-500" />;
      case "discover":
        return <SiDiscover className="h-6 w-8 text-orange-600" />;
      default:
        return <FaCreditCard className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
        <p className="text-sm text-gray-600">
          All transactions are secure and encrypted
        </p>
        <div className="flex items-center mt-2 text-green-600">
          <FaLock className="mr-1" />
          <span className="text-xs">SSL SECURED PAYMENT</span>
        </div>
      </div>

      {(error || paymentError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error || paymentError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Payment Method
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`
              relative border rounded-lg p-4 cursor-pointer
              ${
                selectedPaymentMethod === "credit-card"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }
            `}
            >
              <input
                type="radio"
                value="credit-card"
                className="sr-only"
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
              />
              <div className="flex items-center">
                <FaCreditCard className="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <span className="block font-medium">Credit/Debit Card</span>
                  <div className="flex space-x-1 mt-1">
                    <SiVisa className="h-6 w-8 text-blue-800" />
                    <SiMastercard className="h-6 w-8 text-orange-500" />
                    <SiAmericanexpress className="h-6 w-8 text-blue-500" />
                    <SiDiscover className="h-6 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
              <div
                className={`absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center ${
                  selectedPaymentMethod === "credit-card" ? "block" : "hidden"
                }`}
              >
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 6L5 7.5L8.5 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>

            <label
              className={`
              relative border rounded-lg p-4 cursor-pointer
              ${
                selectedPaymentMethod === "paypal"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }
            `}
            >
              <input
                type="radio"
                value="paypal"
                className="sr-only"
                {...register("paymentMethod", {
                  required: "Please select a payment method",
                })}
              />
              <div className="flex items-center">
                <FaPaypal className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <span className="block font-medium">PayPal</span>
                  <span className="text-xs text-gray-500">
                    Fast and secure payment
                  </span>
                </div>
              </div>
              <div
                className={`absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center ${
                  selectedPaymentMethod === "paypal" ? "block" : "hidden"
                }`}
              >
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 6L5 7.5L8.5 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
          </div>

          {errors.paymentMethod && (
            <span className="text-red-500 text-sm">
              {errors.paymentMethod.message}
            </span>
          )}
        </div>
        {/* Credit Card Fields */}
        {selectedPaymentMethod === "credit-card" && (
          <div className="space-y-4 border-t pt-4">
            {/* Saved Cards Section */}
            {!isLoadingSavedCards && savedCards.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">
                    Saved Payment Methods
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddNewCard}
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <FaPlus className="h-3 w-3 mr-1" />
                    Add New Card
                  </button>
                </div>

                <div className="space-y-2">
                  {savedCards.map((card) => (
                    <label
                      key={card.id}
                      className={`
                        relative border rounded-lg p-3 flex justify-between items-center cursor-pointer
                        ${
                          selectedSavedCard === card.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={card.id}
                        className="sr-only"
                        {...register("selectedSavedCard")}
                        onChange={() => {
                          setValue("selectedSavedCard", card.id);
                          setShowNewCardForm(false);
                        }}
                      />
                      <div className="flex items-center">
                        <div className="mr-3">{getCardIcon(card.cardType)}</div>
                        <div>
                          <span className="block font-medium text-gray-700">
                            •••• •••• •••• {card.lastFour}
                          </span>
                          <span className="text-xs text-gray-500">
                            Expires {card.expiryDate}
                          </span>
                          {card.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!card.isDefault && selectedSavedCard === card.id && (
                          <button
                            type="button"
                            onClick={() => handleSetAsDefault(card.id)}
                            className="text-xs text-indigo-600 hover:text-indigo-800"
                          >
                            Set as default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleRemoveSavedCard(card.id, e)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove card"
                        >
                          <FaTrashAlt className="h-3 w-3" />
                        </button>
                      </div>
                      <div
                        className={`absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center ${
                          selectedSavedCard === card.id ? "block" : "hidden"
                        }`}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 6L5 7.5L8.5 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </label>
                  ))}

                  {/* Add New Card Option */}
                  <label
                    className={`
                      relative border border-dashed rounded-lg p-3 flex justify-center items-center cursor-pointer hover:bg-gray-50
                      ${
                        showNewCardForm
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      value="new_card"
                      className="sr-only"
                      onChange={() => {
                        setValue("selectedSavedCard", "new_card");
                        setShowNewCardForm(true);
                      }}
                      checked={showNewCardForm}
                    />
                    <div className="flex items-center text-indigo-600">
                      <FaPlus className="h-4 w-4 mr-2" />
                      <span className="font-medium">
                        Add New Payment Method
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* New Card Form */}
            {(showNewCardForm || savedCards.length === 0) && (
              <div className="space-y-4 pt-2">
                {savedCards.length > 0 && (
                  <h3 className="text-sm font-medium text-gray-700 border-t pt-3">
                    New Card Details
                  </h3>
                )}

                {/* Stripe Card Element */}
                <div>
                  <label
                    htmlFor="cardElement"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Details
                  </label>
                  <div className="p-3 border border-gray-300 rounded-lg focus-within:ring-indigo-500 focus-within:border-indigo-500">
                    {stripe && elements ? (
                      <CardElement
                        id="cardElement"
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    ) : (
                      // Fallback to traditional card inputs if Stripe isn't available
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between">
                            <label
                              htmlFor="cardNumber"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Card Number
                            </label>
                            <div className="flex items-center">
                              {cardType === "visa" && (
                                <SiVisa className="h-5 w-5 text-blue-800" />
                              )}
                              {cardType === "mastercard" && (
                                <SiMastercard className="h-5 w-5 text-orange-500" />
                              )}
                              {cardType === "amex" && (
                                <SiAmericanexpress className="h-5 w-5 text-blue-500" />
                              )}
                              {cardType === "discover" && (
                                <SiDiscover className="h-5 w-5 text-orange-600" />
                              )}
                            </div>
                          </div>

                          <Controller
                            name="cardNumber"
                            control={control}
                            rules={{
                              required: "Card number is required",
                              validate: (value) => {
                                const digits = value.replace(/\s/g, "");
                                if (digits.length < 13 || digits.length > 19)
                                  return "Invalid card number length";

                                // Luhn algorithm (checksum)
                                let sum = 0;
                                let shouldDouble = false;
                                for (let i = digits.length - 1; i >= 0; i--) {
                                  let digit = parseInt(digits.charAt(i), 10);
                                  if (shouldDouble) {
                                    digit *= 2;
                                    if (digit > 9) digit -= 9;
                                  }
                                  sum += digit;
                                  shouldDouble = !shouldDouble;
                                }

                                return sum % 10 === 0 || "Invalid card number";
                              },
                            }}
                            render={({ field }) => (
                              <div className="relative">
                                <input
                                  id="cardNumber"
                                  type="text"
                                  className={`w-full p-3 border ${
                                    errors.cardNumber
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                                  placeholder="1234 5678 9012 3456"
                                  value={formatCreditCardNumber(field.value)}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  maxLength={19}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <FaCreditCard className="text-gray-400" />
                                </div>
                              </div>
                            )}
                          />

                          {errors.cardNumber && (
                            <span className="text-red-500 text-sm">
                              {errors.cardNumber.message}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expiryDate"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Expiry Date
                            </label>
                            <Controller
                              name="expiryDate"
                              control={control}
                              rules={{ validate: validateExpiryDate }}
                              render={({ field }) => (
                                <input
                                  id="expiryDate"
                                  type="text"
                                  placeholder="MM/YY"
                                  className={`w-full p-3 border ${
                                    errors.expiryDate
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                                  value={formatExpiryDate(field.value)}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  maxLength={5}
                                />
                              )}
                            />
                            {errors.expiryDate && (
                              <span className="text-red-500 text-sm">
                                {errors.expiryDate.message}
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center mb-1">
                              <label
                                htmlFor="cvv"
                                className="block text-sm font-medium text-gray-700"
                              >
                                CVV
                              </label>
                              <div className="ml-1 group relative">
                                <FaRegQuestionCircle className="text-gray-400 h-4 w-4 cursor-help" />
                                <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 pointer-events-none">
                                  The 3-4 digit security code on the back of
                                  your card (or front for American Express)
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800"></div>
                                </div>
                              </div>
                            </div>
                            <input
                              type="password"
                              id="cvv"
                              {...register("cvv", {
                                required: "CVV is required",
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message: "CVV must be 3-4 digits",
                                },
                              })}
                              className={`w-full p-3 border ${
                                errors.cvv
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                              placeholder="123"
                              maxLength={4}
                            />
                            {errors.cvv && (
                              <span className="text-red-500 text-sm">
                                {errors.cvv.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="nameOnCard"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    {...register("nameOnCard", {
                      required: "Name on card is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name should only contain letters",
                      },
                    })}
                    className={`w-full p-3 border ${
                      errors.nameOnCard ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="John Doe"
                  />
                  {errors.nameOnCard && (
                    <span className="text-red-500 text-sm">
                      {errors.nameOnCard.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="savePaymentInfo"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      {...register("savePaymentInfo")}
                    />
                    <label
                      htmlFor="savePaymentInfo"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Save this card for future payments
                    </label>
                  </div>

                  {watch("savePaymentInfo") && (
                    <div className="flex items-center ml-6">
                      <input
                        id="setAsDefault"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        {...register("setAsDefault")}
                      />
                      <label
                        htmlFor="setAsDefault"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Set as default payment method
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* PayPal Fields */}
        {selectedPaymentMethod === "paypal" && (
          <div className="space-y-4 border-t pt-4">
            <p className="text-sm text-gray-600">
              With PayPal, you can pay securely using your PayPal account or
              credit/debit card without sharing your financial information.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <FaPaypal className="text-blue-600 h-8 w-8 mr-2" />
                <div>
                  <h3 className="font-medium">PayPal Checkout</h3>
                  <p className="text-xs text-gray-600">
                    You'll be redirected to PayPal to complete your payment
                    securely.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional: Email field for PayPal */}
            <div>
              <label
                htmlFor="paypalEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PayPal Email (optional)
              </label>
              <input
                type="email"
                id="paypalEmail"
                {...register("paypalEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full p-3 border ${
                  errors.paypalEmail ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="your-email@example.com"
              />
              {errors.paypalEmail && (
                <span className="text-red-500 text-sm">
                  {errors.paypalEmail.message}
                </span>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter your PayPal email address if you'd like to pre-fill it on
                the PayPal site.
              </p>
            </div>
          </div>
        )}

        {/* Add this PayPal information section when PayPal is being created */}
        {isCreatingPaypalSession && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center text-blue-700 mb-2">
              <svg
                className="animate-spin h-5 w-5 mr-2"
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
              Creating PayPal checkout session...
            </div>
            <p className="text-sm text-blue-600">
              Please wait while we set up your PayPal checkout.
            </p>
          </div>
        )}

        {/* Add this PayPal information section when PayPal session is ready */}
        {paymentState === "paypal-ready" && paypalData && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center text-blue-700 mb-2">
              <FaPaypal className="h-5 w-5 mr-2" />
              <span className="font-medium">PayPal Checkout Information</span>
            </div>
            <p className="text-sm text-blue-600 mb-2">
              Your PayPal checkout session is ready. Click "Pay with PayPal" to
              complete your payment.
            </p>
            <div className="bg-white p-3 rounded-md text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono">
                  {paypalData.orderId.substring(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">PayPal Order ID:</span>
                <span className="font-mono">
                  {paypalData.paypalOrderId.substring(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${paypalData.amount}</span>
              </div>
            </div>
          </div>
        )}
        {/* ID Verification for high-value purchases */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              ID Verification (optional)
            </span>
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={() => setShowIdVerification(!showIdVerification)}
            >
              {showIdVerification ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            For purchases over $1000, ID verification may be required for
            security
          </p>

          {showIdVerification && (
            <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label
                  htmlFor="idType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ID Type
                </label>
                <select
                  id="idType"
                  {...register("idType")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select ID Type</option>
                  <option value="passport">Passport</option>
                  <option value="driving_license">Driving License</option>
                  <option value="national_id">National ID Card</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="idNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ID Number
                </label>
                <input
                  type="text"
                  id="idNumber"
                  {...register("idNumber")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your ID number"
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons  */}

        {/* Replace your form's button section with this */}
        <div className="border-t pt-6">
          {/* Success message that disappears after 3 seconds */}
          {showSuccessMessage && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMessage}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Address
            </button>

            {/* Pay Now Button - Only shown in initial state */}
            {paymentState === "initial" && (
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing || isLoading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isProcessing || isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Processing...
                  </>
                ) : (
                  <>Pay Now</>
                )}
              </button>
            )}

            {/* Processing indicator - Shown during payment processing */}
            {paymentState === "processing" && (
              <div className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing Payment...
              </div>
            )}

            {/* PayPal Ready State - Shows the button to redirect to PayPal */}
            {paymentState === "paypal-ready" && (
              <button
                type="button"
                onClick={handlePayWithPaypal}
                disabled={isProcessing}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isProcessing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Processing...
                  </>
                ) : (
                  <>
                    <FaPaypal className="mr-2 h-5 w-5" />
                    Pay with PayPal
                  </>
                )}
              </button>
            )}

            {/* Place Order Button - Only shown after payment is confirmed */}
            {paymentState === "confirmed" && (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isProcessing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Processing...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </button>
            )}

            {/* Try Again Button - Shown on payment failure */}
            {paymentState === "failed" && (
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isProcessing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                Try Again
              </button>
            )}
          </div>

          {/* Payment status indicators */}
          {paymentState === "confirmed" && !showSuccessMessage && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Payment successful! Please click "Place Order" to complete your
              purchase.
            </div>
          )}

          {paymentState === "failed" && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Payment failed.
              </div>
              {paymentError && <p className="mt-2 text-sm">{paymentError}</p>}
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            By placing your order, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Privacy Policy
            </a>
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <SiVisa className="h-8 w-10 text-blue-800" />
            <SiMastercard className="h-8 w-10 text-orange-500" />
            <SiAmericanexpress className="h-8 w-10 text-blue-500" />
            <SiDiscover className="h-8 w-10 text-orange-600" />
            <FaPaypal className="h-8 w-10 text-blue-600" />
          </div>
          <div className="flex justify-center items-center mt-4 text-green-600">
            <FaLock className="h-4 w-4 mr-1" />
            <span className="text-xs">
              Your payment information is secure and encrypted
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

// Wrapper component with Stripe Elements
const PaymentFormWithStripe: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentFormWithStripe as typeof PaymentForm;
