import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddressFormProps {
  nextStep: () => void;
}

interface FormData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Here you would typically save the address data
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && (
          <span className="text-red-500 text-sm">
            {errors.fullName.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          {...register("address", { required: "Address is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          {...register("city", { required: "City is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="zipCode" className="block mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          {...register("zipCode", { required: "ZIP code is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.zipCode && (
          <span className="text-red-500 text-sm">{errors.zipCode.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default AddressForm;
