// src/pages/categories/index.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import CategoryList from "../../components/categories/CategoryList";
import { Link } from "react-router-dom";

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Shop by Category | Your E-Commerce Store</title>
        <meta
          name="description"
          content="Browse all product categories in our store"
        />
      </Helmet>

      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">Categories</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Shop by Category</h1>
        <p className="text-gray-600 mt-2">
          Browse our wide selection of products by category to find exactly what
          you're looking for.
        </p>
      </div>

      <CategoryList />
    </div>
  );
};

export default CategoriesPage;
