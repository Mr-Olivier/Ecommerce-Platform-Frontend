// // components/cart/CartSummary.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { formatCurrency } from "../../utils/currency";
// import { CartItem } from "../../types/Cart";
// import LoginModal from "../Auth/LoginModal";

// export const CartSummary: React.FC = () => {
//   const { cart } = useCart();
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleProceedToCheckout = () => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("No token found, showing login modal");
//       setIsLoginModalOpen(true);
//     } else {
//       console.log("User is logged in, proceeding to checkout");
//       navigate("/checkout");
//     }
//   };

//   const handleLoginSuccess = () => {
//     console.log("Login successful, navigating to checkout");
//     setIsLoginModalOpen(false);

//     // Navigate to checkout after successful login
//     navigate("/checkout");
//   };

//   return (
//     <div className="bg-gray-50 rounded-lg p-6 space-y-4">
//       <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

//       <div className="space-y-2">
//         {cart.items.map((item: CartItem) => (
//           <div
//             key={item.id}
//             className="flex justify-between text-sm text-gray-600"
//           >
//             <span>
//               {item.name} × {item.quantity}
//             </span>
//             <span>{formatCurrency(item.price * item.quantity)}</span>
//           </div>
//         ))}
//       </div>

//       <div className="border-t pt-4 space-y-2">
//         <div className="flex justify-between text-gray-600">
//           <span>Subtotal</span>
//           <span>{formatCurrency(cart.subtotal)}</span>
//         </div>
//         <div className="flex justify-between text-gray-600">
//           <span>Tax</span>
//           <span>{formatCurrency(cart.tax)}</span>
//         </div>
//         <div className="flex justify-between text-gray-600">
//           <span>Shipping</span>
//           <span>
//             {cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}
//           </span>
//         </div>
//         <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
//           <span>Total</span>
//           <span>{formatCurrency(cart.total)}</span>
//         </div>
//       </div>

//       {cart.subtotal > 0 && cart.subtotal < 100 && (
//         <div className="bg-blue-50 p-4 rounded-md">
//           <p className="text-sm text-blue-700">
//             Add ${formatCurrency(100 - cart.subtotal)} more to your cart for
//             free shipping!
//           </p>
//         </div>
//       )}

//       <div className="mt-6">
//         <button
//           className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
//           onClick={handleProceedToCheckout}
//         >
//           Proceed to Checkout
//         </button>
//       </div>

//       {/* Login Modal - rendering this way ensures it will appear properly */}
//       <LoginModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         onSuccess={handleLoginSuccess}
//       />
//     </div>
//   );
// };

// export default CartSummary;

// components/cart/CartSummary.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import { CartItem } from "../../types/Cart";
import LoginModal from "../Auth/LoginModal";

export const CartSummary: React.FC = () => {
  const { cart, syncGuestCart, refreshCart } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, showing login modal for checkout");
      setIsLoginModalOpen(true);
    } else {
      console.log("User is logged in, proceeding to checkout");
      proceedToCheckout();
    }
  };

  const proceedToCheckout = () => {
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout");
    }, 500);
  };

  const handleLoginSuccess = async () => {
    console.log("Login successful, syncing cart and proceeding to checkout");
    setIsLoginModalOpen(false);
    setIsProcessing(true);

    try {
      // Sync guest cart with backend after successful login
      if (cart.items.length > 0) {
        console.log("Syncing guest cart with backend...");
        const syncSuccess = await syncGuestCart();

        if (syncSuccess) {
          console.log("Cart sync successful");
          // Refresh cart to get updated data from server
          await refreshCart();
        } else {
          console.log("Cart sync failed, but proceeding anyway");
        }
      }

      // Dispatch auth state change event
      window.dispatchEvent(new Event("auth-state-changed"));
    } catch (error) {
      console.error("Error during login and cart sync:", error);
    } finally {
      setIsProcessing(false);
      proceedToCheckout();
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  // Check if cart is empty
  const isCartEmpty = cart.items.length === 0;

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      {isCartEmpty ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {cart.items.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatCurrency(cart.tax)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {cart.shipping === 0 ? "Free" : formatCurrency(cart.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>{formatCurrency(cart.total)}</span>
            </div>
          </div>

          {cart.subtotal > 0 && cart.subtotal < 100 && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                Add {formatCurrency(100 - cart.subtotal)} more to your cart for
                free shipping!
              </p>
            </div>
          )}

          <div className="mt-6">
            <button
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleProceedToCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>

            {/* Guest checkout notice */}
            <p className="text-xs text-gray-500 mt-2 text-center">
              {localStorage.getItem("token")
                ? "Your cart is saved to your account"
                : "Login required to complete your purchase"}
            </p>
          </div>
        </>
      )}

      {/* Login Modal - only shows when checkout is attempted without login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default CartSummary;
