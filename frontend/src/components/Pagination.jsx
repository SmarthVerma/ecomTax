import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis
} from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAllProducts } from "@/hooks/general/useAllProducts";

function PaginationCN() {
    const totalProduct = useSelector(state => state.pagin.totalProducts);
    const productLimit = useSelector(state => state.pagin.productLimit);
    const currentPage = useSelector(state => state.pagin.currentPage)
    
    const noOfPages = Math.ceil(totalProduct / productLimit);

    // Fetch products based on the current page
    const { isLoading, data } = useAllProducts({ page: currentPage });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        // Effect will trigger every time currentPage changes
        // Any additional logic that should happen after page change can be added here
    }, [currentPage]);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 hover:bg-white hover:text-black"
                    >
                        &lt; Previous
                    </button>
                </PaginationItem>

                {/* Generate pagination links dynamically */}
                {[...Array(noOfPages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <button
                            onClick={() => handlePageChange(index + 1)}
                            className={`border p-3 font-bold ${index + 1 === currentPage
                                ? "bg-red-500"
                                : "text-black bg-orange-500"
                                }`}
                        >
                            {index + 1}
                        </button>
                    </PaginationItem>
                ))}

                <PaginationEllipsis />

                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, noOfPages))}
                        disabled={currentPage === noOfPages}
                        className="p-3 hover:bg-white hover:text-black"
                    >
                        Next &gt;
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export { PaginationCN };