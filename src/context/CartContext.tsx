// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Cart, CartItem } from "../types/Cart";

interface CartState {
  cart: Cart;
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" };

// Define the context type
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const initialState: CartState = {
  cart: {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  },
  isOpen: false,
};

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      let updatedItems: CartItem[];
      if (existingItemIndex >= 0) {
        updatedItems = state.cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.cart.items, action.payload];
      }

      return {
        ...state,
        cart: {
          items: updatedItems,
          ...calculateCartTotals(updatedItems),
        },
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: {
          items: updatedItems,
          ...calculateCartTotals(updatedItems),
        },
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.cart.items.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(
                0,
                Math.min(action.payload.quantity, item.stockQuantity)
              ),
            }
          : item
      );
      return {
        ...state,
        cart: {
          items: updatedItems,
          ...calculateCartTotals(updatedItems),
        },
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: initialState.cart,
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
};

// Export the context with proper typing
export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart state from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({
          type: "ADD_ITEM",
          payload: { ...parsedCart, quantity: 1 },
        });
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Persist cart state to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { state, dispatch } = context;

  return {
    cart: state.cart,
    isOpen: state.isOpen,
    addItem: (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (itemId: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: itemId }),
    updateQuantity: (itemId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
  };
};
