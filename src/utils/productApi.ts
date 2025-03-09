// src/utils/productApi.ts
import { api } from "./api";
import { Product, ProductFormData, ProductResponse } from "../types/Product";

// Fetch products with optional filtering and pagination
export const fetchProducts = async (
  page = 1,
  limit = 10,
  filters = {}
): Promise<ProductResponse> => {
  try {
    const response = await api.get("/products", {
      params: {
        page,
        limit,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty response for now, in production would throw or handle error
    return { products: [], total: 0, page, limit };
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// Create a new product
export const createProduct = async (
  productData: ProductFormData
): Promise<Product | null> => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

// Update an existing product
export const updateProduct = async (
  id: string,
  productData: Partial<ProductFormData>
): Promise<Product | null> => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    return null;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return false;
  }
};

// Mock data for local development and testing
export const getMockProducts = (): Product[] => [
  {
    id: "PROD-1001",
    name: "MacBook Pro 16-inch M2",
    category: "Laptops",
    price: 2499.99,
    originalPrice: 2699.99,
    stock: 35,
    status: "active" as ProductStatus,
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15",
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip — the most powerful and efficient chip ever in a pro laptop — and up to 22 hours of battery life, MacBook Pro takes on demanding tasks while delivering all-day battery life.",
    shortDescription: "Apple's most powerful laptop with the M2 Pro chip",
    sku: "APP-MBP16-M2P",
    image: "/images/macbook-pro-16.jpg",
    rating: 4.9,
    reviews: 128,
    specifications: {
      Processor: "Apple M2 Pro (10-core CPU)",
      Memory: "16GB unified memory",
      Storage: "512GB SSD",
      Display: "16-inch Liquid Retina XDR display",
      Graphics: "16-core GPU",
      "Battery Life": "Up to 22 hours",
    },
    brand: {
      id: "brand-apple",
      name: "Apple",
      slug: "apple",
    },
    modelNumber: "MPGY3LL/A",
    warranty: "1 Year Limited Warranty",
    weight: 2.15,
    dimensions: {
      length: 35.57,
      width: 24.81,
      height: 1.68,
      unit: "cm",
    },
    isFeatured: true,
    onSale: true,
    tags: ["Apple", "Laptop", "M2", "macOS", "Pro"],
  },
  {
    id: "PROD-1002",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    price: 1199.99,
    stock: 50,
    status: "active" as ProductStatus,
    createdAt: "2024-02-18",
    updatedAt: "2024-02-18",
    description:
      "Meet Galaxy S24 Ultra. With the best Galaxy processor yet and a dedicated ProVisual Engine, you can create, edit and share stunning content from anywhere. Galaxy AI takes your photos further, helps you send messages in other languages and puts a knowledgeable assistant in your pocket.",
    shortDescription: "Samsung's flagship phone with Galaxy AI",
    sku: "SAM-GS24U-256",
    image: "/images/galaxy-s24-ultra.jpg",
    rating: 4.7,
    reviews: 95,
    specifications: {
      Processor: "Snapdragon 8 Gen 3",
      Memory: "12GB RAM",
      Storage: "256GB",
      Display: "6.8-inch Dynamic AMOLED 2X",
      Camera: "200MP main + 50MP + 12MP + 10MP",
      Battery: "5000mAh",
    },
    brand: {
      id: "brand-samsung",
      name: "Samsung",
      slug: "samsung",
    },
    modelNumber: "SM-S928",
    warranty: "1 Year Manufacturer Warranty",
    weight: 0.232,
    isFeatured: true,
    tags: ["Samsung", "Smartphone", "Android", "5G", "AI"],
  },
  {
    id: "PROD-1003",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 349.99,
    stock: 75,
    status: "active" as ProductStatus,
    createdAt: "2024-02-12",
    updatedAt: "2024-02-12",
    description:
      "Industry-leading noise cancelation, exceptional sound quality, and a newly designed comfortable lightweight build. Experience unprecedented quiet with our best noise cancelation ever thanks to two processors and eight microphones.",
    shortDescription: "Sony's premium wireless noise-canceling headphones",
    sku: "SON-WH1000XM5",
    image: "/images/sony-wh1000xm5.jpg",
    rating: 4.8,
    reviews: 210,
    specifications: {
      "Battery Life": "Up to 30 hours",
      Connectivity: "Bluetooth 5.2, 3.5mm",
      Charging: "USB-C, Fast Charging",
      "Noise Cancellation": "Active with 8 microphones",
      Weight: "250g",
    },
    brand: {
      id: "brand-sony",
      name: "Sony",
      slug: "sony",
    },
    modelNumber: "WH-1000XM5",
    warranty: "1 Year Warranty",
    weight: 0.25,
    tags: ["Sony", "Headphones", "Noise-Canceling", "Wireless", "Audio"],
  },
  {
    id: "PROD-1004",
    name: "iPad Pro 12.9-inch M2",
    category: "Tablets",
    price: 1099.99,
    stock: 42,
    status: "active" as ProductStatus,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
    description:
      "The ultimate iPad experience with the blazing-fast M2 chip, 12.9-inch Liquid Retina XDR display, and support for Apple Pencil hover. Supercharged by the Apple M2 chip, iPad Pro has amazing graphics and performance.",
    shortDescription: "Apple's most powerful tablet with M2 chip",
    sku: "APP-IPADPRO-12-M2",
    image: "/images/ipad-pro-m2.jpg",
    rating: 4.9,
    reviews: 87,
    specifications: {
      Processor: "Apple M2 chip",
      Display: "12.9-inch Liquid Retina XDR",
      Storage: "256GB",
      Camera: "12MP Wide, 10MP Ultra Wide",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
    },
    brand: {
      id: "brand-apple",
      name: "Apple",
      slug: "apple",
    },
    modelNumber: "MNXR3LL/A",
    warranty: "1 Year Limited Warranty",
    weight: 0.682,
    tags: ["Apple", "iPad", "Tablet", "M2", "Pro"],
  },
  {
    id: "PROD-1005",
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1899.99,
    originalPrice: 2099.99,
    stock: 28,
    status: "active" as ProductStatus,
    createdAt: "2024-02-05",
    updatedAt: "2024-02-05",
    description:
      "Featuring 13th Gen Intel Core processors, NVIDIA RTX graphics and a stunning 15.6-inch OLED display. The XPS 15 combines power and beauty in a premium aluminum chassis.",
    shortDescription: "Dell's premium powerhouse laptop with OLED display",
    sku: "DEL-XPS15-9530",
    image: "/images/dell-xps-15.jpg",
    rating: 4.7,
    reviews: 112,
    specifications: {
      Processor: "Intel Core i9-13900H",
      Memory: "32GB DDR5",
      Storage: "1TB SSD",
      Display: "15.6-inch 3.5K OLED Touch",
      Graphics: "NVIDIA GeForce RTX 4070",
      "Battery Life": "Up to 12 hours",
    },
    brand: {
      id: "brand-dell",
      name: "Dell",
      slug: "dell",
    },
    modelNumber: "XPS 15 9530",
    warranty: "1 Year Premium Support",
    weight: 1.92,
    onSale: true,
    tags: ["Dell", "Laptop", "Windows", "Intel", "OLED"],
  },
];

// Function to create a blank product template with default values
export const createBlankProduct = (): ProductFormData => ({
  name: "",
  category: "",
  price: 0,
  stock: 0,
  rating: 0,
  reviews: 0,
  status: "draft" as ProductStatus,
  description: "",
  shortDescription: "",
  image: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sku: "",
  tags: [],
});
