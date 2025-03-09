import { useState, FormEvent } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaKey,
  FaCheck,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// API client setup
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const ForgotPassword = () => {
  // Navigate hook
  // const navigate = useNavigate();

  // Track the current step of the password reset flow
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  // Start countdown for OTP resend
  const startCountdown = () => {
    setCountdown(120); // 2 minutes countdown
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  // Format time remaining for display
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle email submission
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!email) {
      setErrorMessage("Email is required");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      // Call the forgot password API
      const response = await api.post("/auth/forgot-password", { email });

      // Check for success response
      if (response.data.status === "success") {
        setSuccessMessage(
          response.data.message ||
            "Verification code sent. Please check your email."
        );
        startCountdown();
        setStep("otp");
      } else {
        throw new Error(
          response.data.message || "Failed to send verification code"
        );
      }
    } catch (error: any) {
      console.error("Password reset request failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message ||
            "Failed to send verification code. Please try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!otp) {
      setErrorMessage("Verification code is required");
      setLoading(false);
      return;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setErrorMessage("Please enter a valid 6-digit verification code");
      setLoading(false);
      return;
    }

    try {
      // Call the verify OTP API
      const response = await api.post("/auth/verify-reset-otp", {
        email,
        otp,
      });

      // Check for success response
      if (response.data.status === "success") {
        setSuccessMessage(
          response.data.message ||
            "Verification successful. You can now reset your password."
        );
        setStep("reset");
      } else {
        throw new Error(response.data.message || "Invalid verification code");
      }
    } catch (error: any) {
      console.error("OTP verification failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message ||
            "Invalid verification code. Please try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handleResetSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!newPassword) {
      setErrorMessage("New password is required");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    // Check password complexity
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (!hasLetter || !hasNumber) {
      setErrorMessage(
        "Password must contain at least one letter and one number"
      );
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Call the reset password API
      const response = await api.post("/auth/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });

      // Check for success response
      if (response.data.status === "success") {
        setSuccessMessage(
          response.data.message || "Password has been reset successfully."
        );
        setStep("success");
      } else {
        throw new Error(response.data.message || "Failed to reset password");
      }
    } catch (error: any) {
      console.error("Password reset failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message ||
            "Failed to reset password. Please try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      // Call the forgot password API again to resend OTP
      const response = await api.post("/auth/forgot-password", { email });

      // Check for success response
      if (response.data.status === "success") {
        setSuccessMessage(
          response.data.message ||
            "Verification code resent. Please check your email."
        );
        startCountdown();
      } else {
        throw new Error(
          response.data.message || "Failed to resend verification code"
        );
      }
    } catch (error: any) {
      console.error("Resend OTP failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message ||
            "Failed to resend verification code. Please try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
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
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Password Recovery
          </h2>
          <p className="mt-2 text-sm text-gray-600">{renderSubtitle()}</p>
        </div>

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
                      ? "bg-primary-600 text-white border-primary-600"
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
                      ? "bg-primary-600 text-white border-primary-600"
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
                      ? "bg-primary-600 text-white border-primary-600"
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
                      ? "bg-primary-600 text-white border-primary-600"
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
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                    Sending...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-primary-600"
              >
                <FaArrowLeft className="inline mr-1 text-xs" /> Back to login
              </Link>
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
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                    Verifying...
                  </span>
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
                  disabled={countdown > 0 || loading}
                  className={`font-medium ${
                    countdown > 0 || loading
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-primary-600 hover:text-primary-500"
                  }`}
                >
                  {loading
                    ? "Sending..."
                    : countdown > 0
                    ? `Resend in ${formatTimeRemaining(countdown)}`
                    : "Resend Code"}
                </button>
              </p>
            </div>

            {/* Back to Email Step */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-sm text-gray-600 hover:text-primary-600"
              >
                <FaArrowLeft className="inline mr-1 text-xs" /> Use different
                email
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
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                Must be at least 8 characters with letters and numbers
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
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                    Resetting Password...
                  </span>
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
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <FaCheck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Password Reset Complete
              </h3>
              <p className="text-center mb-6 text-gray-600">
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
    </div>
  );
};

export default ForgotPassword;
