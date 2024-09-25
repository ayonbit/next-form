"use server";
import validator from "validator"; // Import validator for sanitization
import { connectToDB } from "../dbcon";
import Deal from "../model/dealmodel"; // Import Deal as the default export

export const dealHandler = async (formData) => {
  const { name, link, couponcode, discount } = Object.fromEntries(formData);

  // Validate and sanitize inputs
  if (!validator.isAlphanumeric(name.replace(/\s/g, "")) || name.length < 5) {
    return { success: false, message: "Invalid name" };
  }
  if (!validator.isURL(link)) {
    return { success: false, message: "Invalid link" };
  }
  if (!validator.isAlphanumeric(couponcode) || couponcode.length < 5) {
    return { success: false, message: "Invalid coupon code" };
  }
  if (!validator.isInt(discount.toString(), { min: 1, max: 100 })) {
    return { success: false, message: "Invalid discount" };
  }

  try {
    await connectToDB();

    // Check if the coupon code already exists
    const existingDeal = await Deal.findOne({ couponcode });
    if (existingDeal) {
      return { success: false, message: "Coupon code already exists" };
    }

    const deal = await Deal.create({
      name: validator.escape(name), // Escape HTML entities for name
      link, // Use the validated link directly
      couponcode: validator.escape(couponcode), // Escape HTML entities for coupon code
      discount,
    });

    await deal.save();
    return { success: true, message: "Deal created successfully" };
  } catch (error) {
    console.error("Error details:", error);
    return { success: false, message: "Deal not created due to server error" };
  }
};
