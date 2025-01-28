// src/components/auth/ForgotPassword.tsx
import { useState, FormEvent } from "react";
import { Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, loading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mb-4 text-sm text-gray-600">
          Password reset instructions have been sent to your email address.
          Please check your inbox and follow the instructions to reset your
          password.
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary-600 hover:text-primary-500"
        >
          Try another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
