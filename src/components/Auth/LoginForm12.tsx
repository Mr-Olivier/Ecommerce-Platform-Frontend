import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [redirectDelay, setRedirectDelay] = useState(3);
  const [userRole, setUserRole] = useState(""); // To store user role for redirection

  // Create axios instance with base URL
  const api = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Clear server error when any field is changed
    if (errors.server) {
      setErrors({ ...errors, server: "" });
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "", server: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // API integration with the login endpoint using axios
        const response = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log(
          "LOGIN API RESPONSE - USER ROLE:",
          response.data.data.user.role
        );

        // Get data from response - matching actual API response structure
        const responseData = response.data;

        if (responseData.status !== "success") {
          throw new Error(responseData.message || "Login failed");
        }

        // Extract the data from response
        const data = responseData.data;

        // Store authentication data based on rememberMe preference
        const storageMethod = formData.rememberMe
          ? localStorage
          : sessionStorage;

        // Store auth token
        storageMethod.setItem("auth_token", data.token);

        // Store user info - preserve original case for role
        const userData = {
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          role: data.user.role, // Keep original case from API
        };

        console.log("USER DATA BEFORE STORAGE - ROLE:", userData.role);

        storageMethod.setItem("user", JSON.stringify(userData));

        console.log(
          "VERIFICATION - STORED USER ROLE:",
          JSON.parse(storageMethod.getItem("user") || "{}").role
        );

        // Log what's being stored for debugging
        console.log("Auth data stored:", {
          token: data.token,
          user: userData,
        });

        // Save the user role for redirection (keep original case)
        const role = data.user.role; // Don't convert to lowercase
        setUserRole(role);

        // Determine redirect URL with proper case comparison
        const redirectUrl =
          data.redirectUrl ||
          (role === "ADMIN"
            ? "/admin"
            : role === "CUSTOMER"
            ? "/customer/dashboard"
            : "/");

        console.log("Will redirect to:", redirectUrl);

        // Show success popup
        setShowSuccessPopup(true);

        // Start the countdown timer for UI feedback
        const timer = setInterval(() => {
          setRedirectDelay((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        // Use setTimeout for actual navigation to ensure auth context updates
        setTimeout(() => {
          navigate(redirectUrl);
        }, redirectDelay * 1000); // Navigate after countdown completes
      } catch (error) {
        console.error("Login failed:", error);

        // Handle axios error response
        if (axios.isAxiosError(error)) {
          console.log("Full error details:", error.response);

          if (error.response) {
            // Handle different status codes
            const statusCode = error.response.status;

            if (statusCode === 401) {
              setErrors({
                ...errors,
                server: "Invalid email or password. Please try again.",
              });
            } else if (error.response.data && error.response.data.message) {
              setErrors({ ...errors, server: error.response.data.message });
            } else {
              setErrors({
                ...errors,
                server: `Server error (${statusCode}). Please try again.`,
              });
            }
          } else if (error.request) {
            // The request was made but no response was received
            setErrors({
              ...errors,
              server: "No response from server. Please check your connection.",
            });
          } else {
            // Something happened in setting up the request
            setErrors({
              ...errors,
              server: "Request configuration error: " + error.message,
            });
          }
        } else if (error instanceof Error) {
          setErrors({ ...errors, server: error.message });
        } else {
          setErrors({
            ...errors,
            server: "An unexpected error occurred. Please try again later.",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // This would typically redirect to Google OAuth
      // For now, show a temporary error since we're using a custom API
      setErrors({
        ...errors,
        server:
          "Google login is not configured with the current API. Please use email/password login.",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      setErrors({
        ...errors,
        server:
          "Google authentication failed. Please try again or use email/password login.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Login Successful!
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Welcome back, {formData.email}! You have successfully logged into
              your account.
            </p>
            <p className="text-gray-500 mb-4">
              Redirecting to your{" "}
              {userRole === "ADMIN" ? "admin panel" : "dashboard"} in{" "}
              {redirectDelay} seconds...
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  navigate(
                    userRole === "ADMIN" ? "/admin" : "/customer/dashboard"
                  )
                }
                className="bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 transition-colors"
              >
                Go to {userRole === "ADMIN" ? "Admin Panel" : "Dashboard"} Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Log in to your account to continue shopping
          </p>
        </div>

        {/* Server Error Message */}
        {errors.server && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <FaExclamationCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{errors.server}</span>
            </div>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle className="h-5 w-5" />
          <span>{loading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-10 pr-10 py-3 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter your password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
