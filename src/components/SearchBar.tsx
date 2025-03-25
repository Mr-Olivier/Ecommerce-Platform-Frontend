// src/components/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import ProductList from "./ProductList";

// Define types for product
interface Product {
  id: string;
  name: string;
  price: string | number;
  category: string;
  images: string[];
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/products?limit=100"
        );
        if (res.data.status === "success") {
          const filtered = res.data.data.products.filter((p: Product) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setResults(filtered.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-blue-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <ul>
            {results.map((product) => (
              <li key={product.id} className="border-b last:border-b-0">
                <a
                  href={`/products/${product.id}`}
                  onClick={() => setShowResults(false)}
                  className="flex items-center p-3 hover:bg-gray-50"
                >
                  {product.images && product.images.length > 0 && (
                    <img
                      src={`http://localhost:4000${product.images[0]}`}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  )}
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      $
                      {typeof product.price === "string"
                        ? parseFloat(product.price).toFixed(2)
                        : product.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                    {product.category}
                  </span>
                </a>
              </li>
            ))}
            <li className="p-2 text-center">
              <button
                onClick={handleSearch}
                className="text-blue-600 text-sm hover:underline"
              >
                View all results
              </button>
            </li>
          </ul>
        </div>
      )}

      {showResults && searchQuery.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center">
          <p className="text-gray-500">
            No products found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
