import React, { useEffect } from 'react'
import Welcome from "../components/Home/Welcome";
import Featured from '../components/Home/Featured';
import { useAllProducts } from '../hooks/useAllProducts';
import { useGetUserDetails } from '@/hooks/general/useGetUserDetails';


function Home() {
    useGetUserDetails();

    return (
        <div>
            <Welcome />
            <Featured />
        </div>
    )   
}

export default Home
