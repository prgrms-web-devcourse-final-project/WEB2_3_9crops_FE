import client from './client';

const postLetter = async (data: LetterRequest) => {
  try {
    const res = await client.post('/api/letters', data);
    if (!res) throw new Error('편지 전송과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    const errorWithStatus = error as unknown as { status: number };
    console.error(error);
    return errorWithStatus;
  }
};

const postFirstReply = async (data: FirstReplyRequest) => {
  try {
    const res = await client.post('/api/random-letters/matching', data);
    if (!res) throw new Error('최초 답장 전송과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getPrevLetter = async (letterId: string) => {
  try {
    const res = await client.get(`/api/letters/${letterId}/previous`);
    if (!res) throw new Error('이전편지를 불러오는중 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postTemporarySave = async (data: TemporaryRequest) => {
  try {
    const res = client.post(`/api/letters/temporary-save`, data);
    if (!res) throw new Error('편지 임시저장과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postTemporaryLetter = async (data: TemporaryRequest) => {
  try {
    const res = await client.post('/api/letters', data);
    if (!res) throw new Error('편지 전송과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    const errorWithStatus = error as unknown as { status: number };
    console.error(error);
    return errorWithStatus;
  }
};

export { postLetter, postFirstReply, getPrevLetter, postTemporarySave, postTemporaryLetter };
