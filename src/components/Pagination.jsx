import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalEntries,
  itemsPerPage,
}) => {
  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="mb-2 text-gray-700">
        Showing {startEntry}-{endEntry} of {totalEntries} entries
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
