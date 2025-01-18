import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  // Evaluate Password Strength
  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength++; // Length criteria
    if (/[A-Z]/.test(password)) strength++; // Uppercase letter
    if (/[a-z]/.test(password)) strength++; // Lowercase letter
    if (/\d/.test(password)) strength++; // Number
    if (/[@$!%*?&#]/.test(password)) strength++; // Special character

    setPasswordStrength(strength);
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (passwordStrength < 3) {
      newErrors.password = "Password must be stronger.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  // Get Dot Color Based on Strength
  const getDotColor = (index: number) => {
    if (index <= passwordStrength - 1) {
      if (passwordStrength < 3) return "bg-red-500"; // Weak password
      if (passwordStrength < 5) return "bg-yellow-500"; // Moderate password
      return "bg-green-500"; // Strong password
    }
    return "bg-gray-300"; // Inactive dot
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">First Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className="w-full outline-none"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="w-full outline-none"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                className="w-full outline-none"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2 text-gray-400"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex space-x-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-8 rounded-full ${getDotColor(index)}`}
                ></span>
              ))}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            SignUp
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
