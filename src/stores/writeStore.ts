import { create } from 'zustand';

interface WriteStore {
  letterTitle: string;
  setLetterTitle: (typing: string) => void;
  letterText: string;
  setLetterText: (typing: string) => void;
  font: string;
  setFont: (selectedFont: string) => void;
  theme: Theme;
  setTheme: (selectedTheme: Theme) => void;
  stamp: Stamp;
  setStamp: (selectedStamp: Stamp) => void;
}
const useWrite = create<WriteStore>((set) => ({
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
