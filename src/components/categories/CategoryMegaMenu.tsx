// src/components/categories/CategoryMegaMenu.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  subCategories?: Category[];
}

interface FeaturedCategory {
  name: string;
  slug: string;
  imageUrl: string;
}

const CategoryMegaMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Featured categories for the right side of the mega menu
  const featuredCategories: FeaturedCategory[] = [
    {
      name: "New Arrivals",
      slug: "new-arrivals",
      imageUrl: "/assets/images/categories/new-arrivals.jpg",
    },
    {
      name: "Best Sellers",
      slug: "best-sellers",
      imageUrl: "/assets/images/categories/best-sellers.jpg",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories for mega menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <span className="mr-1">Categories</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-50 mt-1 w-screen max-w-7xl bg-white shadow-lg rounded-lg border border-gray-200"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid grid-cols-4 gap-6 p-6">
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {categories.slice(0, 6).map((category) => (
                    <div key={category.id} className="space-y-2">
                      <Link
                        to={`/products/category/${category.slug}`}
                        className="text-gray-800 font-medium hover:text-blue-600 block"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                      <ul className="space-y-1">
                        {category.subCategories
                          ?.slice(0, 5)
                          .map((subCategory) => (
                            <li key={subCategory.id}>
                              <Link
                                to={`/products/category/${category.slug}/${subCategory.slug}`}
                                className="text-sm text-gray-600 hover:text-blue-600 block pl-2 border-l border-gray-200"
                                onClick={() => setIsOpen(false)}
                              >
                                {subCategory.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="col-span-1 space-y-4">
              <h4 className="font-medium text-gray-800 mb-2">Featured</h4>
              {featuredCategories.map((featured, index) => (
                <Link
                  key={index}
                  to={`/products/category/${featured.slug}`}
                  className="block group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative h-24 rounded-lg overflow-hidden mb-1">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <img
                      src={featured.imageUrl}
                      alt={featured.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                      onLoad={(e) =>
                        (
                          e.target as HTMLElement
                        ).parentElement?.classList.remove(
                          "bg-gray-200",
                          "animate-pulse"
                        )
                      }
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    {featured.name}
                  </span>
                </Link>
              ))}

              <div className="pt-2 border-t border-gray-200 mt-4">
                <Link
                  to="/categories"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  View All Categories
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMegaMenu;
