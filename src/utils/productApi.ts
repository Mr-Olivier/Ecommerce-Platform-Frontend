// src/utils/productApi.ts
import { api } from "./api";
import { Product, ProductFormData, ProductResponse } from "../types/Product";

// Define ProductStatus type since it's missing
export type ProductStatus = "active" | "draft" | "disabled" | "archived";

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

// Function to create a blank product template with default values
// src/utils/productApi.ts
export const createBlankProduct = (): ProductFormData => ({
  name: "",
  category: "",
  price: 0,
  stock: 0,
  rating: 0,
  reviews: 0,
  status: "draft" as const,
  description: "",
  shortDescription: "",
  image: "",
  sku: "",
  tags: [],
  // Add the missing required properties
  id: "", // Add this
  brand: "", // Add this
  createdAt: new Date().toISOString(), // Add this
  updatedAt: new Date().toISOString(), // Add this
});

// Add this to your productApi.ts at the end of the file
export const getMockProducts = (): Product[] => {
  return []; // Empty array so it doesn't affect your real API
};
