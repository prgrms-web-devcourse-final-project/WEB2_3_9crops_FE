import client from './client';

export interface DraftLetter {
  letterId: number;
  matchingId: number;
  receiverId: number;
  parentLetterId: number;
  title: string;
  content: string;
  category: string;
  paperType: string;
  fontType: string;
}

export const getDraftLetters = async (): Promise<DraftLetter[]> => {
  try {
    const { data } = await client.get('/api/letters?status=draft', {});
    console.log('임시저장된 편지 데이터', data);
    return data.data;
  } catch (error) {
    console.error('❌임시저장된 편지를 불러오던 중 에러가 발생했습니다', error);
    throw new Error('임시저장된 편지 불러오기 실패');
  }
};

export const deleteDraftLetters = async (letterId: number) => {
  try {
    const { data } = await client.delete(`/api/letters/${letterId}/temporary-save`);

    if (data.data?.letterId) {
      console.log('삭제된 임시저장 편지 ID:', data.data.letterId);
    } else {
      console.error('❌서버 응답에 letterId가 존재하지 않습니다.');
    }

    return data.data.letterId;
  } catch (error) {
    console.error('❌임시저장된 편지를 삭제하던 중 에러가 발생했습니다:', error);
    throw error;
  }
};
