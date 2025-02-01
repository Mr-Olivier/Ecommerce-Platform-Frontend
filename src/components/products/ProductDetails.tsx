import React from "react";
import ProductGallery from "./ProductGallery";
import RelatedProducts from "./RelatedProducts";
import ReviewSummary from "../reviews/ReviewSummary";
import { formatCurrency } from "../../utils/currency";
import { Product } from "../../types/Product";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={[product.image]} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">{formatCurrency(product.price)}</p>
          <p className="mb-4">{product.description}</p>
          <ReviewSummary
            rating={product.rating}
            reviewCount={product.reviews}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Add to Cart
          </button>
        </div>
      </div>
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductDetails;
