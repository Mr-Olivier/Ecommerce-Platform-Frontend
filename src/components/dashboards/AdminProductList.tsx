// src/components/dashboards/AdminProductList.tsx
import React from "react";
import { Product } from "../../types/Product";

interface AdminProductListProps {
  products: Product[];
  isLoading: boolean;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => Promise<void>;
  currentPage: number;
  totalProducts: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: number;
}

const AdminProductList: React.FC<AdminProductListProps> = ({
  products,
  isLoading,
  onView,
  onEdit,
  onDelete,
  currentPage,
  totalProducts,
  onPageChange,
  productsPerPage,
}) => {
  // Admin product table implementation
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {isLoading ? (
        <div className="text-center py-10">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">No products found</div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500">
                          No img
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {product.sku || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${parseFloat(product.price.toString()).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status || "active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onView(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
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
                of <span className="font-medium">{totalProducts}</span> products
              </p>
            </div>
            <div>
              <nav className="flex items-center">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md mx-1 disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page numbers would go here */}

                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage * productsPerPage >= totalProducts}
                  className="px-3 py-1 border rounded-md mx-1 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductList;
