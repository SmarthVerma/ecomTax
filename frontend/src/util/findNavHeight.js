// note below
import { useState, useEffect } from 'react';

const findNavHeight = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {

        const updateNavbarHeight = () => {
            const header = document.getElementById('header');
            if (header) {
                setNavbarHeight(header.offsetHeight);
            }
        };
        // Initial height update
        updateNavbarHeight();

        // Update height on window resize
        window.addEventListener('resize', updateNavbarHeight);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, []);

    return navbarHeight;
};

export default findNavHeight;

/*
Yes, if you don’t clean up the event listener when the component unmounts, 
it will keep adding new event listeners every time the component mounts. 
This will lead to multiple event listeners being attached to the window,
which can cause performance issues and unintended behavior.
*/