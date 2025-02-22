import { client } from './client';

const postLetter = async (
  data: LetterRequest,
  setState?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const res = await client.post('/api/letters', data);
    if (setState) setState(true);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const getPrevLetter = async (
  setPrevLetterState: React.Dispatch<React.SetStateAction<PrevLetter[]>>,
  searchParams: URLSearchParams,
) => {
  try {
    const res = await client.get(`/api/letters/${searchParams.get('letterId')}/previous`);
    setPrevLetterState(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { postLetter, getPrevLetter };
