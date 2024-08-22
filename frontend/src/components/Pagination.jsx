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
    const noOfPages = useSelector(state => state.pagin.totalPage);
    const dispatch = useDispatch()

    // Fetch products based on the current page
    const handlePageChange = (pageNumber) => {
        dispatch(fetchProductsForPage({page: pageNumber}));
    };

    useEffect(() => {
        // Effect will trigger every time currentPage changes
        // Any additional logic that should happen after page change can be added here
    }, [currentPage]);

    if(noOfPages == 1 ) return null

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 hover:bg-white hover:text-black"
                    >
                        &lt; Previous
                    </button>
                </PaginationItem>

                {currentPage - 1 > 1 && (<PaginationEllipsis />)}

                {/* Generate pagination links dynamically */}
                {[...Array(noOfPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Only render pages within the range of currentPage ± 3
                    if (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) {
                        return (
                            <PaginationItem key={index}>
                                <button
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`border p-3 font-bold ${pageNumber === currentPage
                                        ? "bg-red-500"
                                        : "text-black bg-orange-500"
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            </PaginationItem>
                        );
                    }
                    return null;
                })}

                {currentPage + 1 < noOfPages && (<PaginationEllipsis />)}


                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
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