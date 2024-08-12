import axios from "axios";
import { useQuery } from "react-query";

const getAllOrders = () => {
    const url = '/api/v1/orders/admin/all/'
    return axios.get(url)
}

const useGetAllOrders = () => {
    return useQuery('fetch-all-orders', getAllOrders, {
        select: (data) => data.data.data
    })
}

export { useGetAllOrders }