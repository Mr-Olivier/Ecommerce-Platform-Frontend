import React from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import AddressBook from "../../components/customer-dashboard/AddressBook";

const AddressesPage: React.FC = () => {
  return (
    <DashboardLayout title="My Addresses">
      <AddressBook />
    </DashboardLayout>
  );
};

export default AddressesPage;
