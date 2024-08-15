import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


const loginUser = (inputData) => {
    const url = '/api/v1/user/login'
    const config = {
        headers: {
            'Content-Type': "application/json" // by default
        }
    }
    return axios.post(url, inputData, config)
}

const validation = ( {email, password} ) => {
    if (!password) {
        toast.error('Fill the password field')
        return false;
    }
    if (!email) {
        toast.error('Fill the password field')
        return false;
    }
    return true
}

const useLoginUser = () => {
    const navigate = useNavigate()

    return useMutation((inputData) => {
        const isValid = validation(inputData)
        if (!isValid) throw new Error("Validations failed")

        return loginUser(inputData)
    },
    {
        onSuccess: () => {
            toast.success('Logged in successfully')
            navigate('/')
        },
        onError: (error) => {
            console.log('error', error.response.data.message)
            toast.error(error.response.data.message || 'An error Occurred')
        }
    }
    )
}



export { useLoginUser }