// pages/checkout/confirmation.tsx

import React from "react";
import { Link } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
      <p className="mb-4">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ConfirmationPage;
