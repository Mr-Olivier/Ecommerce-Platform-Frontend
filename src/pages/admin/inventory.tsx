// src/pages/admin/inventory.tsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  ArrowUpDown,
  Download,
} from "lucide-react";
import Modal from "../../components/common/Modal";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stockQuantity: number;
  reorderPoint: number;
  unitPrice: number;
  supplier: string;
}

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InventoryItem;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch inventory data
    const fetchInventory = async () => {
      // In a real application, this would be an API call
      const sampleInventory: InventoryItem[] = [
        {
          id: "1",
          sku: "PROD001",
          name: "Wireless Earbuds",
          category: "Electronics",
          stockQuantity: 150,
          reorderPoint: 50,
          unitPrice: 79.99,
          supplier: "TechGadgets Inc.",
        },
        {
          id: "2",
          sku: "PROD002",
          name: "Leather Wallet",
          category: "Accessories",
          stockQuantity: 200,
          reorderPoint: 75,
          unitPrice: 49.99,
          supplier: "FashionAccessories Ltd.",
        },
        {
          id: "3",
          sku: "PROD003",
          name: "Stainless Steel Water Bottle",
          category: "Home & Living",
          stockQuantity: 300,
          reorderPoint: 100,
          unitPrice: 24.99,
          supplier: "EcoProducts Co.",
        },
        {
          id: "4",
          sku: "PROD004",
          name: "Fitness Tracker",
          category: "Electronics",
          stockQuantity: 75,
          reorderPoint: 30,
          unitPrice: 99.99,
          supplier: "TechGadgets Inc.",
        },
        {
          id: "5",
          sku: "PROD005",
          name: "Organic Green Tea",
          category: "Food & Beverage",
          stockQuantity: 500,
          reorderPoint: 200,
          unitPrice: 12.99,
          supplier: "HealthyFoods LLC",
        },
      ];
      setInventory(sampleInventory);
    };

    fetchInventory();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setFilterCategory(category);
  };

  const handleSort = (key: keyof InventoryItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleAddItem = (newItem: Omit<InventoryItem, "id">) => {
    const item: InventoryItem = {
      ...newItem,
      id: (inventory.length + 1).toString(),
    };
    setInventory([...inventory, item]);
    setIsModalOpen(false);
  };

  const handleEditItem = (editedItem: Omit<InventoryItem, "id">) => {
    const updatedInventory = inventory.map((item) =>
      item.id === selectedItem?.id ? { ...item, ...editedItem } : item
    );
    setInventory(updatedInventory);
    setSelectedItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedInventory = inventory.filter((item) => item.id !== itemId);
      setInventory(updatedInventory);
    }
  };

  const filteredAndSortedInventory = inventory
    .filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterCategory === "all" || item.category === filterCategory)
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + item.stockQuantity * item.unitPrice,
    0
  );
  const lowStockItems = inventory.filter(
    (item) => item.stockQuantity <= item.reorderPoint
  );

  const categories = Array.from(
    new Set(inventory.map((item) => item.category))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Inventory Management
        </h1>
        <div className="space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Item
          </button>
          <button
            onClick={() => {
              /* Implement export functionality */
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Inventory Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-800">Total Items</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-900">
              {inventory.length}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="text-sm font-medium text-green-800">
              Total Inventory Value
            </h3>
            <p className="mt-2 text-3xl font-semibold text-green-900">
              ${totalInventoryValue.toFixed(2)}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-md">
            <h3 className="text-sm font-medium text-yellow-800">
              Low Stock Items
            </h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-900">
              {lowStockItems.length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => handleFilter(e.target.value)}
          className="pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "SKU",
                "Name",
                "Category",
                "Stock",
                "Reorder Point",
                "Unit Price",
                "Supplier",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleSort(
                      header
                        .toLowerCase()
                        .replace(" ", "") as keyof InventoryItem
                    )
                  }
                >
                  <div className="flex items-center">
                    {header}
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.stockQuantity <= item.reorderPoint
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.stockQuantity}
                    {item.stockQuantity <= item.reorderPoint && (
                      <AlertTriangle className="h-4 w-4 ml-1 text-red-500" />
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.reorderPoint}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.unitPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        title={selectedItem ? "Edit Inventory Item" : "Add New Inventory Item"}
      >
        <InventoryForm
          item={selectedItem}
          onSubmit={selectedItem ? handleEditItem : handleAddItem}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          categories={categories}
        />
      </Modal>
    </div>
  );
};

interface InventoryFormProps {
  item?: InventoryItem | null;
  onSubmit: (item: Omit<InventoryItem, "id">) => void;
  onCancel: () => void;
  categories: string[];
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  item,
  onSubmit,
  onCancel,
  categories,
}) => {
  const [formData, setFormData] = useState<Omit<InventoryItem, "id">>({
    sku: item?.sku || "",
    name: item?.name || "",
    category: item?.category || "",
    stockQuantity: item?.stockQuantity || 0,
    reorderPoint: item?.reorderPoint || 0,
    unitPrice: item?.unitPrice || 0,
    supplier: item?.supplier || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="sku"
          className="block text-sm font-medium text-gray-700"
        >
          SKU
        </label>
        <input
          type="text"
          id="sku"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="stockQuantity"
          className="block text-sm font-medium text-gray-700"
        >
          Stock Quantity
        </label>
        <input
          type="number"
          id="stockQuantity"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="reorderPoint"
          className="block text-sm font-medium text-gray-700"
        >
          Reorder Point
        </label>
        <input
          type="number"
          id="reorderPoint"
          name="reorderPoint"
          value={formData.reorderPoint}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="unitPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Unit Price
        </label>
        <input
          type="number"
          id="unitPrice"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="supplier"
          className="block text-sm font-medium text-gray-700"
        >
          Supplier
        </label>
        <input
          type="text"
          id="supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {item ? "Update" : "Add"} Item
        </button>
      </div>
    </form>
  );
};

export default InventoryManagement;
