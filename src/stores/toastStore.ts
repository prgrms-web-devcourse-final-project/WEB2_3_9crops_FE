import { create } from 'zustand';

interface ToastObj {
  time: number;
  toastType: 'Warning' | 'Success' | 'Error' | 'Info';
  position: 'Top' | 'Bottom';
  title: string;
  onClick?: () => void;
}

interface ToastStore {
  toastObjects: ToastObj[] | [];
  setToastActive: (prompt: Partial<ToastObj>) => void;
  setToastUnActive: (idx: number) => void;
}

// 토스트 기본형
const toastObjFormat: ToastObj = {
  time: 2,
  toastType: 'Info',
  position: 'Bottom',
  title: '',
  onClick: () => {},
};

const useToastStore = create<ToastStore>((set) => ({
  toastObjects: [],
  setToastActive: (prompt) =>
    set((state) => ({
      toastObjects: [...state.toastObjects, { ...toastObjFormat, ...prompt }],
    })),
  setToastUnActive: (idx) => {
    set((state) => ({
      toastObjects: state.toastObjects.filter((target, currentIdx) => {
        if (currentIdx === idx) {
          return null;
        }
        return target;
      }),
    }));
  },
}));

export default useToastStore;
