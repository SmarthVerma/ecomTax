import axios from "axios"
import { useQuery } from "react-query"

const getSingleUser = (userId) => {
    const url = `/api/v1/user/admin/user/${userId}`
    return axios.get(url)
}

const useGetSingleUser = (userId) => {
    return useQuery(
        ['user-id', userId],
        () => getSingleUser(userId),
        {
            select: (data) => data.data.data
        }
    )
}

export { useGetSingleUser }


