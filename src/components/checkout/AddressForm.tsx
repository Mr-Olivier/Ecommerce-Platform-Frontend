// components/checkout/AddressForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCheckout } from "../../hooks/useCheckout";

interface AddressFormProps {
  nextStep: () => void;
}

interface FormData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ nextStep }) => {
  const { createCheckoutSession, isLoading, error } = useCheckout();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Create a checkout session with the address data
    const result = await createCheckoutSession(data);

    if (result.success) {
      // If checkout session created successfully, proceed to payment
      nextStep();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Shipping Address
      </h2>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              className={`w-full p-3 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
            className={`w-full p-3 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="+1 (123) 456-7890"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", { required: "Address is required" })}
            className={`w-full p-3 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="123 Main Street, Apt 4B"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", { required: "City is required" })}
              className={`w-full p-3 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="New York"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State/Province
            </label>
            <input
              type="text"
              id="state"
              {...register("state", { required: "State is required" })}
              className={`w-full p-3 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="NY"
            />
            {errors.state && (
              <span className="text-red-500 text-sm">
                {errors.state.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ZIP/Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              {...register("zipCode", { required: "ZIP code is required" })}
              className={`w-full p-3 border ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="10001"
            />
            {errors.zipCode && (
              <span className="text-red-500 text-sm">
                {errors.zipCode.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <select
            id="country"
            {...register("country", { required: "Country is required" })}
            className={`w-full p-3 border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing...
              </>
            ) : (
              <>Continue to Payment</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
