// src/components/categories/CategoryCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  productCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  slug,
  imageUrl,
  productCount,
}) => {
  return (
    <Link
      to={`/products/category/${slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={imageUrl || "/placeholder-category.jpg"}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white text-center">{name}</h3>
        </div>
      </div>
      <div className="p-3 text-center">
        <p className="text-sm text-gray-600">{productCount} products</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
