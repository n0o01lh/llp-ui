import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginatorResult {
  limit: number;
  page: number;
  totalRows: number;
  totalPages: number;
  rows: Array<any>;
}

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Paginator({
  currentPage = 1,
  totalPages,
  onPageChange = () => {},
}: PaginatorProps) {
  console.log(totalPages);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className="flex justify-center items-center space-x-2 my-8"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hidden sm:inline-flex"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((page) => {
        // Only show 5 page numbers on mobile, centered around the current page
        const showOnMobile =
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1);

        return (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageChange(page)}
            className={`${
              page === currentPage
                ? "bg-[#0056D2] text-white hover:bg-[#00419E]"
                : "text-[#1F1F1F] hover:bg-[#F3F3F3]"
            } ${showOnMobile ? "" : "hidden sm:inline-flex"}`}
          >
            {page}
            {page === currentPage && (
              <span className="sr-only">(current page)</span>
            )}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hidden sm:inline-flex"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>

      {/* Mobile-specific previous/next buttons */}
      <div className="flex sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </nav>
  );
}
