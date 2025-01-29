// src/pages/auth/login.tsx
import AuthWrapper from "../../components/Auth/AuthWrapper";
import LoginForm from "../../components/Auth/LoginForm12";

const LoginPage = () => {
  return (
    <AuthWrapper
      title=""
      subtitle=""
      alternativeText=""
      alternativeLink="/register"
      alternativeLinkText=""
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
