// src/components/categories/CategoryNavDropdown.tsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";

interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories?: Category[];
}

const CategoryNavDropdown: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories for dropdown:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Categories
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  to={`/products/category/${category.slug}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
                {category.subCategories &&
                  category.subCategories.length > 0 && (
                    <div className="pl-4">
                      {category.subCategories.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          to={`/products/category/${category.slug}/${subCategory.slug}`}
                          className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => setIsOpen(false)}
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
            <div className="border-t border-gray-100 my-1"></div>
            <Link
              to="/categories"
              className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              View All Categories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryNavDropdown;
