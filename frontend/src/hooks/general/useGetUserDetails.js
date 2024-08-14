import axios from "axios"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux";

const getUserDetails = () => {
    const url = "/api/v1/user/profile"
    console.log('this is url', url)
    return axios.get(url)
}

const useGetUserDetails = () => {
    const dispatch = useDispatch()
    console.log(`check`)
    const {isLoading, data} = useQuery(
        'fetch-auth',
        getUserDetails,
        {
            onSuccess: (data) => {
                console.log(`this is success data`, data)
            },
            onError: (data) => {
                console.log(`error Data`, data)
            },
            select: (data) => data.data
        }
    )

}


export { useGetUserDetails }


