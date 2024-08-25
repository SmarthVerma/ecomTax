import axios from "axios"
import { useQuery } from "react-query"

const getMyOrders = () => {
    return axios.get(`/api/v1/orders/my/list`)
}

const useGetMyOrders = () => {
    return useQuery(
        'fetch-myOrders',
        getMyOrders,
        {
            select: (data) => data.data.data
        }
    )
}

export { useGetMyOrders }