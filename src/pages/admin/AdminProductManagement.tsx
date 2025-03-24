import React, { useState, useEffect, useRef } from "react";
import { Eye, Edit, Plus, X, Upload, Image } from "lucide-react";
import axios from "axios";

// Define types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number | string;
  originalPrice?: number | string;
  stock: number;
  status: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:4000";

const AdminProductManagement: React.FC = () => {
  // State for products and UI
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log(
    "ADMIN COMPONENT INIT - localStorage keys:",
    Object.keys(localStorage)
  );
  console.log(
    "ADMIN COMPONENT INIT - sessionStorage keys:",
    Object.keys(sessionStorage)
  );

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "SMARTPHONES",
    price: "",
    originalPrice: "",
    stock: 0,
    status: "ACTIVE",
    description: "",
  });
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories list
  const categories = [
    "All Categories",
    "SMARTPHONES",
    "LAPTOPS",
    "TVS",
    "AUDIO",
    "ACCESSORIES",
    "GAMING",
    "CAMERAS",
  ];

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search or category changes
  useEffect(() => {
    filterProducts();
  }, [searchQuery, filterCategory, products]);

  // Reset form data when modal opens/closes or when editing a product
  useEffect(() => {
    if (selectedProduct && isCreateModalOpen) {
      // Edit mode
      setFormData({
        name: selectedProduct.name || "",
        category: selectedProduct.category || "SMARTPHONES",
        price: selectedProduct.price?.toString() || "0",
        originalPrice: selectedProduct.originalPrice?.toString() || "",
        stock:
          typeof selectedProduct.stock === "number"
            ? selectedProduct.stock
            : parseInt(String(selectedProduct.stock) || "0"),
        status: selectedProduct.status || "ACTIVE",
        description: selectedProduct.description || "",
      });

      // Set image preview if available
      if (selectedProduct.images && selectedProduct.images.length > 0) {
        // Convert relative path to absolute
        const imagePath = selectedProduct.images[0].startsWith("http")
          ? selectedProduct.images[0]
          : `${API_URL}${selectedProduct.images[0]}`;
        setImagePreview(imagePath);
      } else {
        setImagePreview(null);
      }
    } else if (!selectedProduct && isCreateModalOpen) {
      // Create mode - reset form
      setFormData({
        name: "",
        category: "SMARTPHONES",
        price: "",
        originalPrice: "",
        stock: 0,
        status: "ACTIVE",
        description: "",
      });
      setProductImage(null);
      setImagePreview(null);
    }

    // Clear error message when modal opens/closes
    setErrorMessage(null);
  }, [selectedProduct, isCreateModalOpen]);

  // Get authorization token
  const getAuthHeaders = () => {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    console.log("AUTH TOKEN FROM STORAGE:", token);

    // Check both storage types for user data
    let userData = {};
    try {
      userData = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user") || "{}"
      );
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
    console.log("USER DATA FROM STORAGE:", userData);

    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching products from:", `${API_URL}/api/products`);
      const response = await axios.get(
        `${API_URL}/api/products?limit=10000`,
        getAuthHeaders()
      );
      console.log("API Response:", response.data);

      if (response.data && response.data.data && response.data.data.products) {
        setProducts(response.data.data.products);
        setFilteredProducts(response.data.data.products);
      } else {
        console.error("Unexpected API response format:", response.data);
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      if (error.response?.status === 401) {
        setErrorMessage("Authentication required. Please log in again.");
      }
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    if (!products.length) return;

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.id?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filterCategory === "all" ||
        filterCategory === "all categories" ||
        product.category?.toLowerCase() === filterCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProductImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.price || parseFloat(formData.price.toString()) <= 0) {
      newErrors.price = "Price must be greater than zero";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!productImage && !selectedProduct) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price.toString());

      if (formData.originalPrice) {
        formDataToSend.append(
          "originalPrice",
          formData.originalPrice.toString()
        );
      }

      formDataToSend.append("stock", formData.stock.toString());
      formDataToSend.append("status", formData.status);
      formDataToSend.append("description", formData.description);

      // Only append image if a new one is selected
      if (productImage) {
        formDataToSend.append("productImage", productImage);
      }

      console.log("Form data to send:", Object.fromEntries(formDataToSend));

      let response;

      if (selectedProduct) {
        // Update product (PUT request)
        const url = `${API_URL}/api/products/${selectedProduct.id}`;
        console.log("Updating product at:", url);

        // Include authentication headers, but with multipart/form-data content type
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            ...getAuthHeaders().headers,
          },
        };

        response = await axios.put(url, formDataToSend, config);

        console.log("Update response:", response.data);

        if (response.data && response.data.status === "success") {
          // Update product in state
          await fetchProducts(); // Refetch to get updated data
          setIsCreateModalOpen(false);
          setSelectedProduct(null);
        } else {
          throw new Error(response.data.message || "Failed to update product");
        }
      } else {
        // Create product (POST request)
        const url = `${API_URL}/api/products`;
        console.log("Creating product at:", url);

        // Include authentication headers, but with multipart/form-data content type
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            ...getAuthHeaders().headers,
          },
        };

        response = await axios.post(url, formDataToSend, config);

        console.log("Create response:", response.data);

        if (response.data && response.data.status === "success") {
          // Refetch products to include the new one
          await fetchProducts();
          setIsCreateModalOpen(false);
        } else {
          throw new Error(response.data.message || "Failed to create product");
        }
      }
    } catch (error: any) {
      console.error("Error saving product:", error);
      if (error.response?.status === 401) {
        setErrorMessage("Authentication required. Please log in again.");
      } else {
        setErrorMessage(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      setIsLoading(true);
      try {
        // Delete product (DELETE request)
        const url = `${API_URL}/api/products/${productId}`;
        console.log("Deleting product at:", url);

        const response = await axios.delete(url, getAuthHeaders());
        console.log("Delete response:", response.data);

        if (response.data && response.data.status === "success") {
          // Refetch products after successful deletion
          await fetchProducts();
        } else {
          throw new Error(response.data.message || "Failed to delete product");
        }
      } catch (error: any) {
        console.error("Error deleting product:", error);
        if (error.response?.status === 401) {
          alert("Authentication required. Please log in again.");
        } else {
          alert(
            error.response?.data?.message ||
              error.message ||
              "Failed to delete product"
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleExportProducts = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Name",
      "Category",
      "Price",
      "Original Price",
      "Stock",
      "Status",
      "Created Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map((product) =>
        [
          product.id,
          `"${product.name?.replace(/"/g, '""') || ""}"`, // Escape quotes in name
          product.category || "",
          product.price || 0,
          product.originalPrice || "",
          product.stock || 0,
          product.status || "",
          new Date(product.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `products_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auth error UI - show a message if no authentication
  if (errorMessage && errorMessage.includes("Authentication required")) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-md">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to manage products. Please log in and try
            again.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            style={{ minWidth: "150px" }}
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleExportProducts}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Products
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 py-3">
          <div className="grid grid-cols-12 gap-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">PRODUCT</div>
            <div className="col-span-2">CATEGORY</div>
            <div className="col-span-2">PRICE</div>
            <div className="col-span-1">STOCK</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-2 text-right">ACTIONS</div>
          </div>
        </div>

        {/* Table Body */}
        <div>
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500">
                No products found. Add your first product!
              </p>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`py-4 px-6 grid grid-cols-12 gap-3 items-center border-t border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {/* Product */}
                <div className="col-span-4 flex items-center">
                  <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${API_URL}${product.images[0]}`}
                        alt={product.name}
                        className="h-12 w-12 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/placeholder-image.jpg"; // Fallback image
                        }}
                      />
                    ) : (
                      <span className="text-gray-500 text-xs">No img</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {product.id}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <div className="text-sm text-gray-900">
                    {product.category}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2">
                  <div className="text-sm font-medium text-gray-900">
                    ${Number(product.price).toFixed(2)}
                  </div>
                  {product.originalPrice &&
                    Number(product.originalPrice) > 0 && (
                      <div className="text-xs text-gray-500 line-through">
                        ${Number(product.originalPrice).toFixed(2)}
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
                <div className="col-span-1">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : product.status === "DRAFT"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status === "ACTIVE"
                      ? "Active"
                      : product.status === "DRAFT"
                      ? "Draft"
                      : "Out of Stock"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 text-right space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsViewModalOpen(true);
                    }}
                    className="inline-flex items-center text-blue-600 hover:text-blue-900"
                    title="View product details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsCreateModalOpen(true);
                    }}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
                    title="Edit product"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="inline-flex items-center text-red-600 hover:text-red-900"
                    title="Delete product"
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
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Product Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => {
                if (!submitting) {
                  setIsCreateModalOpen(false);
                  setSelectedProduct(null);
                }
              }}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={() => {
                    if (!submitting) {
                      setIsCreateModalOpen(false);
                      setSelectedProduct(null);
                    }
                  }}
                  disabled={submitting}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-4 bg-red-50 border-b border-red-200">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-red-400 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 max-h-[70vh] overflow-y-auto"
              >
                <div className="space-y-4">
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={submitting}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Rest of the form fields remain the same */}
                  {/* ... */}

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={submitting}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    >
                      {categories
                        .filter((c) => c !== "All Categories")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Price and Original Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price*
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          disabled={submitting}
                          className={`block w-full pl-7 pr-3 py-2 rounded-md border ${
                            errors.price ? "border-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.price}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="originalPrice"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Original Price (Optional)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="originalPrice"
                          name="originalPrice"
                          min="0"
                          step="0.01"
                          value={formData.originalPrice}
                          onChange={handleChange}
                          disabled={submitting}
                          className="block w-full pl-7 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="If on sale"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stock and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Stock*
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.stock ? "border-red-500" : "border-gray-300"
                        } shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.stock && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={submitting}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="DRAFT">Draft</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      disabled={submitting}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Image{selectedProduct ? " (Optional)" : "*"}
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="h-24 w-24 border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Image className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          disabled={submitting}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={submitting}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </button>
                      </div>
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setSelectedProduct(null);
                    }}
                    disabled={submitting}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {submitting && (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {selectedProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {isViewModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setIsViewModalOpen(false)}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Details
                </h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {/* Product Image and Basic Info */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/3">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {selectedProduct.images &&
                        selectedProduct.images.length > 0 ? (
                          <img
                            src={`${API_URL}${selectedProduct.images[0]}`}
                            alt={selectedProduct.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/placeholder-image.jpg"; // Fallback image
                            }}
                          />
                        ) : (
                          <Image className="h-12 w-12 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedProduct.name}
                      </h2>

                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="text-sm font-medium">
                            {selectedProduct.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedProduct.status === "ACTIVE"
                                ? "bg-green-100 text-green-800"
                                : selectedProduct.status === "DRAFT"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedProduct.status === "ACTIVE"
                              ? "Active"
                              : selectedProduct.status === "DRAFT"
                              ? "Draft"
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${Number(selectedProduct.price).toFixed(2)}
                          </p>
                          {selectedProduct.originalPrice &&
                            Number(selectedProduct.originalPrice) > 0 && (
                              <p className="text-sm text-gray-500 line-through">
                                $
                                {Number(selectedProduct.originalPrice).toFixed(
                                  2
                                )}
                              </p>
                            )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Stock</p>
                          <p
                            className={`text-sm font-medium ${
                              selectedProduct.stock <= 10
                                ? "text-red-600"
                                : "text-gray-900"
                            }`}
                          >
                            {selectedProduct.stock} units
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Product ID and Dates */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Product ID</p>
                        <p className="text-sm">{selectedProduct.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm">
                          {new Date(
                            selectedProduct.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setSelectedProduct(selectedProduct);
                      setIsCreateModalOpen(true);
                    }}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
