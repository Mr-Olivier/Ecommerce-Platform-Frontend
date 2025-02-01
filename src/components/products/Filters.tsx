// components/products/Filters.tsx
import React from "react";

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
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <ul>
        <li
          className={`cursor-pointer ${!selectedCategory ? "font-bold" : ""}`}
          onClick={() => onCategoryChange(null)}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer ${
              selectedCategory === category ? "font-bold" : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
