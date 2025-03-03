import React from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import AccountSettings from "../../components/customer-dashboard/AccountSettings";

const AccountPage: React.FC = () => {
  return (
    <DashboardLayout title="My Account">
      <AccountSettings />
    </DashboardLayout>
  );
};

export default AccountPage;
