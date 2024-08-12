import axios from "axios";
import { useQuery } from "react-query";

const getAllUsers = () => {
    const url = '/api/v1/user/admin/all/users'
    return axios.get(url)
}

const useGetAllUsers = () => {
    return useQuery('fetch-all-users', getAllUsers, {
        select: (data) => data.data.data
    })
}

export {useGetAllUsers}