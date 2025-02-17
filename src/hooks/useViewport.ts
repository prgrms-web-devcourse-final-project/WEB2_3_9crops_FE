import { useEffect } from 'react';

function useViewport() {
  useEffect(() => {
    const setViewport = () => {
      const vh = window.innerHeight * 0.00999;
      const vw = document.documentElement.clientWidth * 0.00999;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    };

    setViewport();
    window.addEventListener('resize', setViewport);

    return () => {
      window.removeEventListener('resize', setViewport);
    };
  }, []);
}

export default useViewport;
