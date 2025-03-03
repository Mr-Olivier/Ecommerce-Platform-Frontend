import React, { useState, useEffect } from "react";

// Types
export interface Address {
  id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

interface AddressBookProps {
  // If you want to pass props like loading addresses from an API
  initialAddresses?: Address[];
  onAddressChange?: (addresses: Address[]) => void;
}

const AddressBook: React.FC<AddressBookProps> = ({
  initialAddresses = [],
  onAddressChange,
}) => {
  // Mock data for demo purposes - replace with real data from your API
  const [addresses, setAddresses] = useState<Address[]>(
    initialAddresses.length > 0
      ? initialAddresses
      : [
          {
            id: "1",
            name: "Home",
            address1: "123 Main St",
            address2: "Apt 4B",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States",
            phone: "(555) 123-4567",
            isDefault: true,
          },
          {
            id: "2",
            name: "Work",
            address1: "456 Office Blvd",
            city: "San Francisco",
            state: "CA",
            postalCode: "94107",
            country: "United States",
            phone: "(555) 987-6543",
            isDefault: false,
          },
        ]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [formError, setFormError] = useState("");

  // Default empty address form
  const emptyAddress: Address = {
    id: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States", // Default country
    phone: "",
    isDefault: false,
  };

  // Update parent component when addresses change
  useEffect(() => {
    if (onAddressChange) {
      onAddressChange(addresses);
    }
  }, [addresses, onAddressChange]);

  const handleAddNewAddress = () => {
    setCurrentAddress({
      ...emptyAddress,
      id: `temp-${Date.now()}`, // Generate a temporary ID
    });
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setCurrentAddress({ ...address });
    setIsModalOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter((address) => address.id !== id);

      // If we're deleting the default address, set a new default
      if (
        addresses.find((address) => address.id === id)?.isDefault &&
        updatedAddresses.length > 0
      ) {
        updatedAddresses[0].isDefault = true;
      }

      setAddresses(updatedAddresses);
    }
  };

  const handleSetDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    setAddresses(updatedAddresses);
  };

  const handleSaveAddress = (formData: Address) => {
    // Validate form data
    if (
      !formData.name ||
      !formData.address1 ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormError("");

    // Check if this is a new or existing address
    const isNewAddress = !addresses.some(
      (address) => address.id === formData.id
    );

    let updatedAddresses: Address[];

    if (isNewAddress) {
      // If it's the first address, make it default
      if (addresses.length === 0) {
        formData.isDefault = true;
      }

      // Add new address
      updatedAddresses = [...addresses, formData];
    } else {
      // Update existing address
      updatedAddresses = addresses.map((address) =>
        address.id === formData.id ? formData : address
      );
    }

    // If this address is being set as default, update other addresses
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((address) => ({
        ...address,
        isDefault: address.id === formData.id,
      }));
    } else {
      // Ensure there's always a default address
      const hasDefaultAddress = updatedAddresses.some(
        (address) => address.isDefault
      );
      if (!hasDefaultAddress && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
    }

    setAddresses(updatedAddresses);
    setIsModalOpen(false);
  };

  // Format full address as a string
  const formatAddress = (address: Address): string => {
    const parts = [
      address.address1,
      address.address2,
      `${address.city}, ${address.state} ${address.postalCode}`,
      address.country,
    ].filter(Boolean);

    return parts.join(", ");
  };

  return (
    <div>
      {/* Address list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Your Addresses
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your shipping addresses
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddNewAddress}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Address
          </button>
        </div>

        <div className="px-6 py-5">
          {addresses.length === 0 ? (
            <div className="text-center py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                No addresses saved
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first shipping address
              </p>
              <button
                type="button"
                onClick={handleAddNewAddress}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border ${
                    address.isDefault
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300"
                  } rounded-lg p-4 relative`}
                >
                  {address.isDefault && (
                    <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Default
                    </span>
                  )}

                  <div className="mb-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      {address.name}
                    </h4>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                    {address.phone && <p>{address.phone}</p>}
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      type="button"
                      onClick={() => handleEditAddress(address)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>

                    {!address.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="text-sm font-medium text-gray-600 hover:text-gray-800"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      {isModalOpen && currentAddress && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {currentAddress.id.startsWith("temp")
                        ? "Add New Address"
                        : "Edit Address"}
                    </h3>

                    {formError && (
                      <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
                        {formError}
                      </div>
                    )}

                    <div className="mt-4">
                      <form className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={currentAddress.name}
                            onChange={(e) =>
                              setCurrentAddress({
                                ...currentAddress,
                                name: e.target.value,
                              })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Home, Work, etc."
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="address1"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            id="address1"
                            name="address1"
                            value={currentAddress.address1}
                            onChange={(e) =>
                              setCurrentAddress({
                                ...currentAddress,
                                address1: e.target.value,
                              })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="address2"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address Line 2 (Optional)
                          </label>
                          <input
                            type="text"
                            id="address2"
                            name="address2"
                            value={currentAddress.address2 || ""}
                            onChange={(e) =>
                              setCurrentAddress({
                                ...currentAddress,
                                address2: e.target.value,
                              })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={currentAddress.city}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  city: e.target.value,
                                })
                              }
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={currentAddress.state}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  state: e.target.value,
                                })
                              }
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="postalCode"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={currentAddress.postalCode}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  postalCode: e.target.value,
                                })
                              }
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={currentAddress.country}
                              onChange={(e) =>
                                setCurrentAddress({
                                  ...currentAddress,
                                  country: e.target.value,
                                })
                              }
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            >
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Mexico">Mexico</option>
                              {/* Add more countries as needed */}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={currentAddress.phone || ""}
                            onChange={(e) =>
                              setCurrentAddress({
                                ...currentAddress,
                                phone: e.target.value,
                              })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            id="isDefault"
                            name="isDefault"
                            type="checkbox"
                            checked={currentAddress.isDefault}
                            onChange={(e) =>
                              setCurrentAddress({
                                ...currentAddress,
                                isDefault: e.target.checked,
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="isDefault"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Set as default address
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleSaveAddress(currentAddress)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
