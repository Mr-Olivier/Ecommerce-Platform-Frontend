import { useState, FormEvent } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaKey,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ForgotPassword = () => {
  // Track the current step of the password reset flow
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [resendingOtp, setResendingOtp] = useState(false);

  const { forgotPassword, loading } = useAuth();

  // Handle email submission
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      await forgotPassword(email);

      // Start countdown for resend button (2 minutes)
      setCountdown(120);
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      // Show success message and move to OTP step
      setSuccessMessage("Verification code sent. Please check your email.");
      setStep("otp");
    } catch (error) {
      console.error("Password reset request failed:", error);
      setErrorMessage("Failed to send verification code. Please try again.");
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!otp) {
      setErrorMessage("Verification code is required");
      return;
    }

    if (otp.length < 6) {
      setErrorMessage("Verification code must be at least 6 characters");
      return;
    }

    try {
      // In a real app, you would call an API to verify the OTP
      // For demo purposes, we'll just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage(
        "Verification successful. You can now reset your password."
      );
      setStep("reset");
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrorMessage("Invalid verification code. Please try again.");
    }
  };

  // Handle password reset
  const handleResetSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setErrorMessage(
        "Password must include uppercase, lowercase, number, and special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // In a real app, you would call an API to reset the password
      // For demo purposes, we'll just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Password has been reset successfully.");
      setStep("success");
    } catch (error) {
      console.error("Password reset failed:", error);
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setResendingOtp(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await forgotPassword(email);

      // Start countdown for resend button (2 minutes)
      setCountdown(120);
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      setSuccessMessage("Verification code resent. Please check your email.");
    } catch (error) {
      console.error("Resend OTP failed:", error);
      setErrorMessage("Failed to resend verification code. Please try again.");
    } finally {
      setResendingOtp(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Only allow numbers
    const formatted = value.replace(/[^0-9]/g, "");
    // Limit to 6 digits
    const limited = formatted.slice(0, 6);
    setOtp(limited);
  };

  // Render appropriate title based on current step
  const renderTitle = () => {
    switch (step) {
      case "email":
        return "Forgot Password";
      case "otp":
        return "Verify Your Identity";
      case "reset":
        return "Create New Password";
      case "success":
        return "Password Reset Successful";
      default:
        return "Forgot Password";
    }
  };

  // Render appropriate subtitle based on current step
  const renderSubtitle = () => {
    switch (step) {
      case "email":
        return "Enter your email to reset your password";
      case "otp":
        return `Enter the verification code sent to ${email}`;
      case "reset":
        return "Create a new secure password";
      case "success":
        return "Your password has been reset successfully";
      default:
        return "Enter your email to reset your password";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Steps indicator */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-between">
            <div className={`flex flex-col items-center`}>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                  step === "email"
                    ? "bg-primary-600 text-white"
                    : step === "otp" || step === "reset" || step === "success"
                    ? "bg-primary-100 text-primary-600 border-primary-600"
                    : "bg-transparent border-gray-300 text-gray-400"
                }`}
              >
                <FaEnvelope className="h-4 w-4" />
              </div>
              <span className="text-xs mt-1 text-gray-600">Email</span>
            </div>
            <div className={`flex flex-col items-center`}>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                  step === "otp"
                    ? "bg-primary-600 text-white"
                    : step === "reset" || step === "success"
                    ? "bg-primary-100 text-primary-600 border-primary-600"
                    : "bg-transparent border-gray-300 text-gray-400"
                }`}
              >
                <FaKey className="h-4 w-4" />
              </div>
              <span className="text-xs mt-1 text-gray-600">Verify</span>
            </div>
            <div className={`flex flex-col items-center`}>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                  step === "reset"
                    ? "bg-primary-600 text-white"
                    : step === "success"
                    ? "bg-primary-100 text-primary-600 border-primary-600"
                    : "bg-transparent border-gray-300 text-gray-400"
                }`}
              >
                <FaLock className="h-4 w-4" />
              </div>
              <span className="text-xs mt-1 text-gray-600">Reset</span>
            </div>
            <div className={`flex flex-col items-center`}>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                  step === "success"
                    ? "bg-primary-600 text-white"
                    : "bg-transparent border-gray-300 text-gray-400"
                }`}
              >
                <FaCheck className="h-4 w-4" />
              </div>
              <span className="text-xs mt-1 text-gray-600">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        {/* <h2 className="text-2xl font-bold text-gray-900">{renderTitle()}</h2> */}
        <p className="mt-2 text-sm text-gray-600">{renderSubtitle()}</p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded flex items-start"
          role="alert"
        >
          <FaExclamationCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <span className="block">{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div
          className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded flex items-start"
          role="alert"
        >
          <FaCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <span className="block">{successMessage}</span>
        </div>
      )}

      {/* Email Form */}
      {step === "email" && (
        <form className="space-y-6" onSubmit={handleEmailSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="yourname@example.com"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </div>
        </form>
      )}

      {/* OTP Verification Form */}
      {step === "otp" && (
        <form className="space-y-6" onSubmit={handleOtpSubmit}>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Verification Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaKey className="text-gray-400" />
              </div>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={handleOtpChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-center tracking-widest text-lg"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || resendingOtp}
                className={`font-medium ${
                  countdown > 0 || resendingOtp
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary-600 hover:text-primary-500"
                }`}
              >
                {resendingOtp
                  ? "Sending..."
                  : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend Code"}
              </button>
            </p>
          </div>

          {/* Back to Email Step */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="inline mr-1" /> Use different email
            </button>
          </div>
        </form>
      )}

      {/* Reset Password Form */}
      {step === "reset" && (
        <form className="space-y-6" onSubmit={handleResetSubmit}>
          {/* New Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Must include uppercase, lowercase, number, and special character
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Success Message */}
      {step === "success" && (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <FaCheck className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-center mb-6">
              Your password has been reset successfully. You can now use your
              new password to log in to your account.
            </p>
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
