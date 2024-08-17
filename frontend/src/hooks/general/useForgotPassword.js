import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const forgotPassword = (inputData) => { // automatically it will recevice
    console.log('this is forgot inputData', inputData)
    const url = '/api/v1/user/forgot';
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    };
    return axios.post(url, inputData, config);
};

const useForgotPassword = () => {

    return useMutation(forgotPassword, {
        onSuccess: () => {
            toast.success('Link sent to your mail ');
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            console.error('Error:', errorMessage);
            toast.error(errorMessage);
        }
    });
};

export { useForgotPassword };