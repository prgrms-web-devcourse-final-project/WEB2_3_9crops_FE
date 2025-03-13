import client from './client';

export const socialLogin = (loginType: LoginType) => {
  window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/${loginType}`;
};

export const getUserToken = async (stateToken: string) => {
  try {
    const response = await client.get(`/api/auth/token?state=${stateToken}`);
    if (!response) throw new Error('getUserToken: Error while fetching user token');
    const userInfo = response.data;
    if (userInfo) {
      return userInfo;
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postZipCode = async () => {
  try {
    const response = await client.post(`/api/members/zipCode`);
    if (!response) throw new Error('fail to post ZipCode');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getNewToken = async () => {
  try {
    const response = await client.post('/api/reissue', {}, { withCredentials: true });
    if (!response) throw new Error('getNewToken: no response data');
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMydata = async () => {
  try {
    const response = await client.get('/api/members/me');
    if (!response) throw new Error('getNewToken: no response data');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserInfo = async () => {
  try {
    const response = await client.delete('/api/members/me', {
      withCredentials: true,
    });
    if (!response) throw new Error('deleteUserInfo: no response');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postLogout = async () => {
  try {
    const response = await client.post('/api/logout', { withCredentials: true });
    if (!response) throw new Error('postLogout: failed to logout');
    return response;
  } catch (error) {
    console.error(error);
  }
};
