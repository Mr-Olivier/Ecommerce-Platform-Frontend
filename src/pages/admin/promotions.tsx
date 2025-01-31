// src/pages/admin/promotions.tsx
import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, ArrowUpDown } from "lucide-react";
import Modal from "../../components/common/Modal";

interface Promotion {
  id: string;
  name: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableProducts: string[];
}

const PromotionsManagement: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Promotion;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch promotions data
    const fetchPromotions = async () => {
      // In a real application, this would be an API call
      const samplePromotions: Promotion[] = [
        {
          id: "1",
          name: "Summer Sale",
          code: "SUMMER2024",
          discountType: "percentage",
          discountValue: 20,
          startDate: "2024-06-01",
          endDate: "2024-08-31",
          isActive: true,
          applicableProducts: ["All"],
        },
        {
          id: "2",
          name: "New Customer Discount",
          code: "WELCOME10",
          discountType: "fixed",
          discountValue: 10,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          isActive: true,
          applicableProducts: ["Electronics", "Home & Living"],
        },
        // Add more sample promotions here
      ];
      setPromotions(samplePromotions);
    };

    fetchPromotions();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (key: keyof Promotion) => {
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

  const handleAddPromotion = (newPromotion: Omit<Promotion, "id">) => {
    const promotion: Promotion = {
      ...newPromotion,
      id: (promotions.length + 1).toString(),
    };
    setPromotions([...promotions, promotion]);
    setIsModalOpen(false);
  };

  const handleEditPromotion = (editedPromotion: Omit<Promotion, "id">) => {
    const updatedPromotions = promotions.map((promo) =>
      promo.id === selectedPromotion?.id
        ? { ...promo, ...editedPromotion }
        : promo
    );
    setPromotions(updatedPromotions);
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleDeletePromotion = (promotionId: string) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      const updatedPromotions = promotions.filter(
        (promo) => promo.id !== promotionId
      );
      setPromotions(updatedPromotions);
    }
  };

  const filteredAndSortedPromotions = promotions
    .filter(
      (promo) =>
        promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Promotions Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Promotion
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search promotions..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Code",
                "Discount",
                "Start Date",
                "End Date",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleSort(
                      header.toLowerCase().replace(" ", "") as keyof Promotion
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
            {filteredAndSortedPromotions.map((promo) => (
              <tr key={promo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {promo.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {promo.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {promo.discountType === "percentage"
                    ? `${promo.discountValue}%`
                    : `$${promo.discountValue}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {promo.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {promo.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      promo.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {promo.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedPromotion(promo);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePromotion(promo.id)}
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
          setSelectedPromotion(null);
        }}
        title={selectedPromotion ? "Edit Promotion" : "Add New Promotion"}
      >
        <PromotionForm
          promotion={selectedPromotion}
          onSubmit={
            selectedPromotion ? handleEditPromotion : handleAddPromotion
          }
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedPromotion(null);
          }}
        />
      </Modal>
    </div>
  );
};

interface PromotionFormProps {
  promotion?: Promotion | null;
  onSubmit: (promotion: Omit<Promotion, "id">) => void;
  onCancel: () => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({
  promotion,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Promotion, "id">>({
    name: promotion?.name || "",
    code: promotion?.code || "",
    discountType: promotion?.discountType || "percentage",
    discountValue: promotion?.discountValue || 0,
    startDate: promotion?.startDate || "",
    endDate: promotion?.endDate || "",
    isActive: promotion?.isActive || true,
    applicableProducts: promotion?.applicableProducts || ["All"],
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
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Promotion Name
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
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Promotion Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="discountType"
          className="block text-sm font-medium text-gray-700"
        >
          Discount Type
        </label>
        <select
          id="discountType"
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="discountValue"
          className="block text-sm font-medium text-gray-700"
        >
          Discount Value
        </label>
        <input
          type="number"
          id="discountValue"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          required
          min="0"
          step={formData.discountType === "percentage" ? "1" : "0.01"}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="isActive"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="isActive"
          name="isActive"
          value={formData.isActive.toString()}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isActive: e.target.value === "true",
            }))
          }
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
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
          {promotion ? "Update" : "Add"} Promotion
        </button>
      </div>
    </form>
  );
};

export default PromotionsManagement;
