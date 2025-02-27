import useAuthStore from '@/stores/authStore';

import client from './client';

type LoginType = 'kakao' | 'naver' | 'google';
export const socialLogin = (loginType: LoginType) => {
  window.location.href = `http://13.209.132.150:8081/oauth2/authorization/${loginType}`;
};

export const logout = async () => {
  const { accessToken } = useAuthStore.getState();

  try {
    const response = await client.post(`/api/logout`, {
      Authorization: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    if (!response) throw new Error('logout fail');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserToken = async (stateToken: string) => {
  try {
    const response = await client.get(`/api/auth/token?state=${stateToken}`);
    if (!response) throw new Error('getUserToken: Error while fetching user token');
    const userInfo = response.data;
    if (userInfo) {
      return userInfo;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getZipCode = async () => {
  const { accessToken, userId, zipCode, isLoggedIn } = useAuthStore.getState();

  try {
    const response = await client.get(`/members/zipCode`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response) throw new Error('getZipCode: no response data');
    console.log(response);
    console.log('UserInfo', 'Id:', userId, 'isLoggedIn:', isLoggedIn, 'zipCode', zipCode);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getNewToken = async () => {
  try {
    const response = await client.get('/api/reissue', { withCredentials: true });
    if (!response) throw new Error('getNewTOken: no response data');
    return response;
  } catch (error) {
    console.error(error);
  }
};
