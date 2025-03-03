import React, { useState } from "react";

// Types
export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank";
  name: string;
  details: {
    cardType?: string;
    last4?: string;
    expiryMonth?: string;
    expiryYear?: string;
    bankName?: string;
    accountLast4?: string;
    email?: string;
  };
  isDefault: boolean;
}

interface PaymentMethodsProps {
  initialMethods?: PaymentMethod[];
  onPaymentMethodsChange?: (methods: PaymentMethod[]) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  initialMethods = [],
  onPaymentMethodsChange,
}) => {
  // Mock data for demo purposes - replace with real data from your API
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    initialMethods.length > 0
      ? initialMethods
      : [
          {
            id: "1",
            type: "card",
            name: "Personal Card",
            details: {
              cardType: "Visa",
              last4: "4242",
              expiryMonth: "12",
              expiryYear: "2024",
            },
            isDefault: true,
          },
          {
            id: "2",
            type: "paypal",
            name: "PayPal Account",
            details: {
              email: "user@example.com",
            },
            isDefault: false,
          },
        ]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"card" | "paypal" | "bank">(
    "card"
  );
  const [formError, setFormError] = useState("");

  // New payment method form states
  const [cardForm, setCardForm] = useState({
    name: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isDefault: false,
  });

  const [paypalForm, setPaypalForm] = useState({
    email: "",
    isDefault: false,
  });

  const [bankForm, setBankForm] = useState({
    name: "",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    isDefault: false,
  });

  const handleAddNewMethod = () => {
    // Reset form states
    setCardForm({
      name: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    });
    setPaypalForm({
      email: "",
      isDefault: false,
    });
    setBankForm({
      name: "",
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      isDefault: false,
    });
    setActiveTab("card");
    setFormError("");
    setIsModalOpen(true);
  };

  const handleDeleteMethod = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this payment method?")
    ) {
      const updatedMethods = paymentMethods.filter(
        (method) => method.id !== id
      );

      // If we're deleting the default method, set a new default
      if (
        paymentMethods.find((method) => method.id === id)?.isDefault &&
        updatedMethods.length > 0
      ) {
        updatedMethods[0].isDefault = true;
      }

      setPaymentMethods(updatedMethods);
      if (onPaymentMethodsChange) {
        onPaymentMethodsChange(updatedMethods);
      }
    }
  };

  const handleSetDefaultMethod = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }));

    setPaymentMethods(updatedMethods);
    if (onPaymentMethodsChange) {
      onPaymentMethodsChange(updatedMethods);
    }
  };

  const handleSaveCardMethod = () => {
    // Validate form
    if (
      !cardForm.name ||
      !cardForm.cardNumber ||
      !cardForm.expiryMonth ||
      !cardForm.expiryYear ||
      !cardForm.cvv
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // Basic card number validation (should be more robust in production)
    if (cardForm.cardNumber.replace(/\s/g, "").length !== 16) {
      setFormError("Please enter a valid 16-digit card number.");
      return;
    }

    // Create new payment method
    const newMethod: PaymentMethod = {
      id: `card-${Date.now()}`,
      type: "card",
      name: cardForm.name,
      details: {
        cardType: getCardType(cardForm.cardNumber),
        last4: cardForm.cardNumber.slice(-4),
        expiryMonth: cardForm.expiryMonth,
        expiryYear: cardForm.expiryYear,
      },
      isDefault: cardForm.isDefault,
    };

    saveNewMethod(newMethod);
  };

  const handleSavePaypalMethod = () => {
    // Validate form
    if (!paypalForm.email) {
      setFormError("Please enter your PayPal email.");
      return;
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(paypalForm.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Create new payment method
    const newMethod: PaymentMethod = {
      id: `paypal-${Date.now()}`,
      type: "paypal",
      name: "PayPal Account",
      details: {
        email: paypalForm.email,
      },
      isDefault: paypalForm.isDefault,
    };

    saveNewMethod(newMethod);
  };

  const handleSaveBankMethod = () => {
    // Validate form
    if (
      !bankForm.name ||
      !bankForm.bankName ||
      !bankForm.routingNumber ||
      !bankForm.accountNumber
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // Basic routing and account number validation
    if (bankForm.routingNumber.length !== 9) {
      setFormError("Please enter a valid 9-digit routing number.");
      return;
    }

    if (bankForm.accountNumber.length < 4) {
      setFormError("Please enter a valid account number.");
      return;
    }

    // Create new payment method
    const newMethod: PaymentMethod = {
      id: `bank-${Date.now()}`,
      type: "bank",
      name: bankForm.name,
      details: {
        bankName: bankForm.bankName,
        accountLast4: bankForm.accountNumber.slice(-4),
      },
      isDefault: bankForm.isDefault,
    };

    saveNewMethod(newMethod);
  };

  const saveNewMethod = (newMethod: PaymentMethod) => {
    // If this is the first payment method or set as default
    let updatedMethods: PaymentMethod[];

    if (newMethod.isDefault) {
      // Update all other methods to not be default
      updatedMethods = paymentMethods.map((method) => ({
        ...method,
        isDefault: false,
      }));
      updatedMethods.push(newMethod);
    } else {
      // If no default is set and this is the first method, make it default
      if (paymentMethods.length === 0) {
        newMethod.isDefault = true;
      }
      updatedMethods = [...paymentMethods, newMethod];
    }

    setPaymentMethods(updatedMethods);
    if (onPaymentMethodsChange) {
      onPaymentMethodsChange(updatedMethods);
    }
    setIsModalOpen(false);
  };

  // Helper to determine card type based on first digits
  const getCardType = (cardNumber: string): string => {
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = parseInt(cardNumber.substring(0, 2), 10);

    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (
      firstDigit === "3" &&
      (cardNumber.charAt(1) === "4" || cardNumber.charAt(1) === "7")
    )
      return "American Express";
    if (firstTwoDigits >= 51 && firstTwoDigits <= 55) return "Mastercard";

    return "Card";
  };

  // Get appropriate icon based on payment method type
  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case "card":
        if (method.details.cardType === "Visa") {
          return (
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
          );
        } else if (method.details.cardType === "Mastercard") {
          return (
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
              MC
            </div>
          );
        } else {
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          );
        }
      case "paypal":
        return (
          <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
            PP
          </div>
        );
      case "bank":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Payment Methods List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Payment Methods
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your payment information
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddNewMethod}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Payment Method
          </button>
        </div>

        <div className="px-6 py-5">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                No payment methods saved
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first payment method
              </p>
              <button
                type="button"
                onClick={handleAddNewMethod}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Payment Method
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border ${
                    method.isDefault
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300"
                  } rounded-lg p-4 relative`}
                >
                  {method.isDefault && (
                    <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Default
                    </span>
                  )}

                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getPaymentIcon(method)}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-lg font-medium text-gray-900">
                        {method.name}
                      </h4>

                      {method.type === "card" && (
                        <p className="text-sm text-gray-500">
                          {method.details.cardType} •••• {method.details.last4}{" "}
                          | Expires {method.details.expiryMonth}/
                          {method.details.expiryYear}
                        </p>
                      )}

                      {method.type === "paypal" && (
                        <p className="text-sm text-gray-500">
                          {method.details.email}
                        </p>
                      )}

                      {method.type === "bank" && (
                        <p className="text-sm text-gray-500">
                          {method.details.bankName} ••••{" "}
                          {method.details.accountLast4}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    {!method.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultMethod(method.id)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Set as Default
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteMethod(method.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add Payment Method
                    </h3>

                    {/* Tab navigation */}
                    <div className="mt-4 border-b border-gray-200">
                      <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                          onClick={() => {
                            setActiveTab("card");
                            setFormError("");
                          }}
                          className={`${
                            activeTab === "card"
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                          Credit Card
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("paypal");
                            setFormError("");
                          }}
                          className={`${
                            activeTab === "paypal"
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                          PayPal
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab("bank");
                            setFormError("");
                          }}
                          className={`${
                            activeTab === "bank"
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                          Bank Account
                        </button>
                      </nav>
                    </div>

                    {formError && (
                      <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
                        {formError}
                      </div>
                    )}

                    {/* Credit Card Form */}
                    {activeTab === "card" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="cardName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            value={cardForm.name}
                            onChange={(e) =>
                              setCardForm({ ...cardForm, name: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            value={cardForm.cardNumber}
                            onChange={(e) => {
                              // Format card number with spaces for readability
                              const value = e.target.value
                                .replace(/\s/g, "")
                                .substring(0, 16);
                              const formatted = value
                                .replace(/(\d{4})/g, "$1 ")
                                .trim();
                              setCardForm({
                                ...cardForm,
                                cardNumber: formatted,
                              });
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="XXXX XXXX XXXX XXXX"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label
                              htmlFor="expiryMonth"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Month
                            </label>
                            <select
                              id="expiryMonth"
                              value={cardForm.expiryMonth}
                              onChange={(e) =>
                                setCardForm({
                                  ...cardForm,
                                  expiryMonth: e.target.value,
                                })
                              }
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            >
                              <option value="">MM</option>
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = String(i + 1).padStart(2, "0");
                                return (
                                  <option key={month} value={month}>
                                    {month}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="expiryYear"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Year
                            </label>
                            <select
                              id="expiryYear"
                              value={cardForm.expiryYear}
                              onChange={(e) =>
                                setCardForm({
                                  ...cardForm,
                                  expiryYear: e.target.value,
                                })
                              }
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            >
                              <option value="">YYYY</option>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = String(
                                  new Date().getFullYear() + i
                                );
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-sm font-medium text-gray-700"
                            >
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              value={cardForm.cvv}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\D/g, "")
                                  .substring(0, 4);
                                setCardForm({ ...cardForm, cvv: value });
                              }}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="XXX"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="cardDefault"
                            type="checkbox"
                            checked={cardForm.isDefault}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                isDefault: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="cardDefault"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Set as default payment method
                          </label>
                        </div>
                      </div>
                    )}

                    {/* PayPal Form */}
                    {activeTab === "paypal" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="paypalEmail"
                            className="block text-sm font-medium text-gray-700"
                          >
                            PayPal Email
                          </label>
                          <input
                            type="email"
                            id="paypalEmail"
                            value={paypalForm.email}
                            onChange={(e) =>
                              setPaypalForm({
                                ...paypalForm,
                                email: e.target.value,
                              })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="email@example.com"
                            required
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            id="paypalDefault"
                            type="checkbox"
                            checked={paypalForm.isDefault}
                            onChange={(e) =>
                              setPaypalForm({
                                ...paypalForm,
                                isDefault: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="paypalDefault"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Set as default payment method
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Bank Account Form */}
                    {activeTab === "bank" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="bankName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Account Name
                          </label>
                          <input
                            type="text"
                            id="bankName"
                            value={bankForm.name}
                            onChange={(e) =>
                              setBankForm({ ...bankForm, name: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Primary Checking"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="bankInstitution"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Bank Name
                          </label>
                          <input
                            type="text"
                            id="bankInstitution"
                            value={bankForm.bankName}
                            onChange={(e) =>
                              setBankForm({
                                ...bankForm,
                                bankName: e.target.value,
                              })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Bank of America"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="routingNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Routing Number
                          </label>
                          <input
                            type="text"
                            id="routingNumber"
                            value={bankForm.routingNumber}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .substring(0, 9);
                              setBankForm({
                                ...bankForm,
                                routingNumber: value,
                              });
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="XXXXXXXXX"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="accountNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Account Number
                          </label>
                          <input
                            type="text"
                            id="accountNumber"
                            value={bankForm.accountNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              setBankForm({
                                ...bankForm,
                                accountNumber: value,
                              });
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="XXXXXXXX"
                            required
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            id="bankDefault"
                            type="checkbox"
                            checked={bankForm.isDefault}
                            onChange={(e) =>
                              setBankForm({
                                ...bankForm,
                                isDefault: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="bankDefault"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Set as default payment method
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "card") {
                      handleSaveCardMethod();
                    } else if (activeTab === "paypal") {
                      handleSavePaypalMethod();
                    } else if (activeTab === "bank") {
                      handleSaveBankMethod();
                    }
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
