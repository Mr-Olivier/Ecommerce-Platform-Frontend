// src/services/productService.ts
import axios from "axios";
import { Product } from "../types/Product";

// Define the API base URL
export const API_BASE_URL = "https://api.your-electronics-store.com/api";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone X Pro",
    description:
      "The latest flagship smartphone with 5G and top-of-the-line camera.",
    price: 999,
    image: "/assets/images/products/smartphone-x-pro.jpg",
    imageUrl: "/assets/images/products/smartphone-x-pro.jpg", // Added for compatibility
    slug: "smartphone-x-pro",
    category: "Smartphones",
    categories: [
      { id: "1", name: "Smartphones", slug: "smartphones" },
      { id: "1-1", name: "Flagship Phones", slug: "flagship-phones" },
    ],
    stock: 50,
    rating: 4.8,
    reviews: 128,
    reviewCount: 128,
    tags: ["smartphone", "5g", "premium"],
    brand: {
      id: "1",
      name: "TechX",
      slug: "tech-x",
    },
    isNew: true,
    isFeatured: true,
    salePrice: 899,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    description:
      "True wireless earbuds with noise cancellation and long battery life.",
    price: 199,
    image: "/assets/images/products/wireless-earbuds.jpg",
    imageUrl: "/assets/images/products/wireless-earbuds.jpg", // Added for compatibility
    slug: "wireless-earbuds-pro",
    category: "Audio & Headphones",
    categories: [
      { id: "3", name: "Audio & Headphones", slug: "audio-headphones" },
      { id: "3-2", name: "Earbuds", slug: "earbuds" },
    ],
    stock: 120,
    rating: 4.6,
    reviews: 86,
    reviewCount: 86,
    tags: ["earbuds", "wireless", "audio"],
    brand: {
      id: "2",
      name: "SoundMax",
      slug: "soundmax",
    },
    isNew: true,
    isFeatured: true,
    salePrice: 159,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: 'Ultra HD Smart TV 55"',
    description: "4K Ultra HD Smart TV with HDR and built-in streaming apps.",
    price: 699,
    image: "/assets/images/products/smart-tv.jpg",
    imageUrl: "/assets/images/products/smart-tv.jpg", // Added for compatibility
    slug: "ultra-hd-smart-tv-55",
    category: "TVs & Home Entertainment",
    categories: [
      {
        id: "4",
        name: "TVs & Home Entertainment",
        slug: "tvs-home-entertainment",
      },
      { id: "4-1", name: "Smart TVs", slug: "smart-tvs" },
    ],
    stock: 30,
    rating: 4.5,
    reviews: 64,
    reviewCount: 64,
    tags: ["tv", "4k", "smart-tv"],
    brand: {
      id: "3",
      name: "VisionPlus",
      slug: "visionplus",
    },
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Get products by category slug with optional filtering and pagination
 */
export const getProductsByCategory = async (
  categorySlug: string,
  options: {
    sort?: string;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    filters?: Record<string, any>;
  } = {}
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();

    // Add options to params
    if (options.sort) params.append("sort", options.sort);
    if (options.page) params.append("page", options.page.toString());
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.minPrice)
      params.append("minPrice", options.minPrice.toString());
    if (options.maxPrice)
      params.append("maxPrice", options.maxPrice.toString());

    // Add any additional filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await axios.get(
      `${API_BASE_URL}/products/category/${categorySlug}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching products for category ${categorySlug}:`,
      error
    );

    // For demo/development purposes, return mock data when API is not available
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      // Filter mock products based on category
      return mockProducts.filter((product: Product) => {
        // Simple matching by having the category slug in the product tags or categories
        const lowerSlug = categorySlug.toLowerCase();
        const matchesCategory = product.categories?.some(
          (cat: { slug: string }) => cat.slug.toLowerCase().includes(lowerSlug)
        );
        const matchesTag = product.tags?.some((tag: string) =>
          tag.toLowerCase().includes(lowerSlug)
        );

        return matchesCategory || matchesTag;
      });
    }

    throw error;
  }
};

// Add other product-related API functions here
// e.g., getProducts, getProductById, searchProducts, etc.
