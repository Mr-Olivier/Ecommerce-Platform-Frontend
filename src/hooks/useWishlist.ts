// src/hooks/useWishlist.ts
import { useContext, useCallback, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";

// Types for compatibility with dashboard components
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  // Example mock data for development purposes - used only for the dashboard preview
  const mockWishlistItems: WishlistItem[] = [
    {
      id: "wishlist-1",
      productId: "product-1",
      name: "Wireless Headphones",
      price: 89.99,
      image: "https://via.placeholder.com/100",
      inStock: true,
    },
    {
      id: "wishlist-2",
      productId: "product-2",
      name: "Smart Watch",
      price: 199.95,
      image: "https://via.placeholder.com/100",
      inStock: true,
    },
    {
      id: "wishlist-3",
      productId: "product-3",
      name: "Bluetooth Speaker",
      price: 149.99,
      image: "https://via.placeholder.com/100",
      inStock: false,
    },
  ];

  // Extended functionality for customer dashboard
  // This preserves your existing context functionality while adding
  // what's needed for the dashboard

  // Fetch formatted wishlist items for the dashboard
  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, you would transform the context.wishlist
      // into the format needed by the dashboard components

      // For now, we'll return the mock data to ensure the dashboard works
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Return mock data for demonstration
      return mockWishlistItems;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to fetch wishlist. Please try again later.");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Move item from wishlist to cart
  const moveToCart = useCallback(async (wishlistItemId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Find the item in the mock data or context
      const item = mockWishlistItems.find((item) => item.id === wishlistItemId);

      if (!item) {
        throw new Error("Wishlist item not found");
      }

      // In a real implementation, you would:
      // 1. Use context.addToCart(item.productId) or similar
      // 2. Use context.removeFromWishlist(item.productId) or similar

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        success: true,
        message: "Item added to cart",
      };
    } catch (err) {
      console.error(`Error moving item ${wishlistItemId} to cart:`, err);
      setError("Failed to add item to cart. Please try again later.");
      return {
        success: false,
        message: "Failed to add item to cart",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Return both the original context and the enhanced functionality
  return {
    ...context,
    loading,
    error,
    fetchWishlist,
    moveToCart,
    wishlist: context.wishlist, // Ensure wishlist is available from context
  };
};
