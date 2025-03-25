import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Image, Plus } from "lucide-react";
import Modal from "../common/Modal";
import { Product, ProductFormData } from "../../types/Product"; // Add ProductFormData here
import { createBlankProduct } from "../../utils/productApi";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductFormData) => void; // Update this to use ProductFormData
  product: Product | null;
  categories: string[];
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
}) => {
  // Use ProductFormData for form state
  const [formData, setFormData] = useState<ProductFormData>(
    createBlankProduct()
  );

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        ...createBlankProduct(),
        ...product,
        // Convert brand object to string for the form
        brand:
          typeof product.brand === "string"
            ? product.brand
            : product.brand?.name || "",
      });
      setImagePreview(product.image || null);

      // Set gallery previews from either gallery or images array
      const galleryImages = product.gallery || product.images || [];
      setGalleryPreviews(galleryImages as string[]);
    } else {
      setFormData(createBlankProduct());
      setImagePreview(null);
      setGalleryPreviews([]);
    }
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    // Handle checkbox inputs
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // Handle number inputs
    if (type === "number") {
      const numberValue = value === "" ? 0 : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: numberValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please upload a valid image file",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
      setImagePreview(imageDataUrl);
      setFormData((prev) => ({ ...prev, image: imageDataUrl }));

      // Clear error if exists
      if (errors.image) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setGalleryPreviews((prev) => [...prev, imageDataUrl]);

        // Use either gallery or images field depending on what the original product uses
        if (product?.gallery) {
          setFormData((prev) => ({
            ...prev,
            gallery: [...(prev.gallery || []), imageDataUrl],
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            images: [...(prev.images || []), imageDataUrl],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));

    // Remove from either gallery or images
    if (formData.gallery) {
      setFormData((prev) => ({
        ...prev,
        gallery: (prev.gallery || []).filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: (prev.images || []).filter((_, i) => i !== index),
      }));
    }
  };

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;

    // Handle different specification formats
    if (
      typeof formData.specifications === "object" &&
      !Array.isArray(formData.specifications)
    ) {
      // It's a Record<string, string>
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...((prev.specifications as Record<string, string>) || {}),
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }));
    } else {
      // Default to Record<string, string> if none exists
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...(typeof prev.specifications === "object" &&
          !Array.isArray(prev.specifications)
            ? prev.specifications
            : {}),
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }));
    }

    // Reset inputs
    setNewSpecKey("");
    setNewSpecValue("");
  };

  const removeSpecification = (key: string) => {
    if (
      typeof formData.specifications === "object" &&
      !Array.isArray(formData.specifications)
    ) {
      const newSpecs = { ...formData.specifications };
      delete newSpecs[key];

      setFormData((prev) => ({
        ...prev,
        specifications: newSpecs,
      }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    // Split by commas and trim whitespace
    const tagsArray = tagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than zero";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!formData.image) {
      newErrors.image = "Main product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add New Product"}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[70vh] overflow-y-auto px-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Product Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Basic Information
            </h3>

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
                className={`mt-1 block w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className={`mt-1 block w-full border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={
                    typeof formData.brand === "string" ? formData.brand : ""
                  }
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`mt-1 block w-full border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Original Price ($)
                </label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Set if product is on sale
                </p>
              </div>

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
                  value={formData.stock || ""}
                  onChange={handleChange}
                  min="0"
                  className={`mt-1 block w-full border ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  value={formData.sku || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="modelNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model Number
                </label>
                <input
                  type="text"
                  id="modelNumber"
                  name="modelNumber"
                  value={formData.modelNumber || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="warranty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Warranty
                </label>
                <input
                  type="text"
                  id="warranty"
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleChange}
                  placeholder="e.g., 1 Year Limited"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Product Description
            </h3>

            <div>
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief summary to appear in product listings"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Full Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Detailed product description"
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Product Images
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Main Product Image*
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="h-32 w-32 border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center">
                  {imagePreview ? (
                    <div className="relative h-full w-full">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="h-full w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Image className="h-8 w-8 mx-auto" />
                      <p className="text-xs mt-1">No image selected</p>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleMainImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload className="h-4 w-4 inline mr-1" />
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </button>
                </div>
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gallery Images (Optional)
              </label>
              <div className="mt-1">
                <div className="flex flex-wrap gap-4 mb-4">
                  {galleryPreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative h-24 w-24 border border-gray-300 rounded-md overflow-hidden"
                    >
                      <img
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="h-24 w-24 border-2 border-gray-300 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Add Image</span>
                  </div>
                </div>

                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleGalleryImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Technical Specifications
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications
              </label>

              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {typeof formData.specifications === "object" &&
                    !Array.isArray(formData.specifications) &&
                    formData.specifications &&
                    Object.entries(formData.specifications).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-300"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {key}:
                          </span>
                          <span className="text-sm text-gray-600 ml-1">
                            {value}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSpecification(key)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      placeholder="Specification key (e.g., CPU)"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Value (e.g., Intel i7-11800H)"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={addSpecification}
                      disabled={!newSpecKey.trim() || !newSpecValue.trim()}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Spec
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Additional Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured || formData.featured || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Featured Product
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="onSale"
                  name="onSale"
                  checked={formData.onSale || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="onSale"
                  className="ml-2 block text-sm text-gray-700"
                >
                  On Sale
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isNew"
                  className="ml-2 block text-sm text-gray-700"
                >
                  New Product
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isTopSelling"
                  name="isTopSelling"
                  checked={formData.isTopSelling || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isTopSelling"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Top Selling
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={(formData.tags || []).join(", ")}
                onChange={handleTagsChange}
                placeholder="e.g., gaming, laptop, 16GB RAM"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Tags help customers find your products when searching
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
