// src/types/Product.ts
export type ProductStatus = "active" | "draft" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale/discount calculations
  salePrice?: number; // Alternative for sale prices

  // Image handling
  image: string;
  imageUrl?: string; // Added for compatibility with category components
  images?: string[]; // For additional product images
  gallery?: string[]; // Alternative field for additional images

  // SEO and URL handling
  slug?: string; // For SEO-friendly URLs

  // Category information
  category: string; // Main category
  categories?: Array<{
    // Extended category information
    id: string;
    name: string;
    slug: string;
  }>;

  // Inventory information
  stock: number;
  status?: ProductStatus; // Added for inventory status indication

  // Rating and reviews
  rating: number;
  reviews: number; // Original field
  reviewCount?: number; // Alternative field name used in some components

  // Flags for special product states
  isTopSelling?: boolean; // For best-sellers section
  isNew?: boolean; // For newly added products
  isFeatured?: boolean; // For featured section
  featured?: boolean; // Alternative field name for featured products
  onSale?: boolean; // For products currently on sale

  // Additional product details
  tags?: string[];
  brand?: {
    id: string;
    name: string;
    slug: string;
  };
  specifications?: Record<string, string>;
  features?: string[];
  attributes?: Record<string, any>; // For additional product attributes

  // Additional technical details for electronics
  modelNumber?: string;
  warranty?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  shortDescription?: string; // For product listing summary
  sku?: string; // Stock keeping unit

  // Timestamps
  createdAt: string; // ISO date string for sorting by newness
  updatedAt: string; // ISO date string
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Helper types for filtering and sorting
export type ProductSortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popularity";

export interface ProductFilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
}

// Add export here to make it available to other files
export interface ProductFormData extends Omit<Product, "brand"> {
  // Other properties remain the same...
  brand: string | { id: string; name: string; slug: string };
}

// Helper type for product form data
