import client from './client';

const getLetter = async (letterId: string) => {
  try {
    const res = await client.get(`/api/letters/${letterId}`);
    if (!res) throw new Error('편지 데이터를 가져오는 도중 에러가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteLetter = async (letterId: string) => {
  try {
    console.log(`/api/letters/${letterId}`);
    const res = await client.delete(`/api/letters/${letterId}`);
    if (!res) throw new Error('편지 삭제 요청 도중 에러가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { getLetter, deleteLetter };
