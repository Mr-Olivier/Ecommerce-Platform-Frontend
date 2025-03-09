import React from "react";
import { Search, Download } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  filterCategory: string;
  handleFilter: (category: string) => void;
  categories: string[];
  handleExportProducts: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  handleSearch,
  filterCategory,
  handleFilter,
  categories,
  handleExportProducts,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filterCategory}
          onChange={(e) => handleFilter(e.target.value)}
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
          <Download className="mr-2 h-5 w-5" />
          Export Products
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
