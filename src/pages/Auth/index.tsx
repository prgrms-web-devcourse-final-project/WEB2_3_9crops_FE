import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUserToken, getMydata, postZipCode } from '@/apis/auth';
import useAuthStore from '@/stores/authStore';

const AuthCallbackPage = () => {
  const stateToken = new URLSearchParams(window.location.search).get('state');
  const redirectURL = new URLSearchParams(window.location.search).get('redirect');
  const error = new URLSearchParams(window.location.search).get('error');

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setZipCode = useAuthStore((state) => state.setZipCode);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);
  const navigate = useNavigate();
  let accessToken = '';
  let role = '';

  const handleError = (error: unknown) => {
    console.error('AuthCallback Error:', error);
    logout();
    navigate('/login', { replace: true });
  };

  const setUserInfo = async (stateToken: string) => {
    try {
      const response = await getUserToken(stateToken);
      if (!response) throw new Error('Error fetching user token');

      const userInfo = response.data;
      if (!userInfo) throw new Error('Invalid user info');

      login();
      if (userInfo.accessToken) setAccessToken(userInfo.accessToken);
      accessToken = userInfo.accessToken;

      switch (redirectURL) {
        case 'home':
          {
            const zipCodeResponse = await getMydata();
            if (!zipCodeResponse) throw new Error('Error fetching user data');
            setZipCode(zipCodeResponse.data.data.zipCode);
          }
          break;

        case 'onboarding':
          {
            const createZipCodeResponse = await postZipCode();
            if (!createZipCodeResponse) throw new Error('Error creating ZipCode');

            setZipCode(createZipCodeResponse.data.data.zipCode);
            const newAccessToken = createZipCodeResponse.headers['authorization']?.split(' ')[1];
            if (!newAccessToken) throw new Error('Missing new access token');

            setAccessToken(newAccessToken);
            accessToken = newAccessToken;
          }
          break;

        default:
          navigate('/notFound');
          return;
      }

      role = JSON.parse(atob(accessToken.split('.')[1])).role;

      if (role === 'ADMIN') {
        setIsAdmin();
        navigate('/admin');
      } else {
        navigate(redirectURL === 'onboarding' ? '/onboarding' : '/');
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!stateToken) {
      if (error === 'deleted_member') {
        navigate('/login');
        alert('탈퇴한 회원입니다. 관리자에게 문의 부탁드립니다.');
        return;
      }
      navigate('/notFound');
      if (error === 'deleted_member') {
        alert('탈퇴한 회원입니다.');
      }
      return;
    }

    const fetchData = async () => {
      await setUserInfo(stateToken as string);
    };

    fetchData();
  }, [stateToken, navigate]);

  return null;
};

export default AuthCallbackPage;
