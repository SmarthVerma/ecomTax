import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const ResetPassword = (inputData) => { // automatically it will recevice
    console.log('this is forgot inputData', inputData)
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
    return useMutation(ResetPassword, {
        onSuccess: () => {
            toast.success('Password reset succesfully');
            navigate('/login')
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            console.error('Error:', errorMessage);
            toast.error(errorMessage);
        }
    });
};

export { useResetPassword };

