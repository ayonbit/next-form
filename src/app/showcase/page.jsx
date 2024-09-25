"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchCategoryDealData,
  fetchDealFormData,
} from "@/lib/Fetch/fetchdata";
import { useEffect, useState } from "react";

const ShowCase = () => {
  const [dealFormData, setDealFormData] = useState([]);
  const [categoryDealData, setCategoryDealData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dealForm = await fetchDealFormData();
      const categoryDeal = await fetchCategoryDealData();
      setDealFormData(dealForm);
      setCategoryDealData(categoryDeal);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Deal Form Data
        </h2>
        <Table className="min-w-full bg-gray-100 border border-gray-300">
          <TableCaption className="text-left text-gray-600">
            A list of your recent Deal.
          </TableCaption>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Serial
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Name
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Link
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Coupon Code
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Discount(%)
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealFormData.map((deal, index) => (
              <TableRow key={deal._id} className="hover:bg-gray-50">
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.name}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.link}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.couponcode}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.discount}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {new Date(deal.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Category Deal Data
        </h2>
        <Table className="min-w-full bg-gray-100 border border-gray-300">
          <TableCaption className="text-left text-gray-600">
            A list of your recent Cat Deal.
          </TableCaption>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Serial
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Fullname
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Email
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Color
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Size
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Quantity
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Address
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Discount Code
              </TableHead>
              <TableHead className="py-2 px-4 border border-gray-300 text-gray-800">
                Discount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryDealData.map((deal, index) => (
              <TableRow key={deal._id} className="hover:bg-gray-50">
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.fullname}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.email}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.color}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.size}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.quantity}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.address}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.discountCode}
                </TableCell>
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {deal.discount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ShowCase;
