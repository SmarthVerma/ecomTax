import axios from "axios"
import toast from "react-hot-toast"
import { useMutation } from "react-query"

const createEditReview = (formData, id) => {
    console.log(`this is product id`, id)
    const url = `/api/v1/products/reviews/${id}`
    const config = {
        headers: {
            'Content-Type': "application/json"  // Set content type to JSON
        }
    };
    console.log('ths is formData', formData)
    return axios.post(url, formData, config)
}


const useCreateEditReview = () => {
    return useMutation(({ data, id }) => {

        const { comment, rating } = data;

        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('rating', rating);

        return createEditReview(formData, id);
    }, {
        onSuccess: () => {
            toast.success('Review updated successfully');
        },
        onError: (error) => {
            toast.error(error.message || 'An error occurred');
        }
    });
};

export { useCreateEditReview }

