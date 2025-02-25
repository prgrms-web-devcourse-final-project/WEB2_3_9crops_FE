import client from './client';

export const fetchMyPageInfo = async () => {
  try {
    const response = await client.get('/api/members/me');
    if (!response) throw new Error('❌데이터를 불러오던 중 오류가 발생했습니다');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
