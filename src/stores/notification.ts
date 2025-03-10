import { create } from 'zustand';

interface NotificationStore {
  notReadCount: number;
  addNotReadCount: () => void;
}
const useNotificationStore = create<NotificationStore>((set) => ({
  notReadCount: 0,
  addNotReadCount: () =>
    set((state) => ({
      notReadCount: state.notReadCount + 1,
    })),
}));

export default useNotificationStore;
