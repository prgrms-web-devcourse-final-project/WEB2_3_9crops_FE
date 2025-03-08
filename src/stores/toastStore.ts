import { ReactNode } from 'react';
import { create } from 'zustand';

interface ToastObj {
  time: number;
  toastType: 'Warning' | 'Success' | 'Error' | 'Info';
  children: ReactNode;
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
    time: 1,
    toastType: 'Info',
    children: '',
  },
  setToastActive: (prompt) =>
    set((state) => ({
      isActive: true,
      toastObj: { ...state.toastObj, ...prompt },
    })),
  setToastUnActive: () => {
    set(() => ({
      isActive: false,
    }));
  },
}));

export default useToastStore;
