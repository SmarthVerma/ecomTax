import axios from "axios"
import { useQuery } from "react-query"

const getSingleOrder = (orderId) => {
    console.log('this is orderId', orderId)
    return axios.get(`/api/v1/orders/${orderId}`)
}

const useGetSingleOrder = (orderId) => {
    return useQuery(
        ['order-detail', orderId],
        () => getSingleOrder(orderId),
        {
            select: (data) => data.data.data
        }
    )
}

export { useGetSingleOrder }