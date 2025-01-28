// src/pages/auth/register.tsx
import AuthWrapper from "../../components/Auth/AuthWrapper";
import RegisterForm from "../../components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthWrapper
      title="Create an account"
      subtitle="Start your shopping journey"
      alternativeText="Already have an account?"
      alternativeLink="/login"
      alternativeLinkText="Sign in"
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;
