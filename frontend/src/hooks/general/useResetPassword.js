import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const resetPassword = (inputData) => { // automatically it will recevice
    const url = `/api/v1/user/reset/${inputData.token}`;
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    };
    return axios.put(url, inputData, config);
};

const useResetPassword = () => {
const navigate = useNavigate()
    return useMutation(resetPassword, {
        onSuccess: () => {
            toast.success('Password reset succesfully');
            navigate('/login')
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        }
    });
};

export { useResetPassword };

