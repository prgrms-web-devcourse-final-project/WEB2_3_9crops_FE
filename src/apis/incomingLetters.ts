import client from './client';

export const fetchIncomingLettersApi = async (token: string) => {
  try {
    const { data } = await client.get('/api/letters?status=delivery', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('불러온 데이터', data);
    return data;
  } catch (error) {
    console.error('❌오고 있는 편지 목록을 불러오던 중 에러 발생', error);
    throw error;
  }
};
