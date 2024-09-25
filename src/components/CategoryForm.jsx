"use client"; // Add this directive to make the component a Client Component

import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { toast} from "react-hot-toast"; // Import toast and Toaster
import * as yup from "yup"; // Import yup for validation schema
import { catdealHandler } from "../lib/Handler/catdealhandler"; // Import the handler

// Define validation schema using yup
const schema = yup.object().shape({
  fullname: yup
    .string()
    .min(3, "Fullname must be at least 3 characters")
    .required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  color: yup
    .string()
    .oneOf(["red", "green", "blue"], "Invalid color selection")
    .required("Color is required"),
  size: yup
    .string()
    .oneOf(["XL", "L", "M", "S"], "Invalid size selection")
    .required("Size is required"),
  quantity: yup
    .number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  address: yup
    .string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  discountCode: yup
    .string()
    .min(5, "Discount code must be at least 5 characters"),
  discount: yup
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%"),
});

const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await catdealHandler(data);

      if (result.success) {
        toast.success(result.message);
        reset(); // Reset the form after successful submission
      } else {
        toast.error(result.message || "Failed to create category");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full">
      
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <div>
            <label htmlFor="fullname" className="block">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              {...register("fullname")}
              className="w-full p-2 rounded-md text-gray-900"
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full p-2 rounded-md text-gray-900"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block">Color</label>
            <div className="flex gap-x-4">
              <label>
                <input type="radio" value="red" {...register("color")} />
                Red
              </label>
              <label>
                <input type="radio" value="green" {...register("color")} />
                Green
              </label>
              <label>
                <input type="radio" value="blue" {...register("color")} />
                Blue
              </label>
            </div>
            {errors.color && (
              <p className="text-red-500">{errors.color.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="size" className="block">
              Size
            </label>
            <select
              id="size"
              {...register("size")}
              className="w-full p-2 rounded-md text-gray-900"
            >
              <option value="">Select Size</option>
              <option value="XL">XL</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
            </select>
            {errors.size && (
              <p className="text-red-500">{errors.size.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="quantity" className="block">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              {...register("quantity")}
              className="w-full p-2 rounded-md text-gray-900"
              min={1}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block">
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="w-full p-2 rounded-md text-gray-900"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="discountCode" className="block">
              Discount Code
            </label>
            <input
              type="text"
              id="discountCode"
              {...register("discountCode")}
              className="w-full p-2 rounded-md text-gray-900"
            />
            {errors.discountCode && (
              <p className="text-red-500">{errors.discountCode.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="discount" className="block">
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              {...register("discount")}
              className="w-full p-2 rounded-md text-gray-900"
              min={0}
              max={100}
            />
            {errors.discount && (
              <p className="text-red-500">{errors.discount.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
