import client from './client';

const getRandomLetters = async (
  setRandomLettersState: React.Dispatch<React.SetStateAction<RandomLetters[]>>,
  category: string | null,
) => {
  try {
    const res = await client.get(`/api/random/${category}`);
    if (!res) throw new Error('랜덤 편지 데이터를 가져오는 도중 에러가 발생했습니다.');
    setRandomLettersState(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { getRandomLetters };
