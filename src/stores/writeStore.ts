import { create } from 'zustand';

interface WriteStore {
  letterTitle: string;
  setLetterTitle: (typing: string) => void;
  letterText: string;
  setLetterText: (typing: string) => void;
  fontType: FontType;
  setFontType: (selectedFontType: FontType) => void;
  paperType: PaperType;
  setPaperType: (selectedPaperType: PaperType) => void;
  category: Category;
  setCategory: (selectedCategory: Category) => void;
  resetWrite: () => void;
}
const useWrite = create<WriteStore>((set) => ({
  letterTitle: '',
  setLetterTitle: (typing) => set(() => ({ letterTitle: typing })),

  letterText: '',
  setLetterText: (typing) => set(() => ({ letterText: typing })),

  fontType: 'DEFAULT',
  setFontType: (selectedFontType) => {
    set(() => ({ fontType: selectedFontType }));
  },

  paperType: 'BASIC',
  setPaperType: (selectedPaperType) =>
    set(() => ({
      paperType: selectedPaperType,
    })),

  category: 'CONSOLATION',
  setCategory: (selectedCategory) => set(() => ({ category: selectedCategory })),

  resetWrite: () =>
    set(() => ({
      letterTitle: '',
      letterText: '',
      fontType: 'DEFAULT',
      paperType: 'BASIC',
      category: 'CONSOLATION',
    })),
}));

export default useWrite;
