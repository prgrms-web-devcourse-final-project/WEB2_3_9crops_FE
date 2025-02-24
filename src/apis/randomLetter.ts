import { client } from './client';

const getRandomLetters = async (
  setRandomLettersState: React.Dispatch<React.SetStateAction<RandomLetters[]>>,
  category: string | null,
) => {
  try {
    const res = await client.get(`/api/random/${category}`);
    setRandomLettersState(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { getRandomLetters };
