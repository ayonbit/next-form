"use server";

import { connectToDB } from "../dbcon";
import CatDeal from "../model/catdealmodel";
import Deal from "../model/dealmodel";

export const fetchDealFormData = async () => {
  await connectToDB();
  const dealFormData = await Deal.find({});
  return dealFormData;
};

export const fetchCategoryDealData = async () => {
  await connectToDB();
  const categoryDealData = await CatDeal.find({});
  return categoryDealData;
};
