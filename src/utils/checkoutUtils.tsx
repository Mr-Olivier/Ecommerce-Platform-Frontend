// utils/checkoutUtils.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

/**
 * Extract values from API response, handling nested data structure
 */
const extractResponseData = (response: any) => {
  let data = response;

  // Handle nested response structure
  if (response && response.status === "success" && response.data) {
    data = response.data;
  }

  return {
    clientSecret: data.clientSecret || data.client_secret,
    orderId: data.orderId || data.order_id,
  };
};

/**
 * Utility function to verify if a checkout session is valid
 * and fix it if needed
 */
export const validateCheckoutSession = async (
  addressData: any
): Promise<boolean> => {
  // Check if we have client secret in localStorage
  const clientSecret = localStorage.getItem("checkoutClientSecret");
  const orderId = localStorage.getItem("checkoutOrderId");

  console.log("🔍 Validating checkout session");
  console.log(
    "🔑 Current client secret:",
    clientSecret ? `${clientSecret.substring(0, 10)}...` : "null"
  );
  console.log("📋 Current order ID:", orderId);

  // If we don't have both client secret and order ID, create new session
  if (!clientSecret || !orderId) {
    console.log("⚠️ Missing checkout data, creating new session");
    return await createNewCheckoutSession(addressData);
  }

  // Verify the existing session with the API
  try {
    const response = await axios.post(
      `${API_URL}/checkout/verify-session`,
      { clientSecret, orderId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
      }
    );

    // Handle potential nested response structure
    let isValid = false;

    if (response.data.status === "success" && response.data.data) {
      isValid = response.data.data.valid === true;
    } else {
      isValid = response.data.valid === true;
    }

    if (isValid) {
      console.log("✅ Checkout session is valid");
      return true;
    } else {
      console.log("⚠️ Checkout session is invalid, creating new session");
      return await createNewCheckoutSession(addressData);
    }
  } catch (error) {
    console.error("❌ Error verifying checkout session:", error);
    return await createNewCheckoutSession(addressData);
  }
};

/**
 * Create a new checkout session
 */
const createNewCheckoutSession = async (addressData: any): Promise<boolean> => {
  try {
    // Get cart items
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Format cart items for the API
    const formattedItems = cartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create request body
    const requestBody = {
      items: formattedItems,
      shippingAddress: addressData,
    };

    // Get auth token if available
    const authToken = localStorage.getItem("authToken");

    // Make API request to create checkout session
    const response = await axios.post(
      `${API_URL}/checkout/create-session`,
      requestBody,
      {
        headers: authToken
          ? { Authorization: `Bearer ${authToken}` }
          : undefined,
      }
    );

    console.log("API response for new session:", response.data);

    if (response.status === 200) {
      // Extract values using the helper function
      const { clientSecret, orderId } = extractResponseData(response.data);

      // Store in localStorage
      if (clientSecret) {
        localStorage.setItem("checkoutClientSecret", clientSecret);
        console.log("New client secret stored in localStorage");
      } else {
        console.error("No client secret found in the response");
        return false;
      }

      if (orderId) {
        localStorage.setItem("checkoutOrderId", orderId);
        console.log("New order ID stored in localStorage");
      } else {
        console.error("No order ID found in the response");
        return false;
      }

      return true;
    } else {
      console.error("Invalid response from checkout API");
      return false;
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return false;
  }
};

/**
 * Debug the current checkout state
 */
export const debugCheckoutState = () => {
  const clientSecret = localStorage.getItem("checkoutClientSecret");
  const orderId = localStorage.getItem("checkoutOrderId");
  const cartItems = localStorage.getItem("cartItems");
  const addressData = localStorage.getItem("checkoutAddressData");

  console.log("=== CHECKOUT DEBUG INFO ===");
  console.log(
    "Client Secret:",
    clientSecret ? `${clientSecret.substring(0, 10)}...` : "null"
  );
  console.log("Order ID:", orderId);
  console.log(
    "Cart Items:",
    cartItems ? JSON.parse(cartItems).length + " items" : "none"
  );
  console.log("Address Data:", addressData ? "exists" : "none");

  // Check if we have valid data
  const hasValidData =
    clientSecret && orderId && cartItems && cartItems !== "[]";
  console.log("Has Valid Checkout Data:", hasValidData);

  return {
    hasClientSecret: !!clientSecret,
    hasOrderId: !!orderId,
    hasCartItems: !!(cartItems && cartItems !== "[]"),
    hasAddressData: !!addressData,
    isValid: hasValidData,
  };
};

/**
 * Clear all checkout data - useful when debugging or when checkout is stuck
 */
export const clearCheckoutData = () => {
  localStorage.removeItem("checkoutClientSecret");
  localStorage.removeItem("checkoutOrderId");

  console.log("Checkout data cleared");
  return true;
};
