// src/hooks/useProduct.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types/Product";

// Define the product categories enum to match your backend
enum ProductCategory {
  SMARTPHONES = "SMARTPHONES",
  LAPTOPS = "LAPTOPS",
  TVS = "TVS",
  GAMING = "GAMING",
  ACCESSORIES = "ACCESSORIES",
  CAMERAS = "CAMERAS",
  AUDIO = "AUDIO",
}

export const useProduct = () => {
  const [_featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/products?limit=100"
        );

        if (response.data.status === "success") {
          const products = response.data.data.products.map((product: any) => ({
            ...product,
            // Convert string price to number for consistency
            price: parseFloat(product.price),
            originalPrice: product.originalPrice
              ? parseFloat(product.originalPrice)
              : undefined,
            // Add additional properties needed by your UI
            rating: 4.5, // Default rating
            reviews: 100, // Default review count
            isFeatured: true, // Assuming all products are featured for now
            isTopSelling: product.stock < 30, // Example logic for top selling
            isNew:
              new Date(product.createdAt) >
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // If created in last 30 days
            image: `http://localhost:4000${product.images[0]}`, // Full image URL
          }));

          setAllProducts(products);
          setFeaturedProducts(products);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get featured products
  const getFeaturedProducts = () => {
    return allProducts.filter((product) => product.isFeatured);
  };

  // Helper function to get top selling products
  const getTopSellingProducts = () => {
    return allProducts.filter((product) => product.isTopSelling);
  };

  // Helper function to get products by category
  const getProductsByCategory = (category: string) => {
    return allProducts.filter((product) => product.category === category);
  };

  // Helper function to get a product by ID
  const getProductById = (id: string) => {
    return allProducts.find((product) => product.id === id);
  };

  // Helper function to get new products
  const getNewProducts = () => {
    return allProducts.filter((product) => product.isNew);
  };

  // Helper function to get electronics products (now includes several categories)
  const getElectronicsProducts = () => {
    return allProducts.filter((product) =>
      [
        ProductCategory.SMARTPHONES,
        ProductCategory.LAPTOPS,
        ProductCategory.TVS,
        ProductCategory.GAMING,
        ProductCategory.ACCESSORIES,
        ProductCategory.CAMERAS,
        ProductCategory.AUDIO,
      ].includes(product.category as ProductCategory)
    );
  };

  return {
    featuredProducts: getFeaturedProducts(),
    topSellingProducts: getTopSellingProducts(),
    electronicsProducts: getElectronicsProducts(),
    newProducts: getNewProducts(),
    allProducts,
    loading,
    error,
    getProductsByCategory,
    getProductById,
  };
};

export default useProduct;
