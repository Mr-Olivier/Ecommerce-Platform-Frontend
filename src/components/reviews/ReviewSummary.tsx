import React from "react";

interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  rating,
  reviewCount,
}) => {
  return (
    <div>
      <span>{rating.toFixed(1)} stars</span>
      <span>({reviewCount} reviews)</span>
    </div>
  );
};

export default ReviewSummary;
