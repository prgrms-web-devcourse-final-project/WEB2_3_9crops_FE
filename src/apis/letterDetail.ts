import client from './client';

const getLetter = async (letterId: string) => {
  try {
    const res = await client.get(`/api/letters/${letterId}`);
    if (!res) throw new Error('편지 데이터를 가져오는 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteLetter = async (letterId: string) => {
  try {
    const res = await client.delete(`/api/letters/${letterId}`);
    if (!res) throw new Error('편지 삭제 요청 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postEvaluateLetter = async (letterId: number, evaluation: LetterEvaluation) => {
  try {
    const res = await client.post(`/api/letters/${letterId}/evaluate`, {
      evaluation: evaluation,
    });
    if (!res) throw new Error('편지 삭제 요청 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { getLetter, deleteLetter, postEvaluateLetter };
