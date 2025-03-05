import client from './client';

export interface DraftLetter {
  letterId: number;
  writerId: number;
  receiverId: number;
  parentLetterId: number;
  zipCode: string;
  title: string;
  content: string;
  category: string;
  paperType: string;
  fontType: string;
  deliveryStartedAt: string;
  deliveryCompletedAt: string;
  matched: boolean;
}

export const getDraftLetters = async (): Promise<DraftLetter[]> => {
  try {
    const { data } = await client.get('/api/letters?status=draft', {});
    console.log('임시저장된 편지 데이터', data);
    return data.data;
  } catch (error) {
    console.error(`❌임시저장된 편지를 불러오던 중 에러가 발생했습니다`, error);
    throw new Error('임시저장된 편지 불러오기 실패');
  }
};
