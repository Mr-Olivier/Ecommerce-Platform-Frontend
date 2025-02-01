import React, { useState } from "react";
import ProductList from "../../components/products/ProductList";
import Filters from "../../components/products/Filters";
import { useProduct } from "../../hooks/useProduct";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ProductListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { featuredProducts, loading } = useProduct();

  if (loading) return <LoadingSpinner />;

  const categories = Array.from(
    new Set(featuredProducts.map((p) => p.category))
  );
  const filteredProducts = selectedCategory
    ? featuredProducts.filter((p) => p.category === selectedCategory)
    : featuredProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <div className="w-full md:w-3/4 md:pl-8">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
