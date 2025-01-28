// src/pages/auth/forgot-password.tsx
import AuthWrapper from "../../components/Auth/AuthWrapper";
import ForgotPassword from "../../components/Auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper
      title="Forgot Password"
      subtitle="Reset your password"
      alternativeText="Remember your password?"
      alternativeLink="/login"
      alternativeLinkText="Sign in"
    >
      <ForgotPassword />
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
