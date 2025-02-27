import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUserToken } from '@/apis/auth';
import useAuthStore from '@/stores/authStore';

const AuthCallbackPage = () => {
  const stateToken = new URLSearchParams(window.location.search).get('state');
  const redirectURL = new URLSearchParams(window.location.search).get('redirect');

  const { setUserId, setZipCode, setAccessToken, zipCode } = useAuthStore();

  const navigate = useNavigate();

  const setUserInfo = async (stateToken: string) => {
    try {
      const userInfo = await getUserToken(stateToken);
      if (!userInfo) throw new Error('Error Fetching userInfo');

      const accessToken = userInfo.match(/Bearer\s+(\S+)/);
      if (accessToken) setAccessToken(accessToken[1]);
      console.log('token', accessToken);

      const userId = userInfo.match(/UserId=(\d+)/);
      if (userId) setUserId(userId[1]);

      const zipCode = userInfo.match(/ZipCode=([A-Za-z0-9]+)/);
      if (zipCode) setZipCode(zipCode[1]);
    } catch (error) {
      console.error(error);
    }
  };

  // const redirection = () => {
  //   if(redirectURL === 'onboarding') navigate('/onboarding');
  //   else if(redirectURL === 'home') navigate('/');
  //   else navigate('/notFound');
  // };

  useEffect(() => {
    if (stateToken) {
      setUserInfo(stateToken as string);
      // redirection();
    }
    // else navigate('/notFound');
  }, []);
  return <div></div>;
};

export default AuthCallbackPage;
