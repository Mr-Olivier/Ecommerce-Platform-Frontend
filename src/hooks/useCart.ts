// src/hooks/useCart.ts
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../types/Cart";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { state, dispatch } = context;

  return {
    cart: state.cart,
    isOpen: state.isOpen,
    addItem: (item: CartItem) => {
      dispatch({ type: "ADD_ITEM", payload: item });
    },
    removeItem: (itemId: string) => {
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
    },
    updateQuantity: (itemId: string, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
    },
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
    },
    toggleCart: () => {
      dispatch({ type: "TOGGLE_CART" });
    },
  };
};
