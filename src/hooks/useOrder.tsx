import { useState, useCallback } from "react";
import { Order } from "../components/customer-dashboard/OrderHistory";
// import { api } from "../utils/api";

// Example mock data for development purposes
const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "10001",
    date: "2023-02-15T14:30:00Z",
    status: "Delivered",
    total: 129.99,
    items: [
      {
        id: "item-1",
        name: "Wireless Headphones",
        quantity: 1,
        price: 89.99,
        image: "https://via.placeholder.com/100",
      },
      {
        id: "item-2",
        name: "Phone Case",
        quantity: 2,
        price: 19.99,
        image: "https://via.placeholder.com/100",
      },
    ],
  },
  {
    id: "order-2",
    orderNumber: "10002",
    date: "2023-03-20T10:15:00Z",
    status: "Shipped",
    total: 249.95,
    items: [
      {
        id: "item-3",
        name: "Smart Watch",
        quantity: 1,
        price: 199.95,
        image: "https://via.placeholder.com/100",
      },
      {
        id: "item-4",
        name: "Watch Band",
        quantity: 1,
        price: 29.99,
        image: "https://via.placeholder.com/100",
      },
      {
        id: "item-5",
        name: "Screen Protector",
        quantity: 1,
        price: 19.99,
        image: "https://via.placeholder.com/100",
      },
    ],
  },
  {
    id: "order-3",
    orderNumber: "10003",
    date: "2023-04-05T16:45:00Z",
    status: "Processing",
    total: 399.99,
    items: [
      {
        id: "item-6",
        name: "Tablet",
        quantity: 1,
        price: 399.99,
        image: "https://via.placeholder.com/100",
      },
    ],
  },
  {
    id: "order-4",
    orderNumber: "10004",
    date: "2023-05-12T09:30:00Z",
    status: "Pending",
    total: 149.98,
    items: [
      {
        id: "item-7",
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 149.98,
        image: "https://via.placeholder.com/100",
      },
    ],
  },
];

export function useOrder() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders for the current user
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real application, you would make an API call here
      // For example:
      // const response = await api.get('/orders');
      // setOrders(response.data);

      // Simulating an API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOrders(mockOrders);
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
      // In a real application, you would make an API call here
      // For example:
      // const response = await api.get('/orders/recent');
      // setOrders(response.data);

      // Simulating an API call with mock data (limiting to most recent 3)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(mockOrders.slice(0, 3));
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
      // In a real application, you would make an API call here
      // For example:
      // const response = await api.get(`/orders/${orderId}`);
      // return response.data;

      // Simulating an API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 300));
      const order = mockOrders.find((order) => order.id === orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    } catch (err) {
      console.error(`Error fetching order ${orderId}:`, err);
      setError("Failed to fetch order details. Please try again later.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Track/trace an order
  const trackOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real application, you would make an API call here
      // For example:
      // const response = await api.get(`/orders/${orderId}/tracking`);
      // return response.data;

      // Simulating an API call with mock tracking data
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Find the order
      const order = mockOrders.find((order) => order.id === orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      // Generate mock tracking data based on status
      let trackingData;

      switch (order.status) {
        case "Delivered":
          trackingData = {
            trackingNumber: "TRK12345678",
            carrier: "FedEx",
            events: [
              {
                date: "2023-02-12T09:00:00Z",
                status: "Order Placed",
                location: "Online",
              },
              {
                date: "2023-02-13T10:30:00Z",
                status: "Processing",
                location: "Warehouse",
              },
              {
                date: "2023-02-14T08:15:00Z",
                status: "Shipped",
                location: "Distribution Center",
              },
              {
                date: "2023-02-15T11:45:00Z",
                status: "Out for Delivery",
                location: "Local Carrier Facility",
              },
              {
                date: "2023-02-15T14:30:00Z",
                status: "Delivered",
                location: "Front Door",
              },
            ],
            estimatedDelivery: "2023-02-15",
            deliveredOn: "2023-02-15",
          };
          break;
        case "Shipped":
          trackingData = {
            trackingNumber: "TRK87654321",
            carrier: "UPS",
            events: [
              {
                date: "2023-03-18T13:20:00Z",
                status: "Order Placed",
                location: "Online",
              },
              {
                date: "2023-03-19T09:45:00Z",
                status: "Processing",
                location: "Warehouse",
              },
              {
                date: "2023-03-20T10:15:00Z",
                status: "Shipped",
                location: "Distribution Center",
              },
            ],
            estimatedDelivery: "2023-03-23",
            deliveredOn: null,
          };
          break;
        case "Processing":
          trackingData = {
            trackingNumber: null,
            carrier: null,
            events: [
              {
                date: "2023-04-05T16:45:00Z",
                status: "Order Placed",
                location: "Online",
              },
              {
                date: "2023-04-06T11:30:00Z",
                status: "Processing",
                location: "Warehouse",
              },
            ],
            estimatedDelivery: "2023-04-10",
            deliveredOn: null,
          };
          break;
        case "Pending":
          trackingData = {
            trackingNumber: null,
            carrier: null,
            events: [
              {
                date: "2023-05-12T09:30:00Z",
                status: "Order Placed",
                location: "Online",
              },
            ],
            estimatedDelivery: "2023-05-17",
            deliveredOn: null,
          };
          break;
        default:
          trackingData = {
            trackingNumber: null,
            carrier: null,
            events: [],
            estimatedDelivery: null,
            deliveredOn: null,
          };
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
  }, []);

  // Cancel an order
  const cancelOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real application, you would make an API call here
      // For example:
      // const response = await api.post(`/orders/${orderId}/cancel`);
      // Update orders state with the updated order

      // Simulating an API call and updating local state
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Check if the order exists and can be cancelled
      const orderIndex = mockOrders.findIndex((order) => order.id === orderId);

      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      const order = mockOrders[orderIndex];

      if (order.status === "Delivered" || order.status === "Shipped") {
        throw new Error(
          "Cannot cancel an order that has already shipped or been delivered"
        );
      }

      // Update the order status in our local copy of the orders
      const updatedOrders = [...mockOrders];
      updatedOrders[orderIndex] = {
        ...order,
        status: "Cancelled",
      };

      setOrders(updatedOrders);

      return true;
    } catch (err) {
      console.error(`Error cancelling order ${orderId}:`, err);
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? (err as Error).message
          : "Failed to cancel order. Please try again later."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Return order items
  const returnOrderItems = useCallback(
    async (orderId: string, itemIds: string[], reason: string) => {
      setLoading(true);
      setError(null);

      try {
        // In a real application, you would make an API call here
        // For example:
        // const response = await api.post(`/orders/${orderId}/return`, { itemIds, reason });
        // Update orders state with the updated order

        // Simulating an API call and updating local state
        await new Promise((resolve) => setTimeout(resolve, 900));

        // Find the order
        const order = mockOrders.find((order) => order.id === orderId);
        if (!order) {
          throw new Error("Order not found");
        }

        // Find the items being returned from the order
        const returnItems = order.items
          .filter((item) => itemIds.includes(item.id))
          .map((item) => ({ id: item.id, name: item.name }));

        // In a real application, you would update the order data with return information
        // For this mock, we'll create a return reference number and include the reason and items

        return {
          success: true,
          returnReferenceNumber: `RET-${Math.floor(
            100000 + Math.random() * 900000
          )}`,
          message: `Return request submitted successfully. Reason: ${reason}`,
          returnReason: reason,
          items: returnItems,
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
