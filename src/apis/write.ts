// import { AxiosResponse } from 'axios';
import client from './client';

const postLetter = async (data: LetterRequest) => {
  try {
    const res = await client.post('/api/letters', data);
    if (!res) throw new Error('편지 전송과정중에서 오류가 발생했습니다.');
    console.log(`api 주소 : /api/letters, 전송타입 : post`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postFirstReply = async (data: FirstReplyRequest) => {
  try {
    const res = await client.post('/api/random-letters/matching', data);
    if (!res) throw new Error('최초 답장 전송과정중에서 오류가 발생했습니다.');
    console.log(`api 주소 : /api/random-letters/matching, 전송타입 : post`);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const getPrevLetter = async (
  letterId: string,
  setPrevLetterState: React.Dispatch<React.SetStateAction<PrevLetter[]>>,
  callBack?: () => void,
) => {
  try {
    const res = await client.get(`/api/letters/${letterId}/previous`);
    setPrevLetterState(res.data.data);
    if (callBack) callBack();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { postLetter, postFirstReply, getPrevLetter };
