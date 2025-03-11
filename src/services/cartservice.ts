// services/cartService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Helper function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper function to create headers with authentication
const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const cartService = {
  // Add item to cart
  addItem: async (productId: string, quantity: number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/items`,
        { productId, quantity },
        createAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },

  // Update item quantity
  updateItemQuantity: async (itemId: string, quantity: number) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cart/items/${itemId}`,
        { quantity },
        createAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  // Remove item from cart
  removeItem: async (itemId: string) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cart/items/${itemId}`,
        createAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cart`,
        createAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },

  // Get cart contents
  getCart: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cart`,
        createAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },
};

export default cartService;
