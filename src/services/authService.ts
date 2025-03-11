// services/authService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
  error?: string;
}

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );

      if (response.data.status === "success") {
        // Get the token and user info
        const { token, user } = response.data.data;

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Trigger auth state change event
        window.dispatchEvent(new Event("auth-state-changed"));

        return {
          success: true,
          token,
          user,
        };
      }

      return {
        success: false,
        error: "Login failed",
      };
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || "Invalid credentials";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Logout user - completely removes auth data
  logout: () => {
    // Remove auth data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Remove any cart data from localStorage to prevent unauthorized access
    localStorage.removeItem("cart");

    // Clear any other auth-related data
    sessionStorage.removeItem("authState");

    // Trigger auth state change event
    window.dispatchEvent(new Event("auth-state-changed"));

    return {
      success: true,
    };
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  // Get current user data
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  // Create auth headers for API requests
  getAuthHeaders: () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
};

export default authService;
