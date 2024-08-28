import React, { useEffect, useMemo } from 'react';
import Welcome from "../components/Home/Welcome";
import Featured from '../components/Home/Featured';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Home() {
    // const { isLoading, data } = useAuthContext();
    const data = useSelector(state => state.user.data)
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