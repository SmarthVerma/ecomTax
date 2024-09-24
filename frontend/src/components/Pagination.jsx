import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis
} from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux"; 
import { useEffect } from "react";
import { fetchProductsForPage } from "@/store/slices/paginSlice";

function PaginationCN() {
    const currentPage = useSelector(state => state.pagin.currentPage);
    const totalPages = useSelector(state => state.pagin.totalPage);
    const dispatch = useDispatch();

    // Fetch products based on the current page
    const handlePageChange = (pageNumber) => {
        dispatch(fetchProductsForPage({ page: pageNumber }));
    };

    useEffect(() => {
        // Logic that should happen after page change can be added here
    }, [currentPage]);

    // If there's only one page, don't render pagination
    if (totalPages === 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 hover:bg-white hover:text-black transition duration-200 ease-in-out"
                    >
                        &lt; Previous
                    </button>
                </PaginationItem>

                {currentPage - 1 > 1 && <PaginationEllipsis />}

                {/* Generate pagination links dynamically */}
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;

                    // Only render pages within the range of currentPage ± 1
                    if (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) {
                        return (
                            <PaginationItem key={index}>
                                <button
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`border p-3 font-bold transition duration-200 ease-in-out 
                                        ${pageNumber === currentPage
                                            ? "bg-blue-600 text-white"  // Change active page color
                                            : "bg-gray-300 text-black hover:bg-gray-400" // Change inactive page color
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            </PaginationItem>
                        );
                    }
                    return null;
                })}

                {currentPage + 1 < totalPages && <PaginationEllipsis />}

                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 hover:bg-white hover:text-black transition duration-200 ease-in-out"
                    >
                        Next &gt;
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export { PaginationCN };