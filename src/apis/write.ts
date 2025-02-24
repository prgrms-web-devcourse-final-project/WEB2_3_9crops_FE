import { client } from './client';

const postLetter = async (data: LetterRequest, callBack?: () => void) => {
  try {
    const res = await client.post('/api/letters', data);
    if (callBack) callBack();
    console.log(res);
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

export { postLetter, getPrevLetter };
