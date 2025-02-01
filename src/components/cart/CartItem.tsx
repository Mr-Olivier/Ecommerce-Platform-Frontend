import React from "react";
import { useCart } from "../../hooks/useCart";
import { CartItem as CartItemType } from "../../types/Cart";
import { formatCurrency } from "../../utils/currency";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">
          {Object.entries(item.attributes || {})
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              disabled={item.quantity >= item.stockQuantity}
            >
              +
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-medium text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <p className="text-sm text-gray-500">
          {formatCurrency(item.price)} each
        </p>
      </div>
    </div>
  );
};
