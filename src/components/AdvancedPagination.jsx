import React from "react";
import { Button, HStack } from "@chakra-ui/react";

const AdvancedPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  return (
    <HStack spacing={2} justify="center" my={4}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        size="sm"
        variant="outline"
      >
        Previous
      </Button>
      {getPageNumbers().map((pageNumber, index) => (
        <Button
          key={index}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(pageNumber)
          }
          isDisabled={pageNumber === "..."}
          variant={pageNumber === currentPage ? "solid" : "outline"}
          colorScheme={pageNumber === currentPage ? "blue" : "gray"}
          size="sm"
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        size="sm"
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  );
};

export default AdvancedPagination;
