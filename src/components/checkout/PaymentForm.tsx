import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface PaymentFormProps {
  prevStep: () => void;
}

interface FormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Here you would typically process the payment
    console.log(data);
    // Instead of nextStep, navigate to a confirmation page
    navigate("/checkout/confirmation");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="block mb-1">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          {...register("cardNumber", {
            required: "Card number is required",
            pattern: /^[0-9]{16}$/,
          })}
          className="w-full p-2 border rounded"
        />
        {errors.cardNumber && (
          <span className="text-red-500 text-sm">
            {errors.cardNumber.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            {...register("expiryDate", {
              required: "Expiry date is required",
              pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
            })}
            placeholder="MM/YY"
            className="w-full p-2 border rounded"
          />
          {errors.expiryDate && (
            <span className="text-red-500 text-sm">
              {errors.expiryDate.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="block mb-1">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            {...register("cvv", {
              required: "CVV is required",
              pattern: /^[0-9]{3,4}$/,
            })}
            className="w-full p-2 border rounded"
          />
          {errors.cvv && (
            <span className="text-red-500 text-sm">{errors.cvv.message}</span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="nameOnCard" className="block mb-1">
          Name on Card
        </label>
        <input
          type="text"
          id="nameOnCard"
          {...register("nameOnCard", { required: "Name on card is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.nameOnCard && (
          <span className="text-red-500 text-sm">
            {errors.nameOnCard.message}
          </span>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
        >
          Back to Address
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
