import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
  const location = useLocation();

  useEffect(() => {
    // console.log('Current location:', location); // Detailed location logging
    // console.log('yah i am working',)
    window.scrollTo(0, 0);
  }, [location]); // Dependency array includes location to trigger scroll on route change

  return null; // No need to render anything
}; 

export default ScrollTop;