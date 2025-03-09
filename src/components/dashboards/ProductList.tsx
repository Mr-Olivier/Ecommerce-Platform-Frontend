import React from "react";
import { Eye, Edit } from "lucide-react";
import { Product } from "../../types/Product";
import LoadingSpinner from "../shared/LoadingSpinner";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  currentPage: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  productsPerPage?: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onView,
  onEdit,
  onDelete,
  currentPage,
  totalProducts,
  onPageChange,
  productsPerPage = 10,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner size="medium" color="#3498db" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-500">
          No products found. Add your first product!
        </p>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 py-3">
          <div className="grid grid-cols-12 gap-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">PRODUCT</div>
            <div className="col-span-2">CATEGORY</div>
            <div className="col-span-1">PRICE</div>
            <div className="col-span-1">STOCK</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2 text-right">ACTIONS</div>
          </div>
        </div>

        {/* Table Body */}
        <div>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`py-4 px-6 grid grid-cols-12 gap-3 items-center border-t border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Product */}
              <div className="col-span-4 flex items-center">
                <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">No img</span>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500">ID: {product.id}</div>
                </div>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <div className="text-sm text-gray-900">{product.category}</div>
                {product.brand && (
                  <div className="text-xs text-gray-500">
                    {typeof product.brand === "string"
                      ? product.brand
                      : product.brand.name}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="col-span-1">
                <div className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </div>
                {product.originalPrice && (
                  <div className="text-xs text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="col-span-1">
                <div
                  className={`text-sm ${
                    product.stock <= 10
                      ? "text-red-600 font-medium"
                      : "text-gray-900"
                  }`}
                >
                  {product.stock}
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    !product.status || product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : product.status === "draft"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {!product.status || product.status === "active"
                    ? "Active"
                    : product.status === "draft"
                    ? "Draft"
                    : "Out of Stock"}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 text-right space-x-2">
                <button
                  onClick={() => onView(product)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-900"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="inline-flex items-center text-red-600 hover:text-red-900"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-3 bg-white border-t border-gray-200 px-4 rounded-b-lg">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {Math.min(
                    (currentPage - 1) * productsPerPage + 1,
                    totalProducts
                  )}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * productsPerPage, totalProducts)}
                </span>{" "}
                of <span className="font-medium">{totalProducts}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
