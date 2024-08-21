import React, { useEffect, useMemo } from 'react';
import Welcome from "../components/Home/Welcome";
import Featured from '../components/Home/Featured';
import { useGetUserDetails } from '@/hooks/general/useGetUserDetails';
import { useAuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';

function Home() {
    useGetUserDetails();
    const { isLoading, data } = useAuthContext();
    useMemo(() => {
        if (data?.name) {
            // toast.success('Welcome ' + data.name);
        }
    }, [data?.name]); // The toast will only trigger if data.name changes

    return (
        <div>
            <Welcome />
            <Featured />
        </div>
    );
}

export default Home;