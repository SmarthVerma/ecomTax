import React, { useEffect } from 'react'
import Welcome from "../components/Home/Welcome";
import Featured from '../components/Home/Featured';
import { useAllProducts } from '../hooks/useAllProducts';


function Home() {



    return (
        <div>
            <Welcome />
            <Featured />
        </div>
    )
}

export default Home
