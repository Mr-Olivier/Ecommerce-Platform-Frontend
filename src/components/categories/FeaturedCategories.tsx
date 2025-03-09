// src/components/categories/FeaturedCategories.tsx
import React, { useEffect, useState } from "react";
import {
  Category,
  getFeaturedCategories,
} from "../../services/categoryService";
import CategoryCard from "./CategoryCard";
import LoadingSpinner from "../shared/LoadingSpinner";

// Enhanced type that ensures required fields for this component
interface EnhancedCategory extends Omit<Category, "imageUrl" | "productCount"> {
  imageUrl: string; // Make it required
  productCount: number; // Make it required
}

const FeaturedCategories: React.FC = () => {
  const [categories, setCategories] = useState<EnhancedCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedCategories();

        // Map the data to ensure all required fields exist
        const enhancedData = data.map((cat) => ({
          ...cat,
          imageUrl: cat.imageUrl || "/placeholder.jpg", // Provide a default
          productCount: cat.productCount || 0,
        }));

        setCategories(enhancedData);
      } catch (error) {
        console.error("Error fetching featured categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCategories();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          <a
            href="/categories"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All Categories
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              slug={category.slug}
              imageUrl={category.imageUrl}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
