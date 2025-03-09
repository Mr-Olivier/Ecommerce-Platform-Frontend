// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthResponse } from "../types/User";
import { api } from "../utils/api";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    company: string,
    country: string,
    resend?: boolean
  ) => Promise<AuthResponse>; // Changed to match implementation
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<AuthResponse>; // Changed to match implementation
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    company: string,
    country: string,
    resend?: boolean
  ): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>("/auth/register", {
        email,
        password,
        firstName,
        lastName,
        username,
        phoneNumber,
        company,
        country,
        resend,
      });

      // For registration, don't set user yet until OTP verification is complete
      if (!resend) {
        // Store registration data temporarily if needed
        localStorage.setItem("registrationEmail", email);
      }

      return response.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (
    email: string,
    otp: string
  ): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<AuthResponse>("/auth/verify-otp", {
        email,
        otp,
      });

      // After successful OTP verification, set the user
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Clean up temporary storage
      localStorage.removeItem("registrationEmail");

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.post("/auth/forgot-password", { email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.post("/auth/reset-password", { token, newPassword });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyOtp,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
