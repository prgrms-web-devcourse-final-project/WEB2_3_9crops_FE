import { useEffect } from 'react';

function useViewport() {
  useEffect(() => {
    const setViewport = () => {
      const vh = window.innerHeight * 0.01;
      const vw = document.documentElement.clientWidth * 0.01;
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
