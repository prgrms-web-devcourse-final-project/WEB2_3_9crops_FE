import { create } from 'zustand';

interface WriteStore {
  letterRequest: LetterRequest;
  setLetterRequest: (newLetterRequest: Partial<LetterRequest>) => void;
  resetLetterRequest: () => void;
}
const useWrite = create<WriteStore>((set) => ({
  letterRequest: {
    receiverId: null,
    parentLetterId: null,
    title: '',
    content: '',
    category: 'CONSOLATION',
    paperType: 'BASIC',
    fontType: 'DEFAULT',
  },
  setLetterRequest: (updateRequest) =>
    set((state) => ({
      letterRequest: { ...state.letterRequest, ...updateRequest },
    })),

  resetLetterRequest: () => {
    set(() => ({
      letterRequest: {
        receiverId: null,
        parentLetterId: null,
        title: '',
        content: '',
        category: 'CONSOLATION',
        paperType: 'BASIC',
        fontType: 'DEFAULT',
      },
    }));
  },
}));

export default useWrite;
