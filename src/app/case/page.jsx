"use client";
import Pagination from "@/components/Pagination"; // Import the Pagination component
import SearchInput from "@/components/Serach"; // Import the SearchInput component
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchDealFormData } from "@/lib/Fetch/fetchdata";
import { useEffect, useState } from "react";

const CaseShow = () => {
  const [dealFormData, setDealFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      const dealForm = await fetchDealFormData();
      setDealFormData(dealForm);
    };

    fetchData();
  }, []);

  // Filter data based on search term
  const filteredData = dealFormData.filter((deal) =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get the data for the current page
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Deal Form Data</h2>
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <Table className="min-w-full bg-gray-100 border border-gray-300">
          <TableCaption className="text-left text-white">
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
            {currentData.map((deal, index) => (
              <TableRow key={deal._id} className="hover:bg-gray-50">
                <TableCell className="py-2 px-4 border border-gray-300 text-gray-700">
                  {(currentPage - 1) * itemsPerPage + index + 1}
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
        {/* Use the Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalEntries={filteredData.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default CaseShow;
