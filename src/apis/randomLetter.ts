import client from './client';

const getRandomLetters = async (category: string | null) => {
  try {
    const res = await client.get(`/api/random-letters/${category}`);
    if (!res) throw new Error('랜덤 편지 데이터를 가져오는 도중 에러가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

interface ApproveRequest {
  letterId: string;
  writerId: string;
}
const postRandomLettersApprove = async (approveRequest: ApproveRequest, callBack?: () => void) => {
  try {
    console.log('엔드포인트 : /api/random-letters/approve');
    console.log('request', approveRequest);
    const res = await client.post('/api/random-letters/approve', approveRequest);
    if (!res) throw new Error('랜덤편지 매칭수락 도중 에러가 발생했습니다.');
    if (callBack) callBack();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const getRandomLetterMatched = async (callBack?: () => void) => {
  try {
    const res = await client.post('/api/random-letters/valid-table');
    if (!res)
      throw new Error('랜덤 편지 최종 매칭 시간 검증 데이터를 가자오는 도중 에러가 발생했습니다.');
    if (callBack) callBack();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getRandomLetterCoolTime = async (callBack?: () => void) => {
  try {
    const res = await client.post('/api/random-letters/valid');
    if (!res)
      throw new Error('랜덤 편지 최종 매칭 시간 검증 데이터를 가자오는 도중 에러가 발생했습니다.');
    if (callBack) callBack();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteRandomLetterMatching = async () => {
  try {
    const res = await client.delete('/api/random-letters/matching/cancel');
    if (!res) throw new Error('매칭 취소 도중 에러가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export {
  getRandomLetters,
  postRandomLettersApprove,
  getRandomLetterCoolTime,
  getRandomLetterMatched,
  deleteRandomLetterMatching,
};
