// src/pages/auth/register.tsx
import AuthWrapper from "../../components/Auth/AuthWrapper";
import RegisterForm from "../../components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthWrapper
      title=""
      subtitle=""
      alternativeText=""
      alternativeLink="/login"
      alternativeLinkText=""
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;
