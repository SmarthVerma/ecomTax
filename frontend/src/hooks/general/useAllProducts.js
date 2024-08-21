import { storeProductLimit, storeProducts, storeTotalProducts } from "@/store/slices/paginSlice"
import { productLimit } from "@/util/productLimit"
import axios from "axios"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"

// Refactor `allProducts` to only handle the API request
const allProducts = async ({ keyword, page }) => {
    const prodLimit = productLimit()
    const url = `/api/v1/products/all?keyword=${keyword || ''}&limit=${prodLimit}&page=${page}`
    console.log(url)
    return await axios.get(url)
}

const useAllProducts = ({ keyword, page }) => {
    const dispatch = useDispatch()
    const prodLimit = productLimit() // Get product limit
    const queryKey = `fetchingAllProducts_${keyword|| ""}_${page || 1}`;  // Unique key for each keyword

    // Use `useQuery` to fetch products and handle state updates
    const { isLoading, data, isError, error } = useQuery(
        queryKey,
        () => allProducts({ keyword, page }),
        {
            select: (data) => data.data.data,
            onSuccess: (data) => {
                console.log('test onSuccess Data', data)
                console.log(`noOfProducts`, data.noOfProducts)
                dispatch(storeProductLimit(prodLimit))
                dispatch(storeTotalProducts(data.totalProducts))
                dispatch(storeProducts(data.products))
            },
            onError: (error) => {
                console.log('this is error', error)
                // Optionally, handle the error
            }
        }
    );

    return { isLoading, data, isError, error };
};

export { useAllProducts }