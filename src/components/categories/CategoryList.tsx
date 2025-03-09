// src/components/categories/CategoryList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category, getAllCategories } from "../../services/categoryService";
import LoadingSpinner from "../shared/LoadingSpinner";

// Enhanced type that ensures required fields for this component
interface EnhancedCategory
  extends Omit<Category, "imageUrl" | "description" | "productCount"> {
  imageUrl: string; // Make it required
  description: string; // Make it required
  productCount: number; // Make it required
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<EnhancedCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();

        // Map the data to ensure all required fields exist
        const enhancedData = data.map((cat) => ({
          ...cat,
          imageUrl: cat.imageUrl || "/placeholder-category.jpg", // Provide a default
          description: cat.description || "", // Provide a default
          productCount: cat.productCount || 0, // Provide a default
        }));

        setCategories(enhancedData);
        setError(null);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categories.map((category) => (
        <Link
          to={`/products/category/${category.slug}`}
          key={category.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
        >
          <div className="relative h-48">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-xl font-semibold text-white">
                {category.name}
              </h3>
              <p className="text-sm text-gray-200">
                {category.productCount} products
              </p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 line-clamp-2">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
