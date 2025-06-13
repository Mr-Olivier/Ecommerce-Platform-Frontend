// // // // src/context/CartContext.tsx
// // // import React, {
// // //   createContext,
// // //   useContext,
// // //   useReducer,
// // //   useEffect,
// // //   useState,
// // // } from "react";
// // // import axios from "axios";
// // // import { Cart, CartItem } from "../types/Cart";

// // // // API BASE URL
// // // const API_BASE_URL = "http://localhost:4000/api";

// // // interface CartState {
// // //   cart: Cart;
// // //   isOpen: boolean;
// // //   isLoading: boolean;
// // //   error: string | null;
// // //   requiresAuth: boolean; // Flag to indicate login modal should show
// // // }

// // // type CartAction =
// // //   | { type: "ADD_ITEM"; payload: CartItem }
// // //   | { type: "REMOVE_ITEM"; payload: string }
// // //   | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
// // //   | { type: "CLEAR_CART" }
// // //   | { type: "TOGGLE_CART" }
// // //   | { type: "SET_CART"; payload: Cart }
// // //   | { type: "SET_LOADING"; payload: boolean }
// // //   | { type: "SET_ERROR"; payload: string | null }
// // //   | { type: "SET_REQUIRES_AUTH"; payload: boolean };

// // // // Define the context type
// // // interface CartContextType {
// // //   state: CartState;
// // //   dispatch: React.Dispatch<CartAction>;
// // // }

// // // const initialState: CartState = {
// // //   cart: {
// // //     items: [],
// // //     subtotal: 0,
// // //     tax: 0,
// // //     shipping: 0,
// // //     total: 0,
// // //   },
// // //   isOpen: false,
// // //   isLoading: false,
// // //   error: null,
// // //   requiresAuth: false,
// // // };

// // // const calculateCartTotals = (items: CartItem[]) => {
// // //   const subtotal = items.reduce(
// // //     (sum, item) => sum + item.price * item.quantity,
// // //     0
// // //   );
// // //   const tax = subtotal * 0.1; // 10% tax rate
// // //   const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
// // //   const total = subtotal + tax + shipping;

// // //   return { subtotal, tax, shipping, total };
// // // };

// // // const cartReducer = (state: CartState, action: CartAction): CartState => {
// // //   switch (action.type) {
// // //     case "SET_LOADING":
// // //       return {
// // //         ...state,
// // //         isLoading: action.payload,
// // //       };

// // //     case "SET_ERROR":
// // //       return {
// // //         ...state,
// // //         error: action.payload,
// // //       };

// // //     case "SET_CART":
// // //       return {
// // //         ...state,
// // //         cart: action.payload,
// // //       };

// // //     case "SET_REQUIRES_AUTH":
// // //       return {
// // //         ...state,
// // //         requiresAuth: action.payload,
// // //       };

// // //     case "ADD_ITEM": {
// // //       const existingItemIndex = state.cart.items.findIndex(
// // //         (item) => item.productId === action.payload.productId
// // //       );

// // //       let updatedItems: CartItem[];
// // //       if (existingItemIndex >= 0) {
// // //         updatedItems = state.cart.items.map((item, index) =>
// // //           index === existingItemIndex
// // //             ? { ...item, quantity: item.quantity + action.payload.quantity }
// // //             : item
// // //         );
// // //       } else {
// // //         updatedItems = [...state.cart.items, action.payload];
// // //       }

// // //       return {
// // //         ...state,
// // //         cart: {
// // //           items: updatedItems,
// // //           ...calculateCartTotals(updatedItems),
// // //         },
// // //       };
// // //     }

// // //     case "REMOVE_ITEM": {
// // //       const updatedItems = state.cart.items.filter(
// // //         (item) => item.id !== action.payload
// // //       );
// // //       return {
// // //         ...state,
// // //         cart: {
// // //           items: updatedItems,
// // //           ...calculateCartTotals(updatedItems),
// // //         },
// // //       };
// // //     }

// // //     case "UPDATE_QUANTITY": {
// // //       const updatedItems = state.cart.items.map((item) =>
// // //         item.id === action.payload.id
// // //           ? {
// // //               ...item,
// // //               quantity: Math.max(
// // //                 0,
// // //                 Math.min(action.payload.quantity, item.stockQuantity)
// // //               ),
// // //             }
// // //           : item
// // //       );
// // //       return {
// // //         ...state,
// // //         cart: {
// // //           items: updatedItems,
// // //           ...calculateCartTotals(updatedItems),
// // //         },
// // //       };
// // //     }

// // //     case "CLEAR_CART":
// // //       return {
// // //         ...state,
// // //         cart: initialState.cart,
// // //       };

// // //     case "TOGGLE_CART":
// // //       return {
// // //         ...state,
// // //         isOpen: !state.isOpen,
// // //       };

// // //     default:
// // //       return state;
// // //   }
// // // };

// // // // Helper functions for authentication
// // // const getAuthToken = () => {
// // //   return localStorage.getItem("token");
// // // };

// // // const createAuthHeaders = () => {
// // //   const token = getAuthToken();
// // //   return {
// // //     headers: {
// // //       Authorization: `Bearer ${token}`,
// // //     },
// // //   };
// // // };

// // // const isUserAuthenticated = () => {
// // //   return !!getAuthToken();
// // // };

// // // // Export the context with proper typing
// // // export const CartContext = createContext<CartContextType | null>(null);

// // // export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
// // //   children,
// // // }) => {
// // //   const [state, dispatch] = useReducer(cartReducer, initialState);
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// // //   // Check authentication status on load and listen for changes
// // //   useEffect(() => {
// // //     const checkAuth = () => {
// // //       const token = localStorage.getItem("token");
// // //       setIsAuthenticated(!!token);
// // //     };

// // //     // Initial check
// // //     checkAuth();

// // //     // Listen for auth state changes
// // //     const handleAuthChange = () => {
// // //       checkAuth();
// // //     };

// // //     window.addEventListener("auth-state-changed", handleAuthChange);

// // //     return () => {
// // //       window.removeEventListener("auth-state-changed", handleAuthChange);
// // //     };
// // //   }, []);

// // //   // Fetch cart from API when authenticated
// // //   useEffect(() => {
// // //     if (isAuthenticated) {
// // //       fetchCartFromAPI();
// // //     } else {
// // //       // When logged out, reset cart to empty
// // //       dispatch({
// // //         type: "SET_CART",
// // //         payload: {
// // //           items: [],
// // //           subtotal: 0,
// // //           tax: 0,
// // //           shipping: 0,
// // //           total: 0,
// // //         },
// // //       });
// // //     }
// // //   }, [isAuthenticated]);

// // //   // Fetch cart data from API
// // //   const fetchCartFromAPI = async () => {
// // //     if (!isAuthenticated) return;

// // //     dispatch({ type: "SET_LOADING", payload: true });
// // //     dispatch({ type: "SET_ERROR", payload: null });

// // //     try {
// // //       const response = await axios.get(
// // //         `${API_BASE_URL}/cart`,
// // //         createAuthHeaders()
// // //       );

// // //       if (response.data.status === "success") {
// // //         const apiCart = response.data.data.cart;

// // //         // Transform API cart to match our cart structure
// // //         const transformedItems = apiCart.items.map((item: any) => ({
// // //           id: item.id,
// // //           productId: item.productId,
// // //           name: item.product.name,
// // //           price: parseFloat(item.product.price),
// // //           quantity: item.quantity,
// // //           image:
// // //             item.product.images && item.product.images.length > 0
// // //               ? item.product.images[0]
// // //               : "/placeholder-image.jpg",
// // //           stockQuantity: 10, // Default if not provided
// // //           attributes: {},
// // //         }));

// // //         // Calculate totals using our existing function
// // //         const cartTotals = calculateCartTotals(transformedItems);

// // //         dispatch({
// // //           type: "SET_CART",
// // //           payload: {
// // //             items: transformedItems,
// // //             ...cartTotals,
// // //           },
// // //         });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching cart:", error);
// // //       dispatch({ type: "SET_ERROR", payload: "Failed to load cart" });
// // //     } finally {
// // //       dispatch({ type: "SET_LOADING", payload: false });
// // //     }
// // //   };

// // //   return (
// // //     <CartContext.Provider value={{ state, dispatch }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   );
// // // };

// // // // Custom hook for using cart context with strict authentication
// // // export const useCart = () => {
// // //   const context = useContext(CartContext);
// // //   if (!context) {
// // //     throw new Error("useCart must be used within a CartProvider");
// // //   }

// // //   const { state, dispatch } = context;

// // //   // Add to cart - requires authentication
// // //   const addItem = async (item: CartItem) => {
// // //     // Check if authenticated first
// // //     if (!isUserAuthenticated()) {
// // //       // Signal that authentication is required
// // //       dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       return false;
// // //     }

// // //     dispatch({ type: "SET_LOADING", payload: true });
// // //     dispatch({ type: "SET_ERROR", payload: null });

// // //     try {
// // //       const response = await axios.post(
// // //         `${API_BASE_URL}/cart/items`,
// // //         {
// // //           productId: item.productId,
// // //           quantity: item.quantity,
// // //         },
// // //         createAuthHeaders()
// // //       );

// // //       if (response.data.status === "success") {
// // //         // Fetch the updated cart to ensure we have the latest state
// // //         await fetchCartFromAPI();
// // //         return true;
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to add item to cart" });
// // //         return false;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error adding to cart:", error);

// // //       // Check if error is authentication related
// // //       if (axios.isAxiosError(error) && error.response?.status === 401) {
// // //         dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to add item to cart" });
// // //       }

// // //       return false;
// // //     } finally {
// // //       dispatch({ type: "SET_LOADING", payload: false });
// // //     }
// // //   };

// // //   // Update quantity - requires authentication
// // //   const updateQuantity = async (itemId: string, quantity: number) => {
// // //     if (!isUserAuthenticated()) {
// // //       dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       return false;
// // //     }

// // //     dispatch({ type: "SET_LOADING", payload: true });
// // //     dispatch({ type: "SET_ERROR", payload: null });

// // //     try {
// // //       const response = await axios.put(
// // //         `${API_BASE_URL}/cart/items/${itemId}`,
// // //         { quantity },
// // //         createAuthHeaders()
// // //       );

// // //       if (response.data.status === "success") {
// // //         // Update the cart with the response data
// // //         await fetchCartFromAPI();
// // //         return true;
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
// // //         return false;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating quantity:", error);

// // //       if (axios.isAxiosError(error) && error.response?.status === 401) {
// // //         dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
// // //       }

// // //       return false;
// // //     } finally {
// // //       dispatch({ type: "SET_LOADING", payload: false });
// // //     }
// // //   };

// // //   // Remove item - requires authentication
// // //   const removeItem = async (itemId: string) => {
// // //     if (!isUserAuthenticated()) {
// // //       dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       return false;
// // //     }

// // //     dispatch({ type: "SET_LOADING", payload: true });
// // //     dispatch({ type: "SET_ERROR", payload: null });

// // //     try {
// // //       const response = await axios.delete(
// // //         `${API_BASE_URL}/cart/items/${itemId}`,
// // //         createAuthHeaders()
// // //       );

// // //       if (response.data.status === "success") {
// // //         // Update cart with response data
// // //         await fetchCartFromAPI();
// // //         return true;
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
// // //         return false;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error removing item:", error);

// // //       if (axios.isAxiosError(error) && error.response?.status === 401) {
// // //         dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
// // //       }

// // //       return false;
// // //     } finally {
// // //       dispatch({ type: "SET_LOADING", payload: false });
// // //     }
// // //   };

// // //   // Clear cart - requires authentication
// // //   const clearCart = async () => {
// // //     if (!isUserAuthenticated()) {
// // //       dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       return false;
// // //     }

// // //     dispatch({ type: "SET_LOADING", payload: true });
// // //     dispatch({ type: "SET_ERROR", payload: null });

// // //     try {
// // //       const response = await axios.delete(
// // //         `${API_BASE_URL}/cart`,
// // //         createAuthHeaders()
// // //       );

// // //       if (response.data.status === "success") {
// // //         dispatch({
// // //           type: "SET_CART",
// // //           payload: {
// // //             items: [],
// // //             subtotal: 0,
// // //             tax: 0,
// // //             shipping: 0,
// // //             total: 0,
// // //           },
// // //         });
// // //         return true;
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" });
// // //         return false;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error clearing cart:", error);

// // //       if (axios.isAxiosError(error) && error.response?.status === 401) {
// // //         dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" });
// // //       }

// // //       return false;
// // //     } finally {
// // //       dispatch({ type: "SET_LOADING", payload: false });
// // //     }
// // //   };

// // //   // Function to fetch cart directly from API
// // //   const fetchCartFromAPI = async () => {
// // //     if (!isUserAuthenticated()) {
// // //       dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       return false;
// // //     }

// // //     dispatch({ type: "SET_LOADING", payload: true });
// // //     dispatch({ type: "SET_ERROR", payload: null });

// // //     try {
// // //       const response = await axios.get(
// // //         `${API_BASE_URL}/cart`,
// // //         createAuthHeaders()
// // //       );

// // //       if (response.data.status === "success") {
// // //         const apiCart = response.data.data.cart;

// // //         // Transform API cart to match our cart structure
// // //         const transformedItems = apiCart.items.map((item: any) => ({
// // //           id: item.id,
// // //           productId: item.productId,
// // //           name: item.product.name,
// // //           price: parseFloat(item.product.price),
// // //           quantity: item.quantity,
// // //           image:
// // //             item.product.images && item.product.images.length > 0
// // //               ? item.product.images[0]
// // //               : "/placeholder-image.jpg",
// // //           stockQuantity: 10, // Default if not provided
// // //           attributes: {},
// // //         }));

// // //         // Calculate totals using our existing function
// // //         const cartTotals = calculateCartTotals(transformedItems);

// // //         dispatch({
// // //           type: "SET_CART",
// // //           payload: {
// // //             items: transformedItems,
// // //             ...cartTotals,
// // //           },
// // //         });

// // //         return true;
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
// // //         return false;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching cart:", error);

// // //       if (axios.isAxiosError(error) && error.response?.status === 401) {
// // //         dispatch({ type: "SET_REQUIRES_AUTH", payload: true });
// // //       } else {
// // //         dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
// // //       }

// // //       return false;
// // //     } finally {
// // //       dispatch({ type: "SET_LOADING", payload: false });
// // //     }
// // //   };

// // //   // Clear the requires auth flag
// // //   const clearAuthRequirement = () => {
// // //     dispatch({ type: "SET_REQUIRES_AUTH", payload: false });
// // //   };

// // //   return {
// // //     cart: state.cart,
// // //     isOpen: state.isOpen,
// // //     isLoading: state.isLoading,
// // //     error: state.error,
// // //     requiresAuth: state.requiresAuth,
// // //     addItem,
// // //     removeItem,
// // //     updateQuantity,
// // //     clearCart,
// // //     toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
// // //     refreshCart: fetchCartFromAPI,
// // //     clearAuthRequirement,
// // //   };
// // // };

// // // src/context/CartContext.tsx
// // import React, {
// //   createContext,
// //   useContext,
// //   useReducer,
// //   useEffect,
// //   useState,
// // } from "react";
// // import axios from "axios";
// // import { Cart, CartItem } from "../types/Cart";

// // // API BASE URL
// // const API_BASE_URL = "http://localhost:4000/api";

// // interface CartState {
// //   cart: Cart;
// //   isOpen: boolean;
// //   isLoading: boolean;
// //   error: string | null;
// // }

// // type CartAction =
// //   | { type: "ADD_ITEM"; payload: CartItem }
// //   | { type: "REMOVE_ITEM"; payload: string }
// //   | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
// //   | { type: "CLEAR_CART" }
// //   | { type: "TOGGLE_CART" }
// //   | { type: "SET_CART"; payload: Cart }
// //   | { type: "SET_LOADING"; payload: boolean }
// //   | { type: "SET_ERROR"; payload: string | null };

// // // Define the context type
// // interface CartContextType {
// //   state: CartState;
// //   dispatch: React.Dispatch<CartAction>;
// // }

// // const initialState: CartState = {
// //   cart: {
// //     items: [],
// //     subtotal: 0,
// //     tax: 0,
// //     shipping: 0,
// //     total: 0,
// //   },
// //   isOpen: false,
// //   isLoading: false,
// //   error: null,
// // };

// // const calculateCartTotals = (items: CartItem[]) => {
// //   const subtotal = items.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );
// //   const tax = subtotal * 0.1; // 10% tax rate
// //   const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
// //   const total = subtotal + tax + shipping;

// //   return { subtotal, tax, shipping, total };
// // };

// // const cartReducer = (state: CartState, action: CartAction): CartState => {
// //   switch (action.type) {
// //     case "SET_LOADING":
// //       return {
// //         ...state,
// //         isLoading: action.payload,
// //       };

// //     case "SET_ERROR":
// //       return {
// //         ...state,
// //         error: action.payload,
// //       };

// //     case "SET_CART":
// //       return {
// //         ...state,
// //         cart: action.payload,
// //       };

// //     case "ADD_ITEM": {
// //       const existingItemIndex = state.cart.items.findIndex(
// //         (item) => item.productId === action.payload.productId
// //       );

// //       let updatedItems: CartItem[];
// //       if (existingItemIndex >= 0) {
// //         updatedItems = state.cart.items.map((item, index) =>
// //           index === existingItemIndex
// //             ? { ...item, quantity: item.quantity + action.payload.quantity }
// //             : item
// //         );
// //       } else {
// //         updatedItems = [...state.cart.items, action.payload];
// //       }

// //       const newCart = {
// //         items: updatedItems,
// //         ...calculateCartTotals(updatedItems),
// //       };

// //       // Save to localStorage for persistence
// //       localStorage.setItem("guestCart", JSON.stringify(newCart));

// //       return {
// //         ...state,
// //         cart: newCart,
// //       };
// //     }

// //     case "REMOVE_ITEM": {
// //       const updatedItems = state.cart.items.filter(
// //         (item) => item.id !== action.payload
// //       );

// //       const newCart = {
// //         items: updatedItems,
// //         ...calculateCartTotals(updatedItems),
// //       };

// //       // Save to localStorage
// //       localStorage.setItem("guestCart", JSON.stringify(newCart));

// //       return {
// //         ...state,
// //         cart: newCart,
// //       };
// //     }

// //     case "UPDATE_QUANTITY": {
// //       const updatedItems = state.cart.items.map((item) =>
// //         item.id === action.payload.id
// //           ? {
// //               ...item,
// //               quantity: Math.max(
// //                 0,
// //                 Math.min(action.payload.quantity, item.stockQuantity)
// //               ),
// //             }
// //           : item
// //       );

// //       const newCart = {
// //         items: updatedItems,
// //         ...calculateCartTotals(updatedItems),
// //       };

// //       // Save to localStorage
// //       localStorage.setItem("guestCart", JSON.stringify(newCart));

// //       return {
// //         ...state,
// //         cart: newCart,
// //       };
// //     }

// //     case "CLEAR_CART":
// //       // Clear localStorage
// //       localStorage.removeItem("guestCart");

// //       return {
// //         ...state,
// //         cart: initialState.cart,
// //       };

// //     case "TOGGLE_CART":
// //       return {
// //         ...state,
// //         isOpen: !state.isOpen,
// //       };

// //     default:
// //       return state;
// //   }
// // };

// // // Helper functions for authentication
// // const getAuthToken = () => {
// //   return localStorage.getItem("token");
// // };

// // const createAuthHeaders = () => {
// //   const token = getAuthToken();
// //   return token
// //     ? {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     : {};
// // };

// // const isUserAuthenticated = () => {
// //   return !!getAuthToken();
// // };

// // // Export the context with proper typing
// // export const CartContext = createContext<CartContextType | null>(null);

// // export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => {
// //   const [state, dispatch] = useReducer(cartReducer, initialState);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   // Check authentication status on load and listen for changes
// //   useEffect(() => {
// //     const checkAuth = () => {
// //       const token = localStorage.getItem("token");
// //       setIsAuthenticated(!!token);
// //     };

// //     // Initial check
// //     checkAuth();

// //     // Listen for auth state changes
// //     const handleAuthChange = () => {
// //       checkAuth();
// //     };

// //     window.addEventListener("auth-state-changed", handleAuthChange);

// //     return () => {
// //       window.removeEventListener("auth-state-changed", handleAuthChange);
// //     };
// //   }, []);

// //   // Load cart on component mount
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       // Fetch from API for authenticated users
// //       fetchCartFromAPI();
// //     } else {
// //       // Load from localStorage for guests
// //       loadGuestCartFromStorage();
// //     }
// //   }, [isAuthenticated]);

// //   // Load guest cart from localStorage
// //   const loadGuestCartFromStorage = () => {
// //     try {
// //       const savedCart = localStorage.getItem("guestCart");
// //       if (savedCart) {
// //         const parsedCart = JSON.parse(savedCart);
// //         dispatch({
// //           type: "SET_CART",
// //           payload: parsedCart,
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error loading guest cart from storage:", error);
// //     }
// //   };

// //   // Fetch cart data from API (authenticated users only)
// //   const fetchCartFromAPI = async () => {
// //     if (!isAuthenticated) return;

// //     dispatch({ type: "SET_LOADING", payload: true });
// //     dispatch({ type: "SET_ERROR", payload: null });

// //     try {
// //       const response = await axios.get(
// //         `${API_BASE_URL}/cart`,
// //         createAuthHeaders()
// //       );

// //       if (response.data.status === "success") {
// //         const apiCart = response.data.data.cart;

// //         // Transform API cart to match our cart structure
// //         const transformedItems = apiCart.items.map((item: any) => ({
// //           id: item.id,
// //           productId: item.productId,
// //           name: item.product.name,
// //           price: parseFloat(item.product.price),
// //           quantity: item.quantity,
// //           image:
// //             item.product.images && item.product.images.length > 0
// //               ? `http://localhost:4000${item.product.images[0]}`
// //               : "/placeholder-image.jpg",
// //           stockQuantity: 10, // Default if not provided
// //           attributes: {},
// //         }));

// //         // Calculate totals using our existing function
// //         const cartTotals = calculateCartTotals(transformedItems);

// //         dispatch({
// //           type: "SET_CART",
// //           payload: {
// //             items: transformedItems,
// //             ...cartTotals,
// //           },
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error fetching cart:", error);
// //       dispatch({ type: "SET_ERROR", payload: "Failed to load cart" });
// //     } finally {
// //       dispatch({ type: "SET_LOADING", payload: false });
// //     }
// //   };

// //   return (
// //     <CartContext.Provider value={{ state, dispatch }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // // Custom hook for using cart context
// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error("useCart must be used within a CartProvider");
// //   }

// //   const { state, dispatch } = context;

// //   // Fetch cart data from API (authenticated users only)
// //   const fetchCartFromAPI = async () => {
// //     if (!isUserAuthenticated()) return false;

// //     dispatch({ type: "SET_LOADING", payload: true });
// //     dispatch({ type: "SET_ERROR", payload: null });

// //     try {
// //       const response = await axios.get(
// //         `${API_BASE_URL}/cart`,
// //         createAuthHeaders()
// //       );

// //       if (response.data.status === "success") {
// //         const apiCart = response.data.data.cart;

// //         // Transform API cart to match our cart structure
// //         const transformedItems = apiCart.items.map((item: any) => ({
// //           id: item.id,
// //           productId: item.productId,
// //           name: item.product.name,
// //           price: parseFloat(item.product.price),
// //           quantity: item.quantity,
// //           image:
// //             item.product.images && item.product.images.length > 0
// //               ? `http://localhost:4000${item.product.images[0]}`
// //               : "/placeholder-image.jpg",
// //           stockQuantity: 10, // Default if not provided
// //           attributes: {},
// //         }));

// //         // Calculate totals using our existing function
// //         const cartTotals = calculateCartTotals(transformedItems);

// //         dispatch({
// //           type: "SET_CART",
// //           payload: {
// //             items: transformedItems,
// //             ...cartTotals,
// //           },
// //         });

// //         return true;
// //       } else {
// //         dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
// //         return false;
// //       }
// //     } catch (error) {
// //       console.error("Error fetching cart:", error);
// //       dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
// //       return false;
// //     } finally {
// //       dispatch({ type: "SET_LOADING", payload: false });
// //     }
// //   };

// //   // Add item to cart - simplified for direct local cart management
// //   // Note: API calls should be handled in components (like ProductDetails)
// //   // This function is now primarily for local cart management
// //   const addItem = (item: CartItem) => {
// //     console.log("CartContext: Adding item to local cart", item);
// //     dispatch({ type: "ADD_ITEM", payload: item });
// //   };

// //   // Update quantity - authenticated users only (guests handled locally)
// //   const updateQuantity = async (itemId: string, quantity: number) => {
// //     const isAuth = isUserAuthenticated();

// //     if (isAuth) {
// //       // Authenticated user - make API call
// //       dispatch({ type: "SET_LOADING", payload: true });
// //       dispatch({ type: "SET_ERROR", payload: null });

// //       try {
// //         const response = await axios.put(
// //           `${API_BASE_URL}/cart/items/${itemId}`,
// //           { quantity },
// //           createAuthHeaders()
// //         );

// //         if (response.data.status === "success") {
// //           await fetchCartFromAPI();
// //         } else {
// //           dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
// //         }
// //       } catch (error) {
// //         console.error("Error updating quantity:", error);
// //         dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
// //       } finally {
// //         dispatch({ type: "SET_LOADING", payload: false });
// //       }
// //     } else {
// //       // Guest user - update locally
// //       dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
// //     }
// //   };

// //   // Remove item - authenticated users only (guests handled locally)
// //   const removeItem = async (itemId: string) => {
// //     const isAuth = isUserAuthenticated();

// //     if (isAuth) {
// //       // Authenticated user - make API call
// //       dispatch({ type: "SET_LOADING", payload: true });
// //       dispatch({ type: "SET_ERROR", payload: null });

// //       try {
// //         const response = await axios.delete(
// //           `${API_BASE_URL}/cart/items/${itemId}`,
// //           createAuthHeaders()
// //         );

// //         if (response.data.status === "success") {
// //           await fetchCartFromAPI();
// //         } else {
// //           dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
// //         }
// //       } catch (error) {
// //         console.error("Error removing item:", error);
// //         dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
// //       } finally {
// //         dispatch({ type: "SET_LOADING", payload: false });
// //       }
// //     } else {
// //       // Guest user - remove locally
// //       dispatch({ type: "REMOVE_ITEM", payload: itemId });
// //     }
// //   };

// //   // Clear cart
// //   const clearCart = async () => {
// //     const isAuth = isUserAuthenticated();

// //     if (isAuth) {
// //       // Authenticated user - make API call
// //       dispatch({ type: "SET_LOADING", payload: true });
// //       dispatch({ type: "SET_ERROR", payload: null });

// //       try {
// //         const response = await axios.delete(
// //           `${API_BASE_URL}/cart`,
// //           createAuthHeaders()
// //         );

// //         if (response.data.status === "success") {
// //           dispatch({ type: "CLEAR_CART" });
// //         } else {
// //           dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" });
// //         }
// //       } catch (error) {
// //         console.error("Error clearing cart:", error);
// //         dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" });
// //       } finally {
// //         dispatch({ type: "SET_LOADING", payload: false });
// //       }
// //     } else {
// //       // Guest user - clear locally
// //       dispatch({ type: "CLEAR_CART" });
// //     }
// //   };

// //   // Sync guest cart to server after login
// //   const syncGuestCart = async () => {
// //     if (!isUserAuthenticated() || state.cart.items.length === 0) return false;

// //     dispatch({ type: "SET_LOADING", payload: true });
// //     dispatch({ type: "SET_ERROR", payload: null });

// //     try {
// //       const guestCartItems = state.cart.items.map((item) => ({
// //         productId: item.productId,
// //         quantity: item.quantity,
// //       }));

// //       const response = await axios.post(
// //         `${API_BASE_URL}/cart/sync`,
// //         { guestCartItems },
// //         createAuthHeaders()
// //       );

// //       if (response.data.status === "success") {
// //         // Clear guest cart from localStorage
// //         localStorage.removeItem("guestCart");

// //         // Fetch updated cart from server
// //         await fetchCartFromAPI();
// //         return true;
// //       } else {
// //         dispatch({ type: "SET_ERROR", payload: "Failed to sync guest cart" });
// //         return false;
// //       }
// //     } catch (error) {
// //       console.error("Error syncing guest cart:", error);
// //       dispatch({ type: "SET_ERROR", payload: "Failed to sync guest cart" });
// //       return false;
// //     } finally {
// //       dispatch({ type: "SET_LOADING", payload: false });
// //     }
// //   };

// //   return {
// //     cart: state.cart,
// //     isOpen: state.isOpen,
// //     isLoading: state.isLoading,
// //     error: state.error,
// //     addItem,
// //     removeItem,
// //     updateQuantity,
// //     clearCart,
// //     toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
// //     refreshCart: fetchCartFromAPI,
// //     syncGuestCart,
// //   };
// // };

// // src/context/CartContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useReducer,
//   useEffect,
//   useState,
// } from "react";
// import axios from "axios";
// import { Cart, CartItem } from "../types/Cart";

// // API BASE URL
// const API_BASE_URL = "http://localhost:4000/api";

// interface CartState {
//   cart: Cart;
//   isOpen: boolean;
//   isLoading: boolean;
//   error: string | null;
// }

// type CartAction =
//   | { type: "ADD_ITEM"; payload: CartItem }
//   | { type: "REMOVE_ITEM"; payload: string }
//   | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
//   | { type: "CLEAR_CART" }
//   | { type: "TOGGLE_CART" }
//   | { type: "SET_CART"; payload: Cart }
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_ERROR"; payload: string | null };

// // Define the context type
// interface CartContextType {
//   state: CartState;
//   dispatch: React.Dispatch<CartAction>;
// }

// const initialState: CartState = {
//   cart: {
//     items: [],
//     subtotal: 0,
//     tax: 0,
//     shipping: 0,
//     total: 0,
//   },
//   isOpen: false,
//   isLoading: false,
//   error: null,
// };

// const calculateCartTotals = (items: CartItem[]) => {
//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const tax = subtotal * 0.1; // 10% tax rate
//   const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
//   const total = subtotal + tax + shipping;

//   return { subtotal, tax, shipping, total };
// };

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case "SET_LOADING":
//       return {
//         ...state,
//         isLoading: action.payload,
//       };

//     case "SET_ERROR":
//       return {
//         ...state,
//         error: action.payload,
//       };

//     case "SET_CART":
//       return {
//         ...state,
//         cart: action.payload,
//       };

//     case "ADD_ITEM": {
//       const existingItemIndex = state.cart.items.findIndex(
//         (item) => item.productId === action.payload.productId
//       );

//       let updatedItems: CartItem[];
//       if (existingItemIndex >= 0) {
//         updatedItems = state.cart.items.map((item, index) =>
//           index === existingItemIndex
//             ? { ...item, quantity: item.quantity + action.payload.quantity }
//             : item
//         );
//       } else {
//         updatedItems = [...state.cart.items, action.payload];
//       }

//       const newCart = {
//         items: updatedItems,
//         ...calculateCartTotals(updatedItems),
//       };

//       // Save to localStorage for persistence
//       localStorage.setItem("guestCart", JSON.stringify(newCart));

//       return {
//         ...state,
//         cart: newCart,
//       };
//     }

//     case "REMOVE_ITEM": {
//       const updatedItems = state.cart.items.filter(
//         (item) => item.id !== action.payload
//       );

//       const newCart = {
//         items: updatedItems,
//         ...calculateCartTotals(updatedItems),
//       };

//       // Save to localStorage
//       localStorage.setItem("guestCart", JSON.stringify(newCart));

//       return {
//         ...state,
//         cart: newCart,
//       };
//     }

//     case "UPDATE_QUANTITY": {
//       const updatedItems = state.cart.items.map((item) =>
//         item.id === action.payload.id
//           ? {
//               ...item,
//               quantity: Math.max(
//                 0,
//                 Math.min(action.payload.quantity, item.stockQuantity)
//               ),
//             }
//           : item
//       );

//       const newCart = {
//         items: updatedItems,
//         ...calculateCartTotals(updatedItems),
//       };

//       // Save to localStorage
//       localStorage.setItem("guestCart", JSON.stringify(newCart));

//       return {
//         ...state,
//         cart: newCart,
//       };
//     }

//     case "CLEAR_CART":
//       // Clear localStorage
//       localStorage.removeItem("guestCart");

//       return {
//         ...state,
//         cart: initialState.cart,
//       };

//     case "TOGGLE_CART":
//       return {
//         ...state,
//         isOpen: !state.isOpen,
//       };

//     default:
//       return state;
//   }
// };

// // Helper functions for authentication
// const getAuthToken = () => {
//   return localStorage.getItem("token");
// };

// const createAuthHeaders = () => {
//   const token = getAuthToken();
//   return token
//     ? {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     : {};
// };

// const isUserAuthenticated = () => {
//   return !!getAuthToken();
// };

// // Export the context with proper typing
// export const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication status on load and listen for changes
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       setIsAuthenticated(!!token);
//     };

//     // Initial check
//     checkAuth();

//     // Listen for auth state changes
//     const handleAuthChange = () => {
//       checkAuth();
//     };

//     window.addEventListener("auth-state-changed", handleAuthChange);

//     return () => {
//       window.removeEventListener("auth-state-changed", handleAuthChange);
//     };
//   }, []);

//   // Load cart on component mount
//   useEffect(() => {
//     if (isAuthenticated) {
//       // Fetch from API for authenticated users
//       fetchCartFromAPI();
//     } else {
//       // Load from localStorage for guests
//       loadGuestCartFromStorage();
//     }
//   }, [isAuthenticated]);

//   // Load guest cart from localStorage
//   const loadGuestCartFromStorage = () => {
//     try {
//       const savedCart = localStorage.getItem("guestCart");
//       if (savedCart) {
//         const parsedCart = JSON.parse(savedCart);
//         dispatch({
//           type: "SET_CART",
//           payload: parsedCart,
//         });
//       }
//     } catch (error) {
//       console.error("Error loading guest cart from storage:", error);
//     }
//   };

//   // Fetch cart data from API (authenticated users only)
//   const fetchCartFromAPI = async () => {
//     if (!isAuthenticated) return;

//     dispatch({ type: "SET_LOADING", payload: true });
//     dispatch({ type: "SET_ERROR", payload: null });

//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/cart`,
//         createAuthHeaders()
//       );

//       if (response.data.status === "success") {
//         const apiCart = response.data.data.cart;

//         // Transform API cart to match our cart structure
//         const transformedItems = apiCart.items.map((item: any) => ({
//           id: item.id,
//           productId: item.productId,
//           name: item.product.name,
//           price: parseFloat(item.product.price),
//           quantity: item.quantity,
//           image:
//             item.product.images && item.product.images.length > 0
//               ? `http://localhost:4000${item.product.images[0]}`
//               : "/placeholder-image.jpg",
//           stockQuantity: 10, // Default if not provided
//           attributes: {},
//         }));

//         // Calculate totals using our existing function
//         const cartTotals = calculateCartTotals(transformedItems);

//         dispatch({
//           type: "SET_CART",
//           payload: {
//             items: transformedItems,
//             ...cartTotals,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to load cart" });
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook for using cart context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }

//   const { state, dispatch } = context;

//   // Fetch cart data from API (authenticated users only)
//   const fetchCartFromAPI = async () => {
//     if (!isUserAuthenticated()) return false;

//     dispatch({ type: "SET_LOADING", payload: true });
//     dispatch({ type: "SET_ERROR", payload: null });

//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/cart`,
//         createAuthHeaders()
//       );

//       if (response.data.status === "success") {
//         const apiCart = response.data.data.cart;

//         // Transform API cart to match our cart structure
//         const transformedItems = apiCart.items.map((item: any) => ({
//           id: item.id,
//           productId: item.productId,
//           name: item.product.name,
//           price: parseFloat(item.product.price),
//           quantity: item.quantity,
//           image:
//             item.product.images && item.product.images.length > 0
//               ? `http://localhost:4000${item.product.images[0]}`
//               : "/placeholder-image.jpg",
//           stockQuantity: 10, // Default if not provided
//           attributes: {},
//         }));

//         // Calculate totals using our existing function
//         const cartTotals = calculateCartTotals(transformedItems);

//         dispatch({
//           type: "SET_CART",
//           payload: {
//             items: transformedItems,
//             ...cartTotals,
//           },
//         });

//         return true;
//       } else {
//         dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
//         return false;
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
//       return false;
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   // Add item to cart - simplified for direct local cart management
//   // Note: API calls should be handled in components (like ProductDetails)
//   // This function is now primarily for local cart management
//   const addItem = (item: CartItem) => {
//     console.log("CartContext: Adding item to local cart", item);
//     dispatch({ type: "ADD_ITEM", payload: item });
//   };

//   // Update quantity - works for both authenticated users and guests
//   const updateQuantity = async (itemId: string, quantity: number) => {
//     const isAuth = isUserAuthenticated();

//     if (isAuth) {
//       // Authenticated user - make API call
//       dispatch({ type: "SET_LOADING", payload: true });
//       dispatch({ type: "SET_ERROR", payload: null });

//       try {
//         console.log("Updating quantity via API:", itemId, quantity);
//         const response = await axios.put(
//           `${API_BASE_URL}/cart/items/${itemId}`,
//           { quantity },
//           createAuthHeaders()
//         );

//         if (response.data.status === "success") {
//           console.log("Quantity updated successfully, refreshing cart");
//           await fetchCartFromAPI();
//           return true;
//         } else {
//           dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
//           return false;
//         }
//       } catch (error) {
//         console.error("Error updating quantity:", error);

//         // Check if it's an auth error
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           console.log("Auth error, falling back to local update");
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           dispatch({
//             type: "UPDATE_QUANTITY",
//             payload: { id: itemId, quantity },
//           });
//         } else {
//           dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
//         }
//         return false;
//       } finally {
//         dispatch({ type: "SET_LOADING", payload: false });
//       }
//     } else {
//       // Guest user - update locally
//       console.log("Updating quantity locally:", itemId, quantity);
//       dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
//       return true;
//     }
//   };

//   // Remove item - works for both authenticated users and guests
//   const removeItem = async (itemId: string) => {
//     const isAuth = isUserAuthenticated();

//     if (isAuth) {
//       // Authenticated user - make API call
//       dispatch({ type: "SET_LOADING", payload: true });
//       dispatch({ type: "SET_ERROR", payload: null });

//       try {
//         console.log("Removing item via API:", itemId);
//         const response = await axios.delete(
//           `${API_BASE_URL}/cart/items/${itemId}`,
//           createAuthHeaders()
//         );

//         if (response.data.status === "success") {
//           console.log("Item removed successfully, refreshing cart");
//           await fetchCartFromAPI();
//           return true;
//         } else {
//           dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
//           return false;
//         }
//       } catch (error) {
//         console.error("Error removing item:", error);

//         // Check if it's an auth error
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           console.log("Auth error, falling back to local removal");
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           dispatch({ type: "REMOVE_ITEM", payload: itemId });
//         } else {
//           dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
//         }
//         return false;
//       } finally {
//         dispatch({ type: "SET_LOADING", payload: false });
//       }
//     } else {
//       // Guest user - remove locally
//       console.log("Removing item locally:", itemId);
//       dispatch({ type: "REMOVE_ITEM", payload: itemId });
//       return true;
//     }
//   };

//   // Clear cart - works for both authenticated users and guests
//   const clearCart = async () => {
//     const isAuth = isUserAuthenticated();

//     if (isAuth) {
//       // Authenticated user - make API call
//       dispatch({ type: "SET_LOADING", payload: true });
//       dispatch({ type: "SET_ERROR", payload: null });

//       try {
//         console.log("Clearing cart via API");
//         const response = await axios.delete(
//           `${API_BASE_URL}/cart`,
//           createAuthHeaders()
//         );

//         if (response.data.status === "success") {
//           console.log("Cart cleared successfully");
//           dispatch({ type: "CLEAR_CART" });
//           return true;
//         } else {
//           dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" });
//           return false;
//         }
//       } catch (error) {
//         console.error("Error clearing cart:", error);

//         // Check if it's an auth error
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           console.log("Auth error, falling back to local clear");
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           dispatch({ type: "CLEAR_CART" });
//         } else {
//           dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" });
//         }
//         return false;
//       } finally {
//         dispatch({ type: "SET_LOADING", payload: false });
//       }
//     } else {
//       // Guest user - clear locally
//       console.log("Clearing cart locally");
//       dispatch({ type: "CLEAR_CART" });
//       return true;
//     }
//   };

//   // Sync guest cart to server after login
//   const syncGuestCart = async () => {
//     if (!isUserAuthenticated() || state.cart.items.length === 0) return false;

//     dispatch({ type: "SET_LOADING", payload: true });
//     dispatch({ type: "SET_ERROR", payload: null });

//     try {
//       const guestCartItems = state.cart.items.map((item) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//       }));

//       const response = await axios.post(
//         `${API_BASE_URL}/cart/sync`,
//         { guestCartItems },
//         createAuthHeaders()
//       );

//       if (response.data.status === "success") {
//         // Clear guest cart from localStorage
//         localStorage.removeItem("guestCart");

//         // Fetch updated cart from server
//         await fetchCartFromAPI();
//         return true;
//       } else {
//         dispatch({ type: "SET_ERROR", payload: "Failed to sync guest cart" });
//         return false;
//       }
//     } catch (error) {
//       console.error("Error syncing guest cart:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to sync guest cart" });
//       return false;
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   return {
//     cart: state.cart,
//     isOpen: state.isOpen,
//     isLoading: state.isLoading,
//     error: state.error,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
//     refreshCart: fetchCartFromAPI,
//     syncGuestCart,
//   };
// };

// src/context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Cart, CartItem } from "../types/Cart";

// API BASE URL
const API_BASE_URL = "http://localhost:4000/api";

interface CartState {
  cart: Cart;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART"; payload: Cart }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

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
  isLoading: false,
  error: null,
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
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };

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

      const newCart = {
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };

      // Save to localStorage for persistence
      localStorage.setItem("guestCart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.cart.items.filter(
        (item) => item.id !== action.payload
      );

      const newCart = {
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };

      // Save to localStorage
      localStorage.setItem("guestCart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
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

      const newCart = {
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };

      // Save to localStorage
      localStorage.setItem("guestCart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
      };
    }

    case "CLEAR_CART":
      // Clear localStorage
      localStorage.removeItem("guestCart");

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

// Helper functions for authentication
const getAuthToken = () => {
  return localStorage.getItem("token");
};

const createAuthHeaders = () => {
  const token = getAuthToken();
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

const isUserAuthenticated = () => {
  return !!getAuthToken();
};

// Export the context with proper typing
export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on load and listen for changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Initial check
    checkAuth();

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("auth-state-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, []);

  // Load cart on component mount
  useEffect(() => {
    if (isAuthenticated) {
      // Fetch from API for authenticated users
      fetchCartFromAPI();
    } else {
      // Load from localStorage for guests
      loadGuestCartFromStorage();
    }
  }, [isAuthenticated]);

  // Load guest cart from localStorage
  const loadGuestCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem("guestCart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({
          type: "SET_CART",
          payload: parsedCart,
        });
      }
    } catch (error) {
      console.error("Error loading guest cart from storage:", error);
    }
  };

  // Fetch cart data from API (authenticated users only)
  const fetchCartFromAPI = async () => {
    if (!isAuthenticated) return;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/cart`,
        createAuthHeaders()
      );

      if (response.data.status === "success") {
        const apiCart = response.data.data.cart;

        // Transform API cart to match our cart structure
        const transformedItems = apiCart.items.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          price: parseFloat(item.product.price),
          quantity: item.quantity,
          image:
            item.product.images && item.product.images.length > 0
              ? `http://localhost:4000${item.product.images[0]}`
              : "/placeholder-image.jpg",
          stockQuantity: 10, // Default if not provided
          attributes: {},
        }));

        // Calculate totals using our existing function
        const cartTotals = calculateCartTotals(transformedItems);

        dispatch({
          type: "SET_CART",
          payload: {
            items: transformedItems,
            ...cartTotals,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load cart" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

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

  // Fetch cart data from API (authenticated users only)
  const fetchCartFromAPI = async () => {
    if (!isUserAuthenticated()) return false;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/cart`,
        createAuthHeaders()
      );

      if (response.data.status === "success") {
        const apiCart = response.data.data.cart;

        // Transform API cart to match our cart structure
        const transformedItems = apiCart.items.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          price: parseFloat(item.product.price),
          quantity: item.quantity,
          image:
            item.product.images && item.product.images.length > 0
              ? `http://localhost:4000${item.product.images[0]}`
              : "/placeholder-image.jpg",
          stockQuantity: 10, // Default if not provided
          attributes: {},
        }));

        // Calculate totals using our existing function
        const cartTotals = calculateCartTotals(transformedItems);

        dispatch({
          type: "SET_CART",
          payload: {
            items: transformedItems,
            ...cartTotals,
          },
        });

        return true;
      } else {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
        return false;
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart" });
      return false;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Add item to cart - simplified for direct local cart management
  // Note: API calls should be handled in components (like ProductDetails)
  // This function is now primarily for local cart management
  const addItem = (item: CartItem) => {
    console.log("CartContext: Adding item to local cart", item);
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  // Helper function to determine if an item is a local/guest item
  const isLocalItem = (itemId: string): boolean => {
    return (
      itemId.startsWith("guest_") ||
      itemId.startsWith("temp_") ||
      itemId.startsWith("item_") ||
      itemId.startsWith("cart-")
    );
  };

  // Update quantity - smart detection of local vs API items
  const updateQuantity = async (
    itemId: string,
    quantity: number
  ): Promise<boolean> => {
    if (quantity < 1) return false;

    const isAuth = isUserAuthenticated();
    const isLocal = isLocalItem(itemId);

    console.log(
      `UpdateQuantity - ItemId: ${itemId}, Quantity: ${quantity}, Auth: ${isAuth}, Local: ${isLocal}`
    );

    // If item is local (guest ID) OR user is not authenticated, handle locally
    if (isLocal || !isAuth) {
      console.log("Updating quantity locally");
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
      return true;
    }

    // Otherwise, make API call for authenticated database items
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      console.log("Making API call to update quantity");
      const response = await axios.put(
        `${API_BASE_URL}/cart/items/${itemId}`,
        { quantity },
        createAuthHeaders()
      );

      if (response.data.status === "success") {
        console.log("API call successful, refreshing cart");
        await fetchCartFromAPI();
        return true;
      } else {
        console.error("API call failed:", response.data.message);
        dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" });
        return false;
      }
    } catch (error) {
      console.error("API call error:", error);

      // Fallback to local update on API error
      console.log("API failed, falling back to local update");
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
      return true;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Remove item - smart detection of local vs API items
  const removeItem = async (itemId: string): Promise<boolean> => {
    const isAuth = isUserAuthenticated();
    const isLocal = isLocalItem(itemId);

    console.log(
      `RemoveItem - ItemId: ${itemId}, Auth: ${isAuth}, Local: ${isLocal}`
    );

    // If item is local (guest ID) OR user is not authenticated, handle locally
    if (isLocal || !isAuth) {
      console.log("Removing item locally");
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
      return true;
    }

    // Otherwise, make API call for authenticated database items
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      console.log("Making API call to remove item");
      const response = await axios.delete(
        `${API_BASE_URL}/cart/items/${itemId}`,
        createAuthHeaders()
      );

      if (response.data.status === "success") {
        console.log("API call successful, refreshing cart");
        await fetchCartFromAPI();
        return true;
      } else {
        console.error("API call failed:", response.data.message);
        dispatch({ type: "SET_ERROR", payload: "Failed to remove item" });
        return false;
      }
    } catch (error) {
      console.error("API call error:", error);

      // Fallback to local removal on API error
      console.log("API failed, falling back to local removal");
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
      return true;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Clear cart - works for both authenticated users and guests
  const clearCart = async (): Promise<boolean> => {
    const isAuth = isUserAuthenticated();
    console.log(`ClearCart called - Auth: ${isAuth}`);

    // Always clear local cart first
    dispatch({ type: "CLEAR_CART" });

    if (isAuth) {
      // For authenticated users, also clear the backend cart
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        console.log("Making API call to clear cart");
        const response = await axios.delete(
          `${API_BASE_URL}/cart`,
          createAuthHeaders()
        );

        if (response.data.status === "success") {
          console.log("API call successful, cart cleared on server");
          return true;
        } else {
          console.error("API call failed:", response.data.message);
          // Don't show error to user since local cart is already cleared
          return true;
        }
      } catch (error) {
        console.error("API call error:", error);
        // Don't show error to user since local cart is already cleared
        return true;
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    return true;
  };

  // Sync guest cart to server after login
  const syncGuestCart = async () => {
    if (!isUserAuthenticated() || state.cart.items.length === 0) return false;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const guestCartItems = state.cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        `${API_BASE_URL}/cart/sync`,
        { guestCartItems },
        createAuthHeaders()
      );

      if (response.data.status === "success") {
        // Clear guest cart from localStorage
        localStorage.removeItem("guestCart");

        // Fetch updated cart from server
        await fetchCartFromAPI();
        return true;
      } else {
        dispatch({ type: "SET_ERROR", payload: "Failed to sync guest cart" });
        return false;
      }
    } catch (error) {
      console.error("Error syncing guest cart:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to sync guest cart" });
      return false;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return {
    cart: state.cart,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    error: state.error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    refreshCart: fetchCartFromAPI,
    syncGuestCart,
  };
};
