// import React from "react";
// import { useCart } from "../../context/CartContext";
// import { CartItem as CartItemType } from "../../types/Cart";
// import { formatCurrency } from "../../utils/currency";

// interface CartItemProps {
//   item: CartItemType;
// }

// export const CartItem: React.FC<CartItemProps> = ({ item }) => {
//   const { updateQuantity, removeItem } = useCart();

//   // Function to get a proper image URL
//   const getImageUrl = (image: string | null): string => {
//     if (!image) {
//       return "/placeholder-image.jpg"; // Fallback placeholder
//     }

//     // If the image already has http or https, it's a full URL
//     if (image.startsWith("http://") || image.startsWith("https://")) {
//       return image;
//     }

//     // If it starts with a slash, it's a relative path from the server
//     if (image.startsWith("/")) {
//       // Add your API base URL if needed
//       return `http://localhost:4000${image}`;
//     }

//     // Otherwise, assume it's a relative path
//     return image;
//   };

//   const handleQuantityChange = (newQuantity: number) => {
//     updateQuantity(item.id, newQuantity);
//   };

//   const handleRemove = () => {
//     removeItem(item.id);
//   };

//   return (
//     <div className="flex items-center gap-4 py-4 border-b border-gray-200">
//       <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
//         {/* Image with fallback handling */}
//         <img
//           src={getImageUrl(item.image)}
//           alt={item.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             // If image fails to load, set a fallback
//             (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
//           }}
//         />
//       </div>

//       <div className="flex-grow">
//         <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
//         <p className="text-sm text-gray-500">
//           {Object.entries(item.attributes || {})
//             .map(([key, value]) => `${key}: ${value}`)
//             .join(", ")}
//         </p>
//         <div className="mt-2 flex items-center gap-4">
//           <div className="flex items-center border rounded-md">
//             <button
//               onClick={() => handleQuantityChange(item.quantity - 1)}
//               className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//               disabled={item.quantity <= 1}
//             >
//               -
//             </button>
//             <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
//             <button
//               onClick={() => handleQuantityChange(item.quantity + 1)}
//               className="px-3 py-1 text-gray-600 hover:bg-gray-100"
//               disabled={item.quantity >= item.stockQuantity}
//             >
//               +
//             </button>
//           </div>
//           <button
//             onClick={handleRemove}
//             className="text-red-600 hover:text-red-800"
//           >
//             Remove
//           </button>
//         </div>
//       </div>

//       <div className="text-right">
//         <p className="text-lg font-medium text-gray-900">
//           {formatCurrency(item.price * item.quantity)}
//         </p>
//         <p className="text-sm text-gray-500">
//           {formatCurrency(item.price)} each
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { CartItem as CartItemType } from "../../types/Cart";
import { formatCurrency } from "../../utils/currency";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem, isLoading } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Function to get a proper image URL
  const getImageUrl = (image: string | null): string => {
    if (!image) {
      return "/placeholder-image.jpg"; // Fallback placeholder
    }

    // If the image already has http or https, it's a full URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // If it starts with a slash, it's a relative path from the server
    if (image.startsWith("/")) {
      // Add your API base URL if needed
      return `http://localhost:4000${image}`;
    }

    // Otherwise, assume it's a relative path
    return image;
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.stockQuantity || isUpdating) {
      return;
    }

    setIsUpdating(true);
    try {
      console.log(`Updating quantity for item ${item.id} to ${newQuantity}`);
      const success = await updateQuantity(item.id, newQuantity);
      if (!success) {
        console.error("Failed to update quantity");
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (isRemoving) return;

    setIsRemoving(true);
    try {
      console.log(`Removing item ${item.id} from cart`);
      const success = await removeItem(item.id);
      if (!success) {
        console.error("Failed to remove item");
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        {/* Image with fallback handling */}
        <img
          src={getImageUrl(item.image)}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, set a fallback
            (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
          }}
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
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1 || isUpdating || isLoading}
            >
              {isUpdating ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "-"
              )}
            </button>
            <span className="px-3 py-1 text-gray-800 min-w-[3rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                item.quantity >= item.stockQuantity || isUpdating || isLoading
              }
            >
              {isUpdating ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "+"
              )}
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            disabled={isRemoving || isLoading}
          >
            {isRemoving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Removing...
              </>
            ) : (
              "Remove"
            )}
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
        {item.stockQuantity && (
          <p className="text-xs text-gray-400">{item.stockQuantity} in stock</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
