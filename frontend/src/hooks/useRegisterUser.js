import axios from "axios"
import toast from "react-hot-toast"
import { useQuery, useMutation } from "react-query"

const registerUser = (formData) => {
    const url = `/api/v1/user/register/`
    const config = {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }
    return axios.post(url, formData, config)
}

const validations = ({ email, name, password, confirmPassword }) => {
    if ( !name || !password || !email || !confirmPassword ) {
        toast.error("Please fill in all the fields");
        return false;
    }
    else if ( password != confirmPassword ) {
        toast.error("Password does not match");
        return false;
    }
    else if ( password.length < 6 ) {
        toast.error("Password must be atleast 6 characters")
        return false
    }
    
    return true
}

const useRegisterUser = () => {
    return useMutation((inputData) => {
        const isValid = validations(inputData);
        if (!isValid) throw new Error('Validation failed');

        const { email, name, password, confirmPassword } = inputData;
        console.log('this is the inputData', inputData)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        return registerUser(formData);
    }, {
        onSuccess: () => {
            toast.success('User registered successfully');
        },
        onError: (error) => {
            toast.error(error.message || 'An error occurred');
        }
    });
};

export { useRegisterUser }