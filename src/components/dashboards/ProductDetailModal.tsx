import React, { useState } from "react";
import { Edit, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "../common/Modal";
import { Product } from "../../types/Product";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onEdit,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  // Combine main image and additional images for the carousel
  const allImages = [
    product.image,
    ...(product.gallery || []),
    ...(product.images || []),
  ].filter(Boolean) as string[];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  // Format specifications for display
  const displaySpecifications = () => {
    if (!product.specifications) return null;

    // Handle both array of objects and record formats
    if (Array.isArray(product.specifications)) {
      return product.specifications.map((spec, index) => (
        <div key={index} className="flex border-b border-gray-100 py-1 text-sm">
          <p className="font-medium text-gray-700 flex-1">{spec.key}</p>
          <p className="text-gray-600 flex-1">{spec.value}</p>
        </div>
      ));
    } else {
      return Object.entries(product.specifications).map(
        ([key, value], index) => (
          <div
            key={index}
            className="flex border-b border-gray-100 py-1 text-sm"
          >
            <p className="font-medium text-gray-700 flex-1">{key}</p>
            <p className="text-gray-600 flex-1">{value}</p>
          </div>
        )
      );
    }
  };

  // Get brand name from brand object or string
  const getBrandName = () => {
    if (!product.brand) return null;

    return typeof product.brand === "string"
      ? product.brand
      : product.brand.name;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Product Details: ${product.name}`}
    >
      <div className="max-h-[70vh] overflow-y-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            {allImages.length > 0 ? (
              <div className="relative rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
                <img
                  src={allImages[activeImageIndex]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                      <div className="bg-white bg-opacity-70 px-2 py-1 rounded-full">
                        <p className="text-xs text-gray-800">
                          {activeImageIndex + 1} / {allImages.length}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-lg bg-gray-100 h-64 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}

            {allImages.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-16 w-16 rounded-md overflow-hidden border-2 ${
                      index === activeImageIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  {getBrandName() && (
                    <p className="text-sm text-gray-500">
                      Brand: {getBrandName()}
                    </p>
                  )}
                </div>
                {product.status && (
                  <span
                    className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : product.status === "draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status === "active"
                      ? "Active"
                      : product.status === "draft"
                      ? "Draft"
                      : "Out of Stock"}
                  </span>
                )}
              </div>

              <div className="mt-2">
                <p className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                  {product.originalPrice && (
                    <span className="ml-2 text-base text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </p>
              </div>

              {/* Ratings */}
              {product.rating && (
                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${
                          star <= product.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-7.07 3.716 1.35-7.865L.7 7.26l7.895-1.149L10 0l2.405 6.111L20.3 7.26l-5.58 5.176 1.35 7.865z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating} (
                    {product.reviews || product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-b py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-sm font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p
                    className={`text-sm font-medium ${
                      product.stock <= 10 ? "text-red-600" : ""
                    }`}
                  >
                    {product.stock} units
                  </p>
                </div>
                {product.sku && (
                  <div>
                    <p className="text-sm text-gray-500">SKU</p>
                    <p className="text-sm font-medium">{product.sku}</p>
                  </div>
                )}
                {product.modelNumber && (
                  <div>
                    <p className="text-sm text-gray-500">Model Number</p>
                    <p className="text-sm font-medium">{product.modelNumber}</p>
                  </div>
                )}
                {product.warranty && (
                  <div>
                    <p className="text-sm text-gray-500">Warranty</p>
                    <p className="text-sm font-medium">{product.warranty}</p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-sm font-medium">{product.weight} kg</p>
                  </div>
                )}
              </div>
            </div>

            {product.shortDescription && (
              <div>
                <p className="text-sm text-gray-500">Short Description</p>
                <p className="text-sm">{product.shortDescription}</p>
              </div>
            )}

            {product.description && (
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {product.specifications && (
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Technical Specifications
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {displaySpecifications()}
                </div>
              </div>
            )}

            {product.tags && product.tags.length > 0 && (
              <div>
                <p className="text-sm text-gray-500">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 inline mr-1" />
            Edit Product
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
