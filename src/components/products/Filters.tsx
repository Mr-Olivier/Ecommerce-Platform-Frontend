// src/components/products/Filters.tsx
import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface FiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Format category names for display
  const formatCategoryName = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Category
      </h3>

      <div className="relative">
        {/* Dropdown button */}
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="block truncate font-medium">
            {selectedCategory
              ? formatCategoryName(selectedCategory)
              : "All Categories"}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <ul className="py-1 max-h-60 overflow-auto">
              <li
                className={`px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedCategory === null
                    ? "bg-primary-50 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => {
                  onCategoryChange(null);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`${
                      selectedCategory === null
                        ? "font-medium text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    All Categories
                  </span>
                  {selectedCategory === null && (
                    <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  )}
                </div>
              </li>

              {categories.map((category) => (
                <li
                  key={category}
                  className={`px-4 py-2.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedCategory === category
                      ? "bg-primary-50 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`${
                        selectedCategory === category
                          ? "font-medium text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {formatCategoryName(category)}
                    </span>
                    {selectedCategory === category && (
                      <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
