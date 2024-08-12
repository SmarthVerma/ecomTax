import axios from "axios"
import { useQuery } from "react-query"

const getUserDetails = (userId) => {
    console.log('user id ', userId)
    const url = `/api/v1/user/admin/user/${userId}`
    return axios.get(url)
}

const useGetUserDetails = (userId) => {
    return useQuery(
        ['user-id', userId],
        () => getUserDetails(userId),
        {
            select: (data) => data.data.data
        }
    )
}

export { useGetUserDetails }


