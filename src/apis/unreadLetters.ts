import client from './client';

export const getUnreadLettersCount = async (): Promise<UnreadLetters> => {
  try {
    const response = await client.get('/api/letters/unread/count');
    console.log('📩 안 읽은 편지 개수 데이터', response);
    return response.data;
  } catch (error) {
    console.error('❌안 읽은 편지 개수를 받아오던 중 에러가 발생했습니다', error);
    throw new Error('안 읽은 편지 개수 조회 실패');
  }
};
