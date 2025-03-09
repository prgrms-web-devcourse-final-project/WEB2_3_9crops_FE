import { ReactNode } from 'react';
import { create } from 'zustand';

interface ToastObj {
  time: number;
  toastType: 'Warning' | 'Success' | 'Error' | 'Info';
  content: ReactNode;
  onClick?: () => void;
}

interface ToastStore {
  isActive: boolean;
  toastObj: ToastObj;
  setToastActive: (prompt: Partial<ToastObj>) => void;
  setToastUnActive: () => void;
}
const useToastStore = create<ToastStore>((set) => ({
  isActive: false,
  toastObj: {
    time: 3,
    toastType: 'Info',
    content: '',
    onClick: () => {},
  },
  setToastActive: (prompt) =>
    set((state) => ({
      isActive: true,
      toastObj: { ...state.toastObj, ...prompt },
    })),
  setToastUnActive: () => {
    set(() => ({
      isActive: false,
      toastObj: {
        time: 2,
        toastType: 'Info',
        content: '',
        onClick: () => {},
      },
    }));
  },
}));

export default useToastStore;
