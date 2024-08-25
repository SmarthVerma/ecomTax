import { useGetUserDetails } from "@/hooks/general/useGetUserDetails";
import { fetchCartItems } from "@/store/slices/cartSlice";
import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";


const AuthContext = createContext({
    isLoading: false,
    data: null,
});

export const useAuthContext = () => {
    return useContext(AuthContext)
}    

export const AuthContextProvider = ({ children }) => {
    const { isLoading, data } = useGetUserDetails()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch])
    

    return (<AuthContext.Provider value={{isLoading, data}}>
        {children}
    </AuthContext.Provider>)
}