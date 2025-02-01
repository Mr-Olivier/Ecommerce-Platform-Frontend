// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/Cart";

interface CartState {
  cart: Cart;
  isOpen: boolean;
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cart.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.items.push(action.payload);
      }

      // Recalculate totals
      const subtotal = state.cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.cart.subtotal = subtotal;
      state.cart.tax = subtotal * 0.1;
      state.cart.shipping = subtotal > 100 ? 0 : 10;
      state.cart.total =
        state.cart.subtotal + state.cart.tax + state.cart.shipping;
    },

    removeItem(state, action: PayloadAction<string>) {
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload
      );

      // Recalculate totals
      const subtotal = state.cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.cart.subtotal = subtotal;
      state.cart.tax = subtotal * 0.1;
      state.cart.shipping = subtotal > 100 ? 0 : 10;
      state.cart.total =
        state.cart.subtotal + state.cart.tax + state.cart.shipping;
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.cart.items.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = Math.max(
          0,
          Math.min(action.payload.quantity, item.stockQuantity)
        );
      }

      // Recalculate totals
      const subtotal = state.cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.cart.subtotal = subtotal;
      state.cart.tax = subtotal * 0.1;
      state.cart.shipping = subtotal > 100 ? 0 : 10;
      state.cart.total =
        state.cart.subtotal + state.cart.tax + state.cart.shipping;
    },

    clearCart(state) {
      state.cart = initialState.cart;
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, toggleCart } =
  cartSlice.actions;

export default cartSlice.reducer;
