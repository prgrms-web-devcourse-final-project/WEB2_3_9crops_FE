import { create } from 'zustand';

import { T_stamp, T_theme } from '@/pages/Write/write';

interface T_writeStore {
  letterTitle: string;
  setLetterTitle: (typing: string) => void;
  letterText: string;
  setLetterText: (typing: string) => void;
  font: string;
  setFont: (selectedFont: string) => void;
  theme: T_theme;
  setTheme: (selectedTheme: T_theme) => void;
  stamp: T_stamp;
  setStamp: (selectedStamp: T_stamp) => void;
}
const useWrite = create<T_writeStore>((set) => ({
  letterTitle: '',
  setLetterTitle: (typing) => set(() => ({ letterTitle: typing })),
  letterText: '',
  setLetterText: (typing) => set(() => ({ letterText: typing })),
  font: 'pretendard',
  setFont: (selectedFont) => {
    set(() => ({ font: selectedFont }));
  },
  theme: '기본',
  setTheme: (selectedTheme) =>
    set(() => ({
      theme: selectedTheme,
    })),
  stamp: null,
  setStamp: (selectedStamp) => set(() => ({ stamp: selectedStamp })),
}));

export default useWrite;
