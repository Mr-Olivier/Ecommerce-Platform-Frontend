import React from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import PaymentMethods from "../../components/customer-dashboard/PaymentMethods";

const PaymentMethodsPage: React.FC = () => {
  return (
    <DashboardLayout title="Payment Methods">
      <PaymentMethods />
    </DashboardLayout>
  );
};

export default PaymentMethodsPage;
