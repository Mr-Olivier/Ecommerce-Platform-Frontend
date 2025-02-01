import React from "react";
import { useProduct } from "../../hooks/useProduct";
import ProductCard from "./ProductCard";
import { Product } from "../../types/Product";

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  category,
  currentProductId,
}) => {
  const { featuredProducts } = useProduct();

  const relatedProducts = featuredProducts
    .filter(
      (product: Product) =>
        product.category === category && product.id !== currentProductId
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
