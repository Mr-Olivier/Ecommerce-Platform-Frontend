// // pages/checkout/index.tsx

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CheckoutSteps from "../../components/checkout/CheckoutSteps";
// import AddressForm from "../../components/checkout/AddressForm";
// import PaymentForm from "../../components/checkout/PaymentForm";
// import OrderSummary from "../../components/checkout/OrderSummary";
// import { useCart } from "../../hooks/useCart";
// import { useAuth } from "../../hooks/useAuth";

// const CheckoutPage: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const { cart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   React.useEffect(() => {
//     if (!user) {
//       navigate("/login?redirect=/checkout");
//     }
//     if (cart.items.length === 0) {
//       navigate("/cart");
//     }
//   }, [user, cart, navigate]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <CheckoutSteps currentStep={step} />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-2">
//           {step === 1 && <AddressForm nextStep={nextStep} />}

//           {step === 2 && <PaymentForm prevStep={prevStep} />}
//         </div>
//         <div className="md:col-span-1">
//           <OrderSummary />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// pages/checkout/index.tsx

// src/pages/checkout/index.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import AddressForm from "../../components/checkout/AddressForm";
import PaymentForm from "../../components/checkout/PaymentForm";
import OrderConfirmation from "../../components/checkout/OrderConfirmation";
import OrderSummary from "../../components/checkout/OrderSummary";
import LoginModal from "../../components/Auth/LoginModal"; // Import LoginModal
import { useCart } from "../../hooks/useCart";
import { CheckoutProvider } from "../../context/CheckoutContext";
import { useCheckout } from "../../hooks/useCheckout"; // Import useCheckout

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useCheckout(); // Use the isAuthenticated function

  // Check authentication on load
  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        setShowLoginModal(true);
      }
    };

    checkAuth();
  }, []);

  // Parse step from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const stepParam = queryParams.get("step");
    if (stepParam) {
      const requestedStep = parseInt(stepParam, 10);
      if (!isNaN(requestedStep) && requestedStep >= 1 && requestedStep <= 3) {
        setStep(requestedStep);
      }
    }
  }, [location]);

  // Check if cart is empty
  useEffect(() => {
    if (cart && cart.items && cart.items.length === 0) {
      navigate("/cart");
    } else {
      setIsLoading(false);
    }
  }, [cart, navigate]);

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);

    // Update URL query parameter
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", newStep.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);

    // Update URL query parameter
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", newStep.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const resetCheckout = () => {
    setStep(1);

    // Update URL query parameter
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "1");
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  // Handle login success
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Force a re-render of the component to pick up the new authentication state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <CheckoutProvider>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

          <CheckoutSteps currentStep={step} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2">
              {!isAuthenticated() ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-center my-6">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <h2 className="mt-2 text-lg font-medium text-gray-900">
                      Authentication Required
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      You need to be logged in to proceed with checkout
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setShowLoginModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign In to Continue
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {step === 1 && <AddressForm nextStep={nextStep} />}
                  {step === 2 && <PaymentForm prevStep={prevStep} />}
                  {step === 3 && (
                    <OrderConfirmation resetCheckout={resetCheckout} />
                  )}
                </>
              )}
            </div>

            <div className="md:col-span-1">
              <OrderSummary />

              {/* Order security badge */}
              {step !== 3 && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-center border-b pb-3 mb-3">
                    <svg
                      className="h-6 w-6 text-green-600 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04L12 20.584l9.618-12.6A11.955 11.955 0 0112 2.944z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="h-4 w-4 text-green-500 mr-1 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>SSL secured payment</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-4 w-4 text-green-500 mr-1 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Fast shipping options available</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-4 w-4 text-green-500 mr-1 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>30-day money-back guarantee</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      </CheckoutProvider>
    </>
  );
};

export default CheckoutPage;
