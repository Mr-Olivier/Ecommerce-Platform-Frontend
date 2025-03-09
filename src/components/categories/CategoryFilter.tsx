// src/components/categories/CategoryFilter.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";

interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: Category[];
}

const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories for filter:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Extract category from URL if present
    const pathParts = location.pathname.split("/");
    const categoryIndex = pathParts.indexOf("category");

    if (categoryIndex !== -1 && pathParts[categoryIndex + 1]) {
      setSelectedCategory(pathParts[categoryIndex + 1]);
    } else {
      setSelectedCategory("");
    }
  }, [location.pathname]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/products/category/${categorySlug}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="pb-1">
            <div className="flex items-center justify-between">
              <button
                className={`text-sm hover:text-blue-600 ${
                  selectedCategory === category.slug
                    ? "font-medium text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
              </button>
              {category.subCategories && category.subCategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      expandedCategories.includes(category.id)
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
            {category.subCategories &&
              category.subCategories.length > 0 &&
              expandedCategories.includes(category.id) && (
                <div className="ml-4 mt-1 space-y-1">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      className={`block text-sm hover:text-blue-600 ${
                        selectedCategory === subCategory.slug
                          ? "font-medium text-blue-600"
                          : "text-gray-600"
                      }`}
                      onClick={() =>
                        handleCategoryClick(
                          `${category.slug}/${subCategory.slug}`
                        )
                      }
                    >
                      {subCategory.name}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => navigate("/categories")}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Categories
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
