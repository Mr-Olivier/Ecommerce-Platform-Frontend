import { useState, useCallback } from "react";
import axios from "axios";
import { Order } from "../components/customer-dashboard/OrderHistory";

// Define proper interfaces for the API responses
interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

// Note: This should match the enum in your backend
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface ApiOrder {
  id: string;
  userId: string;
  totalAmount: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface OrdersResponse {
  status: string;
  data: {
    orders: ApiOrder[];
  };
}

interface OrderResponse {
  status: string;
  data: {
    order: ApiOrder;
  };
}

export function useOrder() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get auth token
  const getAuthToken = () => {
    return (
      localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
    );
  };

  // Helper function to map API order to frontend Order format
  const mapApiOrderToOrder = (apiOrder: ApiOrder): Order => {
    return {
      id: apiOrder.id,
      orderNumber: apiOrder.id.substring(0, 8),
      date: apiOrder.createdAt,
      status: apiOrder.status,
      total: parseFloat(apiOrder.totalAmount),
      items: apiOrder.items.map((item) => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        image:
          item.product.images && item.product.images.length > 0
            ? item.product.images[0].startsWith("/")
              ? `http://localhost:4000${item.product.images[0]}`
              : item.product.images[0]
            : "https://via.placeholder.com/100",
      })),
      createdAt: apiOrder.createdAt,
      updatedAt: apiOrder.updatedAt,
      totalAmount: apiOrder.totalAmount,
    };
  };

  // Fetch all orders for the current user
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication required");
      }

      // Make the actual API call to get user's orders
      const response = await axios.get<OrdersResponse>(
        "http://localhost:4000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Map API orders to our frontend format
      const mappedOrders = response.data.data.orders.map(mapApiOrderToOrder);
      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch only recent orders (e.g., for the dashboard)
  const fetchRecentOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication required");
      }

      // Make the API call with limit parameter
      const response = await axios.get<OrdersResponse>(
        "http://localhost:4000/api/orders?limit=3",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Map API orders to our frontend format
      const mappedOrders = response.data.data.orders.map(mapApiOrderToOrder);
      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error fetching recent orders:", err);
      setError("Failed to fetch recent orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single order by ID
  const fetchOrderById = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Authentication required");
      }

      // Get the specific order
      const response = await axios.get<OrderResponse>(
        `http://localhost:4000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Map API order to our frontend format
      return mapApiOrderToOrder(response.data.data.order);
    } catch (err: any) {
      console.error(`Error fetching order ${orderId}:`, err);

      if (err.response?.status === 404) {
        setError("Order not found");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view this order");
      } else {
        setError("Failed to fetch order details. Please try again later.");
      }

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel an order
  const cancelOrder = useCallback(
    async (orderId: string) => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("Authentication required");
        }

        // Call the cancel endpoint
        await axios.patch(
          `http://localhost:4000/api/orders/${orderId}/cancel`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Update the local orders state
        if (orders) {
          const updatedOrders = orders.map((order) =>
            order.id === orderId
              ? { ...order, status: "CANCELLED" as OrderStatus }
              : order
          );
          setOrders(updatedOrders);
        }

        return true;
      } catch (err: any) {
        console.error(`Error cancelling order ${orderId}:`, err);

        if (err.response?.status === 400) {
          setError("Only pending orders can be cancelled");
        } else if (err.response?.status === 403) {
          setError("You don't have permission to cancel this order");
        } else if (err.response?.status === 404) {
          setError("Order not found");
        } else {
          setError(
            err.response?.data?.message ||
              "Failed to cancel order. Please try again later."
          );
        }

        return false;
      } finally {
        setLoading(false);
      }
    },
    [orders]
  );

  // Track an order - this would need a proper API endpoint
  const trackOrder = useCallback(
    async (orderId: string) => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("Authentication required");
        }

        // For now, just fetch the order details
        const order = await fetchOrderById(orderId);

        if (!order) {
          throw new Error("Order not found");
        }

        // Make sure createdAt exists and is a string before using it
        const createdAtDate = order.createdAt
          ? new Date(order.createdAt)
          : new Date();

        // This is a placeholder - in a real app, you would have a tracking API
        // Generate tracking data based on order status
        const trackingData = {
          trackingNumber:
            "TRK" + Math.floor(10000000 + Math.random() * 90000000),
          carrier: "Your Shipping Provider",
          events: [
            {
              date: order.createdAt || order.date,
              status: "Order Placed",
              location: "Online",
            },
          ],
          estimatedDelivery: new Date(
            createdAtDate.getTime() + 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          deliveredOn:
            order.status === "DELIVERED" ? order.updatedAt || null : null,
        };

        // Add more events based on status
        if (order.status !== "PENDING") {
          trackingData.events.push({
            date: new Date(
              createdAtDate.getTime() + 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "Processing",
            location: "Warehouse",
          });
        }

        if (order.status === "SHIPPED" || order.status === "DELIVERED") {
          trackingData.events.push({
            date: new Date(
              createdAtDate.getTime() + 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "Shipped",
            location: "Distribution Center",
          });
        }

        if (order.status === "DELIVERED") {
          trackingData.events.push({
            date: new Date(
              createdAtDate.getTime() + 4 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "Out for Delivery",
            location: "Local Carrier Facility",
          });

          trackingData.events.push({
            date: order.updatedAt || order.date,
            status: "Delivered",
            location: "Delivery Address",
          });
        }

        return trackingData;
      } catch (err) {
        console.error(`Error tracking order ${orderId}:`, err);
        setError(
          "Failed to retrieve tracking information. Please try again later."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchOrderById]
  );

  // This is a placeholder - you would need a real return API endpoint
  const returnOrderItems = useCallback(
    async (orderId: string, itemIds: string[], reason: string) => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("Authentication required");
        }

        // This would be a real API call in a production app
        // For now, we'll simulate a successful return request
        await new Promise((resolve) => setTimeout(resolve, 900));

        return {
          success: true,
          returnReferenceNumber: `RET-${Math.floor(
            100000 + Math.random() * 900000
          )}`,
          message: `Return request submitted successfully. Reason: ${reason}`,
          returnReason: reason,
          items: itemIds,
          itemCount: itemIds.length,
        };
      } catch (err) {
        console.error(`Error returning items for order ${orderId}:`, err);
        setError("Failed to submit return request. Please try again later.");
        return {
          success: false,
          returnReferenceNumber: null,
          message: "Failed to submit return request",
          returnReason: reason,
          items: [],
          itemCount: itemIds.length,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchRecentOrders,
    fetchOrderById,
    trackOrder,
    cancelOrder,
    returnOrderItems,
  };
}
