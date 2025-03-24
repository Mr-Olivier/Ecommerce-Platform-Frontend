// src/components/products/ProductList.tsx
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types/Product";

interface ProductListProps {
  products: Product[];
  viewMode?: "grid" | "list";
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode = "grid",
}) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
