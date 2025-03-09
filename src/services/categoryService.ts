// src/services/categoryService.ts
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
  subCategories?: Category[];
}

export interface CategoryDetails extends Category {
  breadcrumbs: Array<{
    name: string;
    slug: string;
    isLast: boolean;
  }>;
  parentCategory?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface CategoryFilterParams {
  featured?: boolean;
  limit?: number;
  page?: number;
}

// API endpoints
const CATEGORIES_ENDPOINT = `${API_BASE_URL}/categories`;

/**
 * Fetch all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(CATEGORIES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Error fetching all categories:", error);

    // For demo/development purposes, return mock data when API is not available
    if (process.env.NODE_ENV === "development") {
      return mockCategories;
    }

    throw error;
  }
};

/**
 * Fetch featured categories
 */
export const getFeaturedCategories = async (
  limit: number = 6
): Promise<Category[]> => {
  try {
    const response = await axios.get(`${CATEGORIES_ENDPOINT}`, {
      params: { featured: true, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching featured categories:", error);

    // For demo/development purposes, return mock data when API is not available
    if (process.env.NODE_ENV === "development") {
      return mockCategories.slice(0, limit);
    }

    throw error;
  }
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (
  slug: string
): Promise<CategoryDetails> => {
  try {
    const response = await axios.get(`${CATEGORIES_ENDPOINT}/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);

    // For demo/development purposes, return mock data when API is not available
    if (process.env.NODE_ENV === "development") {
      const slugParts = slug.split("/");
      const mainSlug = slugParts[0];
      const subSlug = slugParts[1];

      const category = mockCategories.find((cat) => cat.slug === mainSlug);

      if (!category) throw new Error("Category not found");

      // If it's a subcategory
      if (subSlug && category.subCategories) {
        const subCategory = category.subCategories.find(
          (sub) => sub.slug === subSlug
        );

        if (subCategory) {
          return {
            ...subCategory,
            breadcrumbs: [
              {
                name: category.name,
                slug: category.slug,
                isLast: false,
              },
              {
                name: subCategory.name,
                slug: subCategory.slug,
                isLast: true,
              },
            ],
            parentCategory: {
              id: category.id,
              name: category.name,
              slug: category.slug,
            },
          };
        }
      }

      // Main category
      return {
        ...category,
        breadcrumbs: [
          {
            name: category.name,
            slug: category.slug,
            isLast: true,
          },
        ],
      };
    }

    throw error;
  }
};

/**
 * Get subcategories for a specific category
 */
export const getSubcategories = async (
  categoryId: string
): Promise<Category[]> => {
  try {
    const response = await axios.get(
      `${CATEGORIES_ENDPOINT}/${categoryId}/subcategories`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching subcategories for category ${categoryId}:`,
      error
    );

    // For demo/development purposes, use mock data
    if (process.env.NODE_ENV === "development") {
      const category = mockCategories.find((cat) => cat.id === categoryId);
      return category?.subCategories || [];
    }

    throw error;
  }
};

// Mock data for electronics store
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Smartphones & Accessories",
    slug: "smartphones-accessories",
    description:
      "Discover the latest smartphones and accessories from top brands.",
    imageUrl: "/assets/images/categories/smartphones.jpg",
    productCount: 120,
    subCategories: [
      {
        id: "1-1",
        name: "Smartphones",
        slug: "smartphones",
        productCount: 45,
        imageUrl: "/assets/images/categories/smartphones.jpg",
      },
      {
        id: "1-2",
        name: "Phone Cases",
        slug: "phone-cases",
        productCount: 38,
        imageUrl: "/assets/images/categories/phone-cases.jpg",
      },
      {
        id: "1-3",
        name: "Screen Protectors",
        slug: "screen-protectors",
        productCount: 20,
        imageUrl: "/assets/images/categories/screen-protectors.jpg",
      },
      {
        id: "1-4",
        name: "Power Banks",
        slug: "power-banks",
        productCount: 17,
        imageUrl: "/assets/images/categories/power-banks.jpg",
      },
    ],
  },
  {
    id: "2",
    name: "Computers & Tablets",
    slug: "computers-tablets",
    description:
      "Find powerful laptops, desktop PCs, and tablets for work and play.",
    imageUrl: "/assets/images/categories/computers.jpg",
    productCount: 95,
    subCategories: [
      {
        id: "2-1",
        name: "Laptops",
        slug: "laptops",
        productCount: 35,
        imageUrl: "/assets/images/categories/laptops.jpg",
      },
      {
        id: "2-2",
        name: "Desktop PCs",
        slug: "desktop-pcs",
        productCount: 22,
        imageUrl: "/assets/images/categories/desktops.jpg",
      },
      {
        id: "2-3",
        name: "Tablets",
        slug: "tablets",
        productCount: 28,
        imageUrl: "/assets/images/categories/tablets.jpg",
      },
      {
        id: "2-4",
        name: "Computer Accessories",
        slug: "computer-accessories",
        productCount: 10,
        imageUrl: "/assets/images/categories/computer-accessories.jpg",
      },
    ],
  },
  {
    id: "3",
    name: "Audio & Headphones",
    slug: "audio-headphones",
    description:
      "Immerse yourself in premium sound with our range of audio devices and headphones.",
    imageUrl: "/assets/images/categories/audio.jpg",
    productCount: 85,
    subCategories: [
      {
        id: "3-1",
        name: "Wireless Headphones",
        slug: "wireless-headphones",
        productCount: 32,
        imageUrl: "/assets/images/categories/wireless-headphones.jpg",
      },
      {
        id: "3-2",
        name: "Earbuds",
        slug: "earbuds",
        productCount: 25,
        imageUrl: "/assets/images/categories/earbuds.jpg",
      },
      {
        id: "3-3",
        name: "Speakers",
        slug: "speakers",
        productCount: 18,
        imageUrl: "/assets/images/categories/speakers.jpg",
      },
      {
        id: "3-4",
        name: "Home Audio",
        slug: "home-audio",
        productCount: 10,
        imageUrl: "/assets/images/categories/home-audio.jpg",
      },
    ],
  },
  {
    id: "4",
    name: "TVs & Home Entertainment",
    slug: "tvs-home-entertainment",
    description:
      "Transform your living room with cutting-edge TVs and home entertainment systems.",
    imageUrl: "/assets/images/categories/tvs.jpg",
    productCount: 65,
    subCategories: [
      {
        id: "4-1",
        name: "Smart TVs",
        slug: "smart-tvs",
        productCount: 28,
        imageUrl: "/assets/images/categories/smart-tvs.jpg",
      },
      {
        id: "4-2",
        name: "Streaming Devices",
        slug: "streaming-devices",
        productCount: 14,
        imageUrl: "/assets/images/categories/streaming-devices.jpg",
      },
      {
        id: "4-3",
        name: "Home Theater Systems",
        slug: "home-theater-systems",
        productCount: 12,
        imageUrl: "/assets/images/categories/home-theater.jpg",
      },
      {
        id: "4-4",
        name: "TV Accessories",
        slug: "tv-accessories",
        productCount: 11,
        imageUrl: "/assets/images/categories/tv-accessories.jpg",
      },
    ],
  },
  {
    id: "5",
    name: "Gaming & Consoles",
    slug: "gaming-consoles",
    description:
      "Level up your gaming experience with the latest consoles, games, and accessories.",
    imageUrl: "/assets/images/categories/gaming.jpg",
    productCount: 78,
    subCategories: [
      {
        id: "5-1",
        name: "Gaming Consoles",
        slug: "gaming-consoles",
        productCount: 12,
        imageUrl: "/assets/images/categories/consoles.jpg",
      },
      {
        id: "5-2",
        name: "Video Games",
        slug: "video-games",
        productCount: 40,
        imageUrl: "/assets/images/categories/video-games.jpg",
      },
      {
        id: "5-3",
        name: "Gaming Accessories",
        slug: "gaming-accessories",
        productCount: 26,
        imageUrl: "/assets/images/categories/gaming-accessories.jpg",
      },
    ],
  },
  {
    id: "6",
    name: "Cameras & Photography",
    slug: "cameras-photography",
    description:
      "Capture life's moments with high-quality cameras and photography equipment.",
    imageUrl: "/assets/images/categories/cameras.jpg",
    productCount: 45,
    subCategories: [
      {
        id: "6-1",
        name: "Digital Cameras",
        slug: "digital-cameras",
        productCount: 20,
        imageUrl: "/assets/images/categories/digital-cameras.jpg",
      },
      {
        id: "6-2",
        name: "Camera Lenses",
        slug: "camera-lenses",
        productCount: 15,
        imageUrl: "/assets/images/categories/camera-lenses.jpg",
      },
      {
        id: "6-3",
        name: "Tripods & Mounts",
        slug: "tripods-mounts",
        productCount: 10,
        imageUrl: "/assets/images/categories/tripods.jpg",
      },
    ],
  },
  {
    id: "7",
    name: "Wearable Technology",
    slug: "wearable-technology",
    description:
      "Stay connected with the latest smartwatches and fitness trackers.",
    imageUrl: "/assets/images/categories/wearables.jpg",
    productCount: 40,
    subCategories: [
      {
        id: "7-1",
        name: "Smartwatches",
        slug: "smartwatches",
        productCount: 18,
        imageUrl: "/assets/images/categories/smartwatches.jpg",
      },
      {
        id: "7-2",
        name: "Fitness Trackers",
        slug: "fitness-trackers",
        productCount: 12,
        imageUrl: "/assets/images/categories/fitness-trackers.jpg",
      },
      {
        id: "7-3",
        name: "Virtual Reality",
        slug: "virtual-reality",
        productCount: 10,
        imageUrl: "/assets/images/categories/vr.jpg",
      },
    ],
  },
  {
    id: "8",
    name: "Smart Home",
    slug: "smart-home",
    description:
      "Make your home smarter with connected devices and intelligent systems.",
    imageUrl: "/assets/images/categories/smart-home.jpg",
    productCount: 55,
    subCategories: [
      {
        id: "8-1",
        name: "Smart Speakers",
        slug: "smart-speakers",
        productCount: 15,
        imageUrl: "/assets/images/categories/smart-speakers.jpg",
      },
      {
        id: "8-2",
        name: "Smart Lighting",
        slug: "smart-lighting",
        productCount: 20,
        imageUrl: "/assets/images/categories/smart-lighting.jpg",
      },
      {
        id: "8-3",
        name: "Security Cameras",
        slug: "security-cameras",
        productCount: 12,
        imageUrl: "/assets/images/categories/security-cameras.jpg",
      },
      {
        id: "8-4",
        name: "Smart Appliances",
        slug: "smart-appliances",
        productCount: 8,
        imageUrl: "/assets/images/categories/smart-appliances.jpg",
      },
    ],
  },
];

// Export mock categories for testing and development
export { mockCategories };
