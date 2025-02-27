import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getUserToken } from '@/apis/auth';
import useAuthStore from '@/stores/authStore';

const AuthCallbackPage = () => {
  const stateToken = new URLSearchParams(window.location.search).get('state');
  const { setUserId, setZipCode, setAccessToken, zipCode } = useAuthStore.getState();
  const [role, setRole] = useState<string>('');

  const navigate = useNavigate();

  const setUserInfo = async (stateToken: string) => {
    try {
      const userInfo = await getUserToken(stateToken);
      if (!userInfo) throw new Error('Error Fetching userInfo');

      const accessToken = userInfo.match(/Bearer\s+(\S+)/);
      if (accessToken) setAccessToken(accessToken[1]);

      const role = userInfo.match(/Role=([\w-]+)/);
      if (role) setRole(role);

      const userId = userInfo.match(/UserId=(\d+)/);
      if (userId) setUserId(userId[1]);

      const zipCode = userInfo.match(/ZipCode=([A-Za-z0-9]+)/);
      if (zipCode) setZipCode(zipCode[1]);
    } catch (error) {
      console.error(error);
    }
  };

  const redirection = () => {
    if (role === 'admin') navigate('/report');
    else {
      if (!zipCode) navigate('/onboarding');
      else navigate('/');
    }
  };

  useEffect(() => {
    if (stateToken) {
      setUserInfo(stateToken as string);
      redirection();
    } else navigate('/notFound');
  }, []);
  return <div></div>;
};

export default AuthCallbackPage;
