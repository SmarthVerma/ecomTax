import axios from "axios"
import { useQuery } from "react-query"

const getProduct = (productId) => {
    return axios.get(`/api/v1/products/${productId}`)
}

const useGetProduct = (productId) => {
    return useQuery(
        ['product', productId],
        () => getProduct(productId),
        {
            select: (data) => data.data.data
        }
    )
}

export { useGetProduct }