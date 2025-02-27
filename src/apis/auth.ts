import client from './client';

type LoginType = 'kakao' | 'naver' | 'google';
export const socialLogin = (loginType: LoginType) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { setUserId, setZipCode, login } = useAuthStore.getState();

  window.location.href = `http://13.209.132.150:8081/oauth2/authorization/${loginType}`;
};

//임시 코드
export const getUserToken = async (stateToken: string) => {
  try {
    const response = await client.get(`/api/auth/token?state=${stateToken}`);
    if (!response) throw new Error('getUserToken: Error while fetching user token');
    const userInfo = response.headers['authorization'];

    if (userInfo) {
      return userInfo;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getZipCode = async (accessToken: string) => {
  try {
    const response = await client.get(`/members/zipCode`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response) throw new Error('getZipCode: no response data');
    console.log(response);
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
