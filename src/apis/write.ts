// import { AxiosResponse } from 'axios';
import client from './client';

const postLetter = async (data: LetterRequest) => {
  console.log('request', data);
  try {
    const res = await client.post('/api/letters', data);
    if (!res) throw new Error('편지 전송과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postFirstReply = async (data: FirstReplyRequest) => {
  console.log('Firstrequest', data);
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

// 임시저장 최초 생성
const postTemporarySave = async (data: TemporaryRequest) => {
  try {
    const res = client.post(`/api/letters/temporary-save`, data);
    if (!res) throw new Error('편지 임시저장과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 임시저장 수정
const PatchTemporarySave = async (data: TemporaryRequest) => {
  try {
    const res = client.post(`/api/letters/temporary-save`, data);
    if (!res) throw new Error('편지 임시저장과정에서 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { postLetter, postFirstReply, getPrevLetter, postTemporarySave, PatchTemporarySave };
