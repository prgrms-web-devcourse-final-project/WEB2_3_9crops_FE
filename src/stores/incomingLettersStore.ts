import { create } from 'zustand';

import { client } from '@/apis/client';

interface IncomingLetters {
  letterId: number;
  title: string;
  deliveryStartedAt: string;
  deliveryCompletedAt: string;
  remainingTime: string;
}

interface IncomingLettersStore {
  data: IncomingLetters[];
  message: string;
  timestamp: string;
  fetchIncomingLetters: () => void;
}

function formatTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

function calculatingRemainingTime(deliveryCompletedAt: string): string {
  const completedAt = new Date(deliveryCompletedAt).getTime();

  const now = new Date().getTime();

  const diff = completedAt - now;

  if (diff <= 0) return '00:00:00';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

export const useIncomingLettersStore = create<IncomingLettersStore>((set) => ({
  data: [],
  message: '',
  timestamp: '',
  fetchIncomingLetters: async () => {
    try {
      const { data } = await client.get('/api/letters?status=delivery', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('API 응답 데이터:', data);
      console.log(data.message);

      const updatedLetters = data.data
        .map((letter: IncomingLetters) => ({
          ...letter,
          remainingTime: calculatingRemainingTime(letter.deliveryCompletedAt),
        }))
        .filter((letter: IncomingLetters) => letter.remainingTime !== '00:00:00');

      set({
        data: updatedLetters,
        message: data.message,
        timestamp: data.timestamp,
      });
    } catch (error) {
      console.error('❌오고 있는 편지 목록을 불러오던 중 에러 발생', error);
    }
  },
}));
