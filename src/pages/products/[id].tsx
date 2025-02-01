import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/products/ProductDetails";
import { useProduct } from "../../hooks/useProduct";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { featuredProducts, loading } = useProduct();

  if (loading) return <LoadingSpinner />;

  const product = featuredProducts.find((p) => p.id === id);

  if (!product) return <div className="text-red-500">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;
