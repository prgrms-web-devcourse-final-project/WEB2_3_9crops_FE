import client from './client';

const getTimeLines = async (getNoti: React.Dispatch<React.SetStateAction<Noti[]>>) => {
  try {
    const res = await client.get('/api/timelines');
    if (!res) throw new Error('타임라인을 받아오는 도중 오류가 발생했습니다.');
    getNoti(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { getTimeLines };
