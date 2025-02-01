// components/shared/LoadingSpinner.tsx
import React from "react";
import "./LoadingSpinner.css"; // We'll create this CSS file

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "#3498db",
}) => {
  return (
    <div
      className={`loading-spinner ${size}`}
      style={{ "--spinner-color": color } as React.CSSProperties}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
