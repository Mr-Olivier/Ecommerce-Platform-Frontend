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
    console.log("📝 PaymentForm: Using order ID:", paymentOrderId || "MISSING");
    console.log(
      "🧾 PaymentForm: Address data:",
      addressData ? "exists" : "missing"
    );

    // Check if context functions exist
    console.log(
      "🔍 PaymentForm: createCheckoutSession function:",
      typeof createCheckoutSession === "function" ? "exists" : "MISSING"
    );
    console.log(
      "🔍 PaymentForm: confirmPayment function:",
      typeof confirmPayment === "function" ? "exists" : "MISSING"
    );

    if (!paymentClientSecret) {
      console.error("❌ PaymentForm: Missing client secret");

      // Try to recreate checkout session if address data is available
      if (addressData && typeof createCheckoutSession === "function") {
        console.log("🔄 PaymentForm: Attempting to recreate checkout session");
        try {
          // Log address data content
          console.log(
            "📋 Address data being used:",
            JSON.stringify(addressData).substring(0, 100) + "..."
          );

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
              // Continue with payment using the new client secret and test mode enabled
              await processPaymentWithSecret(
                data,
                newClientSecret,
                result.orderId,
                true // Enable test mode
              );
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
        await processPaymentWithSecret(
          data,
          urlClientSecret,
          paymentOrderId,
          true
        );
      }

      return;
    }

    // If we have a valid client secret, proceed with payment with test mode enabled
    await processPaymentWithSecret(
      data,
      paymentClientSecret,
      paymentOrderId,
      true
    );
  };

  // Helper function to process payment with a valid client secret
  const processPaymentWithSecret = async (
    data,
    paymentClientSecret,
    paymentOrderId,
    testMode = true // Enable test mode by default
  ) => {
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

  // Add this function to your component
  const debugPayment = async () => {
    try {
      console.log("=== DEBUG PAYMENT START ===");

      // Check context values
      console.log(
        "Client Secret from context:",
        clientSecret ? `${clientSecret.substring(0, 10)}...` : "null"
      );
      console.log("Order ID from context:", orderId);

      // Check localStorage values
      const storedSecret = localStorage.getItem("checkoutClientSecret");
      const storedOrderId = localStorage.getItem("checkoutOrderId");

      console.log(
        "Client Secret from localStorage:",
        storedSecret ? `${storedSecret.substring(0, 10)}...` : "null"
      );
      console.log("Order ID from localStorage:", storedOrderId);

      // Check for address data
      const storedAddress = localStorage.getItem("checkoutAddressData");
      const hasAddressData = !!(addressData || storedAddress);

      console.log("Has address data:", hasAddressData);

      // Check if Stripe is initialized
      console.log("Stripe available:", !!stripe);
      console.log("Elements available:", !!elements);

      if (!clientSecret && !storedSecret) {
        console.log("No client secret available. Cannot make payment request.");

        if (hasAddressData) {
          if (
            confirm(
              "No client secret found. Would you like to create a new checkout session?"
            )
          ) {
            const addressToUse =
              addressData || JSON.parse(storedAddress || "{}");
            console.log(
              "Creating new session with address data:",
              addressToUse
            );

            try {
              const result = await createCheckoutSession(addressToUse);
              console.log("Session creation result:", result);

              if (result.success && result.clientSecret) {
                alert(
                  "Successfully created a new checkout session! Please try the payment again."
                );
                window.location.reload();
              } else {
                alert(
                  "Failed to create checkout session: " +
                    (result.error || "Unknown error")
                );
              }
            } catch (error) {
              console.error("Error creating session:", error);
              alert("Error creating checkout session: " + String(error));
            }
          }
        } else {
          alert(
            "No address data or client secret found. Please go back to add your shipping address."
          );
        }
      } else {
        // We have a client secret, let's verify it
        const effectiveSecret = clientSecret || storedSecret;

        // Extract payment intent ID
        if (effectiveSecret) {
          const paymentIntentId = effectiveSecret.split("_secret_")[0];
          console.log("Payment Intent ID:", paymentIntentId);

          const options = [
            "Check payment status",
            "Reset checkout and create new session",
            "Just clear checkout data",
            "Cancel",
          ];

          const action = prompt(
            "Choose an action:\n1. Check payment status\n2. Reset checkout and create new session\n3. Just clear checkout data\n4. Cancel",
            "1"
          );

          switch (action) {
            case "1":
              // Check payment status
              try {
                const authToken = localStorage.getItem("authToken");
                console.log("Checking payment status for:", paymentIntentId);

                const response = await fetch(
                  `${
                    import.meta.env.VITE_API_URL || "http://localhost:4000/api"
                  }/checkout/payment-status`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      ...(authToken
                        ? { Authorization: `Bearer ${authToken}` }
                        : {}),
                    },
                    body: JSON.stringify({
                      paymentIntentId,
                    }),
                  }
                );

                console.log("Status check response:", response.status);
                const data = await response.json();
                console.log("Payment status data:", data);

                alert(`Payment status: ${JSON.stringify(data, null, 2)}`);
              } catch (error) {
                console.error("Error checking payment status:", error);
                alert("Error checking payment status: " + String(error));
              }
              break;

            case "2":
              // Reset and create new
              if (confirm("This will reset your checkout session. Continue?")) {
                localStorage.removeItem("checkoutClientSecret");
                localStorage.removeItem("checkoutOrderId");

                if (hasAddressData) {
                  const addressToUse =
                    addressData || JSON.parse(storedAddress || "{}");
                  try {
                    const result = await createCheckoutSession(addressToUse);

                    if (result.success) {
                      alert(
                        "Successfully reset and created a new checkout session!"
                      );
                      window.location.reload();
                    } else {
                      alert(
                        "Reset successful but failed to create new session: " +
                          (result.error || "Unknown error")
                      );
                    }
                  } catch (error) {
                    alert(
                      "Reset successful but error creating new session: " +
                        String(error)
                    );
                  }
                } else {
                  alert(
                    "Checkout data has been reset. Please restart from the shipping address step."
                  );
                  // Optionally navigate back to address step
                  // navigate("/checkout/address");
                }
              }
              break;

            case "3":
              // Just clear data
              if (
                confirm("This will clear your checkout session data. Continue?")
              ) {
                localStorage.removeItem("checkoutClientSecret");
                localStorage.removeItem("checkoutOrderId");
                alert(
                  "Checkout data has been cleared. You may need to reload the page."
                );
                window.location.reload();
              }
              break;

            default:
              // Cancel
              console.log("Debug action cancelled");
          }
        }
      }

      console.log("=== DEBUG PAYMENT END ===");
    } catch (error) {
      console.error("Debug error:", error);
      alert("Error during debug: " + String(error));
    }
  };

  // Add this function after your other functions in PaymentForm.tsx
  const setTestAddressData = () => {
    // Create a test address object
    const testAddress = {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      email: "john.doe@example.com",
      phone: "555-123-4567",
    };

    // Log what we're doing
    console.log("Setting test address data:", testAddress);

    // Store directly in localStorage for backup
    localStorage.setItem("checkoutAddressData", JSON.stringify(testAddress));

    // If there's a saveAddressData function in context, use it
    if (typeof saveAddressData === "function") {
      saveAddressData(testAddress);
      console.log("Set test address data using saveAddressData function");
    } else {
      console.warn("saveAddressData function not available in context");
    }

    // Attempt to create a checkout session with this address
    if (typeof createCheckoutSession === "function") {
      console.log("Creating checkout session with test address data...");
      createCheckoutSession(testAddress)
        .then((result) => {
          console.log("Checkout session creation result:", result);
          if (result.success) {
            alert(
              "Successfully created checkout session with test address data!\nTry placing your order now."
            );
            // Optional: refresh the page to make sure all state is updated
            // window.location.reload();
          } else {
            alert(
              "Error creating checkout session: " +
                (result.error || "Unknown error")
            );
          }
        })
        .catch((error) => {
          console.error("Error creating checkout session:", error);
          alert("Error creating checkout session: " + String(error));
        });
    } else {
      console.warn("createCheckoutSession function not available in context");
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
              After clicking "Place Order", you will be redirected to PayPal to
              complete your purchase securely.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <FaPaypal className="text-blue-600 h-8 w-8 mr-2" />
                <div>
                  <h3 className="font-medium">PayPal</h3>
                  <p className="text-xs text-gray-600">
                    The safer, easier way to pay
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
                If you provide your PayPal email, we'll pre-fill it during the
                PayPal checkout process.
              </p>
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

        <div className="border-t pt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Address
          </button>
          <button
            type="submit"
            disabled={isProcessing || isLoading}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isProcessing || isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing || isLoading ? (
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
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={debugPayment}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
          >
            <span role="img" aria-label="Debug" className="mr-2">
              🛠️
            </span>
            Debug Payment
          </button>
          <button
            type="button"
            onClick={setTestAddressData}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <span role="img" aria-label="Address" className="mr-2">
              📋
            </span>
            Set Test Address Data
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Use this if you're experiencing payment issues
          </p>
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
