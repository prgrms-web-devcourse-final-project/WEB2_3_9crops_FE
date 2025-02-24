import client from './client';

export const getRequest = async (url: string, params?: unknown) => {
  try {
    const response = await client.get(url, { params });
    if (!response) throw new Error('not a valid response');
    return response.data;
  } catch (error) {
    //TODO 에러처리
    console.error('GET request failed', error);
  }
};

export const postRequest = async (url: string, data?: unknown) => {
  try {
    const response = await client.post(url, data);
    if (!response) throw new Error('not a valid response');
    return response.data;
  } catch (error) {
    //TODO 에러처리
    console.error('POST request failed', error);
  }
};
