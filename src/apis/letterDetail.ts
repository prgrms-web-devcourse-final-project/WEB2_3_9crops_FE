import { client } from './client';

const getLetter = async (
  letterId: string,
  setLetterState: React.Dispatch<React.SetStateAction<LetterDetail | null>>,
) => {
  try {
    const res = await client.get(`/api/letters/${letterId}`);
    setLetterState(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { getLetter };
