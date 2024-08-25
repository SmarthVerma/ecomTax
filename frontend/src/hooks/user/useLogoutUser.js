import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";


const logoutUser = () => {
    const url = '/api/v1/user/logout'
    return axios.post(url)
}

const useLogoutUser = () => {
    return useMutation(
        logoutUser,
        {
            onSuccess: (data) => {
                toast.success("Logout Successfully")
                window.location.reload()
            },
            onError: (data) => toast.success("Logout Failed")
        }
    )
}

export { useLogoutUser }