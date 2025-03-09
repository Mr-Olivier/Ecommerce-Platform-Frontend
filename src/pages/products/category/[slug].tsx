// src/pages/products/category/[slug].tsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProductList from "../../../components/products/ProductList";
import CategoryBreadcrumb from "../../../components/categories/CategoryBreadcrumb";
import CategoryFilter from "../../../components/categories/CategoryFilter";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import {
  getCategoryBySlug,
  CategoryDetails,
} from "../../../services/categoryService";
import { getProductsByCategory } from "../../../services/productService";
import { Product } from "../../../types/Product";

const CategoryPage: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const location = useLocation();
  const [category, setCategory] = useState<CategoryDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Parse query params for filters
  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get("sort") || "newest";
  const page = parseInt(queryParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);

        // Fetch category details
        const categoryData = await getCategoryBySlug(slug);
        setCategory(categoryData);

        // Fetch products in this category
        const productsData = await getProductsByCategory(slug, {
          sort: sortBy,
          page,
          limit: 12,
          // Add other filters as needed
        });

        // Convert to your Product type if needed
        const convertedProducts: Product[] = productsData.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: p.price,
          image: p.image || p.imageUrl || "",
          category: p.category || p.categories?.[0]?.name || "",
          stock: p.stock || 0,
          rating: p.rating || 0,
          reviews: p.reviewCount || p.reviews || 0,
          createdAt: p.createdAt || new Date().toISOString(),
          updatedAt: p.updatedAt || new Date().toISOString(),
        }));

        setProducts(convertedProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load category. Please try again later.");
        console.error("Error fetching category data:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [slug, sortBy, page]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!category) return <div className="p-4">Category not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{category.name} | Your E-Commerce Store</title>
        <meta name="description" content={category.description || ""} />
      </Helmet>

      <CategoryBreadcrumb items={category.breadcrumbs} />

      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">
        {category.name}
      </h1>
      {category.description && (
        <p className="text-gray-600 mb-6">{category.description}</p>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <CategoryFilter />
          {/* Filters component commented out until properly configured */}
          {/* <Filters /> */}
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
