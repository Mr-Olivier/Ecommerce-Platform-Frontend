// components/checkout/CheckoutSteps.tsx

import React from "react";

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = ["Address", "Payment", "Review"];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index + 1 <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          <span className="mt-2 text-sm">{step}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
