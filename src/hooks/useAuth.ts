import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: "customer" | "admin";
  // Add any other user properties you need
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Here you would typically check for an existing session or token
    // and fetch the user data if authenticated
    const checkAuth = async () => {
      try {
        // This is a placeholder. Replace with your actual authentication logic
        const response = await fetch("/api/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // For development purposes, use a mock user
          // Remove this in production and rely on your actual auth system
          if (process.env.NODE_ENV === "development") {
            setTimeout(() => {
              setUser({
                id: "user-dev",
                name: "Demo User",
                email: "demo@example.com",
                phone: "(555) 123-4567",
                role: "customer",
              });
            }, 500);
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Implement your login logic here
    setLoading(true);
    try {
      console.log("Login attempt with:", email, password);
      // This is a placeholder. Replace with actual login logic.
      // For example:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (response.ok) {
      //   const userData = await response.json();
      //   setUser(userData);
      //   return true;
      // }

      // For development purposes, simulate a successful login
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setUser({
          id: "user-1",
          name: "John Doe",
          email: email,
          phone: "(555) 123-4567",
          role: "customer",
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Implement your logout logic here
    // For example:
    setUser(null);
    localStorage.removeItem("auth_token");
    console.log("Logout");
  };

  // Additional methods for dashboard functionality
  const updateUserProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, you would call your API
        // const response = await fetch('/api/user/profile', {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });
        //
        // if (response.ok) {
        //   const updatedUser = await response.json();
        //   setUser(prevUser => ({ ...prevUser, ...updatedUser }));
        //   return true;
        // }

        // For development, simulate success
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Update user state with new data
        setUser((prevUser) => (prevUser ? { ...prevUser, ...data } : null));

        return true;
      } catch (err) {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again later.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateUserPassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, you would call your API
        // const response = await fetch('/api/user/password', {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ currentPassword, newPassword }),
        // });
        //
        // if (response.ok) {
        //   return true;
        // }

        // For development, simulate success with a delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simple validation for demonstration
        if (currentPassword === "wrongpassword") {
          setError("Current password is incorrect");
          return false;
        }

        // Use newPassword to simulate updating the password
        console.log(
          `Password updated successfully to: ${newPassword.substring(
            0,
            1
          )}${"*".repeat(newPassword.length - 1)}`
        );

        return true;
      } catch (err) {
        console.error("Error updating password:", err);
        setError("Failed to update password. Please try again later.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Register function (for new users)
  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, you would call your API
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ name, email, password }),
        // });
        //
        // if (response.ok) {
        //   const userData = await response.json();
        //   setUser(userData);
        //   return true;
        // }

        // For development, simulate success
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Log password securely to verify it's being used
        console.log(
          `Registering user with password length: ${password.length}`
        );

        setUser({
          id: `user-${Date.now()}`,
          name,
          email,
          role: "customer",
        });

        return true;
      } catch (err) {
        console.error("Registration error:", err);
        setError("Registration failed. Please try again later.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Password reset functions
  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, you would call your API
        // const response = await fetch('/api/forgot-password', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email }),
        // });
        //
        // if (response.ok) {
        //   return true;
        // }

        // For development, simulate success
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Log the email to verify it's being used
        console.log(`Sending password reset instructions to: ${email}`);

        return true;
      } catch (err) {
        console.error("Forgot password error:", err);
        setError(
          "Failed to process password reset request. Please try again later."
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (token: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // In a real implementation, you would call your API
        // const response = await fetch('/api/reset-password', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token, password }),
        // });
        //
        // if (response.ok) {
        //   return true;
        // }

        // For development, simulate success
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Log the token and password securely to verify they're being used
        console.log(
          `Resetting password using token: ${token.substring(0, 4)}...`
        );
        console.log(`New password length: ${password.length}`);

        return true;
      } catch (err) {
        console.error("Reset password error:", err);
        setError(
          "Failed to reset password. The token may be invalid or expired."
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateUserProfile,
    updateUserPassword,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
  };
}
