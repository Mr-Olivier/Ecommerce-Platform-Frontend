// src/hooks/useWishlist.ts
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext"; // Add this import

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
