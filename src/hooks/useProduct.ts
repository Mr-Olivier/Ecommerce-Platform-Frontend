// src/hooks/useProduct.ts
import { useState, useEffect } from "react";
import { Product } from "../types/Product";

export const useProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = () => {
      setTimeout(() => {
        setFeaturedProducts([
          {
            id: "1",
            name: "Wireless Noise-Canceling Headphones",
            description:
              "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.",
            price: 299.99,
            image: "/images/products/headphones.jpg",
            category: "electronics",
            stock: 45,
            rating: 4.8,
            reviews: 256,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Smart Fitness Watch",
            description:
              "Advanced fitness tracker with heart rate monitoring, GPS, and 20+ sport modes.",
            price: 199.99,
            image: "/images/products/smartwatch.jpg",
            category: "electronics",
            stock: 60,
            rating: 4.6,
            reviews: 189,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Premium Coffee Maker",
            description:
              "Programmable coffee maker with built-in grinder and thermal carafe.",
            price: 159.99,
            image: "/images/products/coffeemaker.jpg",
            category: "appliances",
            stock: 30,
            rating: 4.7,
            reviews: 145,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "4",
            name: "Ergonomic Office Chair",
            description:
              "Comfortable office chair with adjustable lumbar support and breathable mesh back.",
            price: 249.99,
            image: "/images/products/chair.jpg",
            category: "furniture",
            stock: 25,
            rating: 4.5,
            reviews: 178,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "5",
            name: "4K Ultra HD Smart TV",
            description:
              "55-inch 4K smart TV with HDR and built-in streaming apps.",
            price: 699.99,
            image: "/images/products/tv.jpg",
            category: "electronics",
            stock: 15,
            rating: 4.9,
            reviews: 234,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "6",
            name: "Robot Vacuum Cleaner",
            description:
              "Smart robot vacuum with mapping technology and automatic dirt disposal.",
            price: 399.99,
            image: "/images/products/vacuum.jpg",
            category: "appliances",
            stock: 40,
            rating: 4.4,
            reviews: 167,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "7",
            name: "Professional Blender",
            description:
              "High-performance blender with variable speed control and preset programs.",
            price: 179.99,
            image: "/images/products/blender.jpg",
            category: "appliances",
            stock: 35,
            rating: 4.6,
            reviews: 198,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "8",
            name: "Mechanical Gaming Keyboard",
            description:
              "RGB mechanical keyboard with customizable keys and palm rest.",
            price: 129.99,
            image: "/images/products/keyboard.jpg",
            category: "electronics",
            stock: 50,
            rating: 4.7,
            reviews: 212,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "9",
            name: "Wireless Security Camera",
            description:
              "HD security camera with night vision and two-way audio.",
            price: 89.99,
            image: "/images/products/camera.jpg",
            category: "electronics",
            stock: 55,
            rating: 4.5,
            reviews: 156,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "10",
            name: "Portable Power Bank",
            description:
              "20000mAh high-capacity power bank with fast charging and dual USB ports. Compatible with all smartphones and tablets.",
            price: 49.99,
            image: "/images/products/powerbank.jpg",
            category: "electronics",
            stock: 75,
            rating: 4.6,
            reviews: 223,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "11",
            name: "Air Purifier",
            description:
              "Smart air purifier with HEPA filter, air quality monitor, and quiet operation. Perfect for rooms up to 400 sq ft.",
            price: 199.99,
            image: "/images/products/airpurifier.jpg",
            category: "appliances",
            stock: 28,
            rating: 4.8,
            reviews: 167,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "12",
            name: "Standing Desk",
            description:
              "Electric height-adjustable standing desk with memory settings and cable management system. Premium wood finish.",
            price: 449.99,
            image: "/images/products/standingdesk.jpg",
            category: "furniture",
            stock: 20,
            rating: 4.7,
            reviews: 142,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
        setLoading(false);
      }, 1000); // Simulate a 1-second delay
    };

    fetchProducts();
  }, []);

  return { featuredProducts, loading };
};
