// src/pages/admin/products.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
} from "lucide-react";
import AdminLayout from "../../components/dashboards/AdminLayout";
// import Modal from "../../components/common/Modal";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
  createdAt: string;
}

const ProductManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const navigate = useNavigate();

  // Sample data - replace with real data from your API
  const products: Product[] = [
    {
      id: "1",
      name: "iPhone 13 Pro",
      category: "Electronics",
      price: 999,
      stock: 50,
      status: "active",
      createdAt: "2024-01-27",
    },
    // Add more products...
  ];

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your product catalog
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Upload className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
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
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <img
                            src="/placeholder-product.jpg"
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "draft"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/${product.id}`)
                          }
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Product Modal */}
      <Modal
        isOpen={isCreateModalOpen || !!selectedProduct}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedProduct(null);
        }}
        title={selectedProduct ? "Edit Product" : "Create New Product"}
      >
        {/* Add your product form here */}
      </Modal>
    </AdminLayout>
  );
};

export default ProductManagement;
