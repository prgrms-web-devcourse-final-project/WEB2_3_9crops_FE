import { create } from 'zustand';

import { getIncomingLetters } from '@/apis/incomingLetters';

interface IncomingLetters {
  letterId: number;
  title: string;
  deliveryStartedAt: string;
  deliveryCompletedAt: string;
  remainingTime: string;
}

interface IncomingLettersStore {
  data: IncomingLetters[];
  fetchIncomingLetters: () => void;
}

const formatTime = (time: number): string => (time < 10 ? `0${time}` : `${time}`);

const calculatingRemainingTime = (deliveryCompletedAt: string): string => {
  const completedAt = new Date(deliveryCompletedAt).getTime();
  const now = new Date().getTime();
  const diff = completedAt - now;

  if (diff <= 0) return '00:00:00';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
};

export const useIncomingLettersStore = create<IncomingLettersStore>((set) => ({
  data: [],
  fetchIncomingLetters: async () => {
    try {
      const data = await getIncomingLetters();

      const updatedLetters = data.data.map((letter: IncomingLetters) => {
        const remainingTime = calculatingRemainingTime(letter.deliveryCompletedAt);

        return { ...letter, remainingTime };
      });

      const inProgressLetters = updatedLetters.filter(
        (letter: IncomingLetters) => letter.remainingTime !== '00:00:00',
      );

      set({
        data: inProgressLetters,
      });

      setInterval(() => {
        set((state) => {
          const updatedLetters = state.data.map((letter: IncomingLetters) => {
            const remainingTime = calculatingRemainingTime(letter.deliveryCompletedAt);
            return { ...letter, remainingTime };
          });

          const filteredLetters = updatedLetters.filter(
            (letter) => letter.remainingTime !== '00:00:00',
          );

          return {
            data: filteredLetters,
          };
        });
      }, 1000);
    } catch (error) {
      console.error('❌오고 있는 편지 목록을 불러오던 중 에러 발생', error);
    }
  },
}));
