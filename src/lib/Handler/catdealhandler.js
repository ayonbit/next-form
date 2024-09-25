"use server";

import { connectToDB } from "../dbcon";
import CatDeal from "../model/catdealmodel";

export const catdealHandler = async (data) => {
  const {
    fullname,
    email,
    color,
    size,
    quantity,
    address,
    discountCode,
    discount,
  } = data;

  try {
    await connectToDB();

    const category = new CatDeal({
      fullname,
      email,
      color,
      size,
      quantity,
      address,
      discountCode,
      discount,
    });

    await category.save();
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    console.error("Error details:", error);
    return {
      success: false,
      message: "Category not created due to server error",
    };
  }
};
