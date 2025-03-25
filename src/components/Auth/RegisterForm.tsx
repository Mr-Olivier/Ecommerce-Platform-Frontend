import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  AlertCircle,
  Loader,
} from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";

// API client setup
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add these type definitions
type FormErrors = Record<string, string>;

// API response type definitions
interface ApiResponse {
  status: string;
  message: string;
  data?: any;
}

const RegisterForm = () => {
  // Form Data State - simplified to match your API requirements
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // UI States
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [step, setStep] = useState("registration"); // "registration", "otp", "success"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [_registeredUserData, setRegisteredUserData] = useState<any>(null);

  const navigate = useNavigate();

  // Timer for OTP countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, step]);

  // Auto-clear notifications after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation - matching backend validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      // Make sure phone has country code
      let phone = formData.phoneNumber;
      if (!phone.startsWith("+")) {
        newErrors.phoneNumber =
          "Phone number must include country code (e.g., +250)";
      }
    }

    // Password validation - matching backend requirements
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        setErrors({});

        // Ensure phone number is in a valid format (with country code)
        let phoneNumber = formData.phoneNumber;
        if (!phoneNumber.startsWith("+")) {
          phoneNumber = "+" + phoneNumber;
        }

        // Create the request object
        const requestData = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: phoneNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };

        console.log("Sending registration data:", requestData);

        // Make the API call
        const response = await axios.post(
          "http://localhost:4000/api/auth/register",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Registration response:", response.data);

        // Handle successful response
        if (response.data.status === "success") {
          // Save registered user data
          setRegisteredUserData(response.data.data);

          // Move to OTP verification
          setLoading(false);
          setStep("otp");

          // Show success notification
          setNotification({
            type: "success",
            message:
              response.data.message ||
              "Registration successful! Please verify your email.",
          });
        } else {
          throw new Error(
            response.data.message || "Unexpected response from server"
          );
        }
      } catch (error: any) {
        setLoading(false);
        console.error("Registration error:", error);

        if (axios.isAxiosError(error) && error.response) {
          console.log("Error response status:", error.response.status);
          console.log("Error response data:", error.response.data);

          // Format validation errors for display
          if (
            error.response.data.errors &&
            error.response.data.errors.length > 0
          ) {
            const validationErrors = error.response.data.errors;
            console.log("Validation errors:", validationErrors);

            // Extract field-specific errors
            const newErrors: FormErrors = {};
            validationErrors.forEach((err: any) => {
              newErrors[err.field] = err.message;
            });

            // Set field-specific errors
            setErrors(newErrors);

            // Set notification with the first error
            setNotification({
              type: "error",
              message: validationErrors[0].message,
            });
          } else {
            // General error
            setNotification({
              type: "error",
              message: error.response.data.message || "Registration failed",
            });
          }
        } else if (error instanceof Error) {
          setNotification({
            type: "error",
            message: error.message || "An error occurred",
          });
        } else {
          setNotification({
            type: "error",
            message: "Connection error. Please try again.",
          });
        }
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Only take the first character if multiple are pasted
      value = value.slice(0, 1);
    }

    if (value && !/^\d+$/.test(value)) {
      // Only allow numbers
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      // Split the pasted content into individual digits
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input
      const lastInput = document.getElementById("otp-5");
      if (lastInput) {
        lastInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setNotification({
        type: "error",
        message: "Please enter a complete 6-digit OTP",
      });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      // Send OTP verification request
      const response = await api.post<ApiResponse>("/auth/verify-otp", {
        email: formData.email,
        otp: otpValue,
      });

      // Check for successful response
      if (response.data.status === "success") {
        // Store authentication data
        const data = response.data.data;

        // Store token in localStorage
        localStorage.setItem("auth_token", data.token);

        // Store user info
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            role: data.user.role,
          })
        );

        setLoading(false);

        // Show success notification
        setNotification({
          type: "success",
          message: response.data.message || "Email verification successful",
        });

        // After successful verification, move to success step
        setStep("success");
      } else {
        throw new Error(response.data.message || "Verification failed");
      }
    } catch (error: any) {
      setLoading(false);

      // Handle error responses from the API
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as ApiResponse;
        const errorMessage = errorData?.message || "Invalid verification code";

        setNotification({
          type: "error",
          message: errorMessage,
        });
      } else if (error.request) {
        setNotification({
          type: "error",
          message: "No response from server. Please try again.",
        });
      } else {
        setNotification({
          type: "error",
          message: error.message || "An error occurred. Please try again.",
        });
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setErrors({});

      // Call the register API again with the same data to resend OTP
      const response = await api.post<ApiResponse>("/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        resend: true, // Add a flag to indicate this is a resend request
      });

      setLoading(false);

      // Reset the countdown and disable resend button
      setCountdown(60);
      setIsResendDisabled(true);

      // Show success notification
      setNotification({
        type: "success",
        message:
          response.data.message || "Verification code resent successfully",
      });
    } catch (error: any) {
      setLoading(false);

      // Handle error responses from the API
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as ApiResponse;
        const errorMessage = errorData?.message || "Failed to resend code";

        setNotification({
          type: "error",
          message: errorMessage,
        });
      } else if (error.request) {
        setNotification({
          type: "error",
          message: "No response from server. Please try again.",
        });
      } else {
        setNotification({
          type: "error",
          message: "An error occurred. Please try again.",
        });
      }
    }
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const notification_variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      {/* Back to Home Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Notification Bar */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key="notification"
            variants={notification_variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md rounded-lg shadow-lg px-6 py-4 ${
              notification.type === "success"
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-red-50 border-l-4 border-red-500"
            }`}
          >
            <div className="flex items-start">
              {notification.type === "success" ? (
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    notification.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {step === "registration" && (
            <motion.div
              key="registration"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
            >
              {/* Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create an Account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Complete the form below to register for an account
                </p>
                <div className="mt-4 border-b border-gray-200 w-1/4 mx-auto"></div>
              </div>

              {/* Google OAuth */}
              {/* <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 shadow-sm hover:shadow"
              >
                <FcGoogle className="h-5 w-5" />
                <span>Continue with Google</span>
              </button> */}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or register with email
                  </span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-6">
                  {/* Name Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="+250 789 123 456"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password ? (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters with numbers and
                        uppercase letters
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <a
                          href="/terms"
                          className="text-primary-600 hover:text-primary-500"
                        >
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy"
                          className="text-primary-600 hover:text-primary-500"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Sign In Link */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Verify Your Email
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  We've sent a verification code to:
                </p>
                <p className="mt-1 font-medium text-gray-800">
                  {formData.email}
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  Please check your inbox (and spam folder) for the verification
                  code
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Enter the 6-digit code
                  </label>
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResendDisabled || loading}
                      className={`font-medium ${
                        isResendDisabled || loading
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary-600 hover:text-primary-500"
                      }`}
                    >
                      {isResendDisabled
                        ? `Resend in ${countdown}s`
                        : "Resend Code"}
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify Account"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("registration")}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                  Back to Registration
                </button>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
              className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 ring-8 ring-green-50 mb-4">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Registration Successful!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your account has been created and verified successfully.
                </p>
                <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-sm text-green-800">
                    Welcome to our platform! You can now access all features of
                    your account.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 hover:shadow-lg"
                >
                  Go to Login
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegisterForm;
