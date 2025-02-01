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

import React, { useState } from "react";
import CheckoutSteps from "../../components/checkout/CheckoutSteps";
import AddressForm from "../../components/checkout/AddressForm";
import PaymentForm from "../../components/checkout/PaymentForm";
import OrderSummary from "../../components/checkout/OrderSummary";

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={step} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {step === 1 && <AddressForm nextStep={nextStep} />}
          {step === 2 && <PaymentForm prevStep={prevStep} />}
        </div>
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
