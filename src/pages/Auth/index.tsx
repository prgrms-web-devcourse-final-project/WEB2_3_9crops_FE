/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUserToken, getMydata, deleteUserInfo, postZipCode } from '@/apis/auth';
import useAuthStore from '@/stores/authStore';

const AuthCallbackPage = () => {
  const stateToken = new URLSearchParams(window.location.search).get('state');
  const redirectURL = new URLSearchParams(window.location.search).get('redirect');

  const { setZipCode, setAccessToken, login } = useAuthStore();

  const navigate = useNavigate();

  const setUserInfo = async (stateToken: string) => {
    try {
      const response = await getUserToken(stateToken);
      if (!response) throw new Error('Error Fetching userInfo');

      const userInfo = response.data;
      if (userInfo) {
        login();
        userInfo.accessToken && setAccessToken(userInfo.accessToken);

        if (redirectURL == 'home') {
          const zipCodeResponse = await getMydata();
          if (!zipCodeResponse) throw new Error('Error Fetching userInfo');
          const zipCode = zipCodeResponse.data.data.zipCode;
          zipCode && setZipCode(zipCode);

          console.log(
            'isLoggedIn',
            useAuthStore.getState().isLoggedIn,
            'access',
            useAuthStore.getState().accessToken,
            'zipCode',
            useAuthStore.getState().zipCode,
          );
        } else if (redirectURL === 'onboarding') {
          const createZipCodeResponse = await postZipCode();
          if (!createZipCodeResponse) throw new Error('Error creating ZipCode');
          const zipCode = createZipCodeResponse.data.data.zipCode;
          console.log(createZipCodeResponse);
          const newAccessToken = createZipCodeResponse.headers['Authorization'];
          setZipCode(zipCode);
          setAccessToken(newAccessToken);
          console.log(
            'isLoggedIn',
            useAuthStore.getState().isLoggedIn,
            'access',
            useAuthStore.getState().accessToken,
            'zipCode',
            useAuthStore.getState().zipCode,
          );
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const redirection = () => {
    if (redirectURL === 'onboarding') navigate('/onboarding');
    else if (redirectURL === 'home') navigate('/');
    else navigate('/notFound');
  };

  useEffect(() => {
    if (stateToken) {
      setUserInfo(stateToken as string);
      redirection();
    } else navigate('/notFound');
  }, []);

  const handleLeave = async () => {
    try {
      const response = await deleteUserInfo();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleLeave}>탈퇴</button>;
};

export default AuthCallbackPage;
