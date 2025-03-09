// src/components/categories/MobileCategoryMenu.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";

interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: Category[];
}

interface MobileCategoryMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileCategoryMenu: React.FC<MobileCategoryMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories for mobile menu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Categories</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ul className="space-y-1">
            <li className="mb-3">
              <Link
                to="/categories"
                className="block py-2 px-4 bg-gray-100 text-blue-600 font-medium rounded-md"
                onClick={onClose}
              >
                View All Categories
              </Link>
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between py-2">
                  <Link
                    to={`/products/category/${category.slug}`}
                    className="text-gray-800 hover:text-blue-600"
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>
                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="p-2 text-gray-500 focus:outline-none"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform ${
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
                    <ul className="ml-4 space-y-1 mb-2">
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory.id}>
                          <Link
                            to={`/products/category/${category.slug}/${subCategory.slug}`}
                            className="block py-2 text-gray-600 hover:text-blue-600 border-l border-gray-200 pl-3"
                            onClick={onClose}
                          >
                            {subCategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileCategoryMenu;
