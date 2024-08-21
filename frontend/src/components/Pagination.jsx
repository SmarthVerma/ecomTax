import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis
} from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { useState } from "react";

function PaginationCN() {
    const totalProduct = useSelector(state => state.pagin.totalProducts);
    const productLimit = useSelector(state => state.pagin.productLimit);

    const [currentPage, setCurrentPage] = useState(1);
    const noOfPages = Math.ceil(totalProduct / productLimit);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Add any additional logic for page change here, e.g., fetching new data
    };

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