import { useGetUserDetails } from "@/hooks/general/useGetUserDetails";
import { createContext, useContext } from "react";


const AuthContext = createContext({
    isLoading: false,
    data: null,
});

export const useAuthContext = () => {
    return useContext(AuthContext)
}    

export const AuthContextProvider = ({ children }) => {
    console.log('authVerification',)
    const { isLoading, data } = useGetUserDetails()

    return (<AuthContext.Provider value={{isLoading, data}}>
        {children}
    </AuthContext.Provider>)
}