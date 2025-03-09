import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Product } from "../../types/Product";
import ProductList from "../../components/ProductList";
import ProductFilters from "../../components/dashboards/ProductFilters";
import ProductFormModal from "../../components/dashboards/ProductFormModal";
import ProductDetailModal from "../../components/dashboards/ProductDetailModal";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getMockProducts,
} from "../../utils/productApi";

const ProductManagement: React.FC = () => {
  // State for products and UI
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10; // Show 10 products per page in table view

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  // Electronics store categories
  const categories = [
    "All",
    "Laptops",
    "Smartphones",
    "Tablets",
    "Audio",
    "Wearables",
    "Cameras",
    "Gaming",
    "Smart Home",
    "Accessories",
    "TVs",
    "Computer Parts",
  ];

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  // Filter products when search or category changes
  useEffect(() => {
    filterProducts();
  }, [searchQuery, filterCategory, products]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // In development, we'll use mock data
      // In production, this would be replaced with the API call
      const isDevelopment = process.env.NODE_ENV === "development";

      if (isDevelopment) {
        // Use mock data for development
        const mockData = getMockProducts();
        setProducts(mockData);
        setTotalProducts(mockData.length);
        setIsLoading(false);
        return;
      }

      // For production, use the API
      const response = await fetchProducts(currentPage, productsPerPage, {
        category: filterCategory !== "all" ? filterCategory : undefined,
        search: searchQuery || undefined,
      });

      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (error) {
      console.error("Failed to load products:", error);
      // Use mock data as fallback
      const mockData = getMockProducts();
      setProducts(mockData);
      setTotalProducts(mockData.length);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.sku &&
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        filterCategory === "all" ||
        product.category.toLowerCase() === filterCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleFilter = (category: string) => {
    setFilterCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAddProduct = async (productData: any) => {
    setIsLoading(true);
    try {
      const newProduct = await createProduct(productData);
      if (newProduct) {
        setProducts((prev) => [newProduct, ...prev]);
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("There was an error creating the product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (productData: any) => {
    if (!selectedProduct) return;

    setIsLoading(true);
    try {
      const updatedProduct = await updateProduct(
        selectedProduct.id,
        productData
      );
      if (updatedProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
        );
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("There was an error updating the product. Please try again.");
    } finally {
      setIsLoading(false);
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
        const success = await deleteProduct(productId);
        if (success) {
          setProducts((prev) => prev.filter((p) => p.id !== productId));
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("There was an error deleting the product. Please try again.");
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
      "Stock",
      "Status",
      "Created",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map((product) =>
        [
          product.id,
          `"${product.name.replace(/"/g, '""')}"`, // Escape quotes in name
          product.category,
          product.price,
          product.stock,
          product.status || "active",
          product.createdAt,
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

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <ProductFilters
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        filterCategory={filterCategory}
        handleFilter={handleFilter}
        categories={categories}
        handleExportProducts={handleExportProducts}
      />

      {/* Products Table */}
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        onView={(product) => setViewProduct(product)}
        onEdit={(product) => setSelectedProduct(product)}
        onDelete={handleDeleteProduct}
        currentPage={currentPage}
        totalProducts={totalProducts}
        onPageChange={setCurrentPage}
        productsPerPage={productsPerPage}
      />

      {/* Create/Edit Product Modal */}
      <ProductFormModal
        isOpen={isCreateModalOpen || !!selectedProduct}
        product={selectedProduct}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedProduct(null);
        }}
        categories={categories.filter((c) => c !== "All")}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={!!viewProduct}
        product={viewProduct}
        onClose={() => setViewProduct(null)}
        onEdit={() => {
          setSelectedProduct(viewProduct);
          setViewProduct(null);
        }}
      />
    </div>
  );
};

export default ProductManagement;
