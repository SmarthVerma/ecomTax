import axios from "axios"
import { useQuery } from "react-query"


const allProducts = ({ keyword }) => {
  
    const url = `/api/v1/products/all?keyword=${keyword}`
    // console.log(url)
    return axios.get(url)
}

const useAllProducts = ({ keyword }) => {
    const queryKey = `fetchingAllProducts_${keyword}`;  // Unique key for each keyword

    const { isLoading, data, isError, error } = useQuery(
        queryKey,
        () => allProducts({ keyword }),
        {
            select: (data) => ({    
                totalProducts: data.data.data.totalProducts,
                products: data.data.data.products,
            }),
        }
    );

    return { isLoading, data, isError, error };
};

export { useAllProducts }