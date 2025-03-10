import { create } from 'zustand';

interface NotificationStore {
  notReadCount: number;
  incrementNotReadCount: () => void;
  decrementNotReadCount: () => void;
  setNotReadCount: (updateCount: number) => void;
}
const useNotificationStore = create<NotificationStore>((set) => ({
  notReadCount: 0,
  incrementNotReadCount: () =>
    set((state) => ({
      notReadCount: state.notReadCount + 1,
    })),
  decrementNotReadCount: () =>
    set((state) => ({
      notReadCount: state.notReadCount - 1,
    })),
  setNotReadCount: (updateCount) =>
    set(() => ({
      notReadCount: updateCount,
    })),
}));

export default useNotificationStore;
