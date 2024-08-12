import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "react-query";


const logoutUser = () => {
    const url = '/api/v1/user/logout'
    return axios.post(url)
}

const useLogoutUser = () => {
    return useMutation(
        logoutUser,
        {
            onSuccess: (data) => {
                    console.log('this is data', data)
                toast.success("Logout Successfully")
            },
            onError: (data) => toast.success("Logout Failed")
        }
    )
}

export { useLogoutUser }