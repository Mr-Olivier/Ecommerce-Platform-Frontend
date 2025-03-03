import React from "react";
import DashboardLayout from "../../components/customer-dashboard/DashboardLayout";
import ReviewsHistory from "../../components/customer-dashboard/ReviewsHistory";

const ReviewsPage: React.FC = () => {
  return (
    <DashboardLayout title="My Reviews">
      <ReviewsHistory />
    </DashboardLayout>
  );
};

export default ReviewsPage;
