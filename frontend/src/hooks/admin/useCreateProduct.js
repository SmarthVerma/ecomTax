import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const createProduct = (formData) => {
    const url = '/api/v1/products/admin/create-product'
    const config = {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }
    return axios.post(url, formData, config)
}


const validations = ({ name, description, price, category, images }) => {
    if (!name || !description || !price || !category) {
        toast.error("Fill out the all the fields")
        return false
    }

    if (images.length === 0) {
        console.log(images)
        toast.error("Select atleast one image of the product")
        return false
    }
    if (price < 0) {
        toast.error("You cant select price of the product in -ve")
        return false
    }

    return true
}

const useCreateProduct = () => {
    return useMutation((inputData) => {
        const isValid = validations(inputData)
        if (!isValid) throw new Error('Validations failed')

        const { name, description, price, category, images } = inputData

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("category", category)

        // for multiple images to send 
        images.forEach((img) => {
            formData.append(`images`, img)
        })

        return createProduct(formData)
    },
        {
            onSuccess: () => {
                toast.success('User registered successfully')
            },
            onError: (error) => {
                console.log('this is error', error.response.data.message)
                toast.error(error.response.data.message || 'An error Occurred')
            }
        })
}


export { useCreateProduct }