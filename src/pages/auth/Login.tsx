// src/pages/auth/login.tsx
import AuthWrapper from "../../components/Auth/AuthWrapper";
import LoginForm from "../../components/Auth/LoginForm12";

const LoginPage = () => {
  return (
    <AuthWrapper
      title="Welcome back"
      subtitle="Sign in to your account"
      alternativeText="Don't have an account?"
      alternativeLink="/register"
      alternativeLinkText="Sign up"
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
