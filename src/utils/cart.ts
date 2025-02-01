// utils/cart.ts
import { CartItem } from "../types/Cart";

export const validateCartItem = (item: CartItem): boolean => {
  if (!item.id || !item.productId || !item.name || item.price <= 0) {
    return false;
  }

  if (item.quantity <= 0 || item.quantity > item.stockQuantity) {
    return false;
  }

  return true;
};

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
  };
};
