import axios from "axios"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux";
import { storeData } from "../store/slices/productSlice/productSlice.js";

const allProducts = () => {
    return axios.get('/api/v1/products/all')
}

const useAllProducts = () => {
    const dispatch = useDispatch()
    const { isLoading, data, isError, error } = useQuery("fetchingAllProducts", allProducts, {
        select: (data) => {
            return (
                {
                    totalProducts: data.data.data.totalProducts,
                    products: data.data.data.products
                }
            )
        }
    });


    if (!isLoading) {
        console.log(data)
        dispatch(storeData(data))
    }
    return { isLoading, data, isError, error }
}

export { useAllProducts }