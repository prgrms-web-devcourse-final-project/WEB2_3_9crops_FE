import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  userId: number | null;
  zipCode: string;
  login: () => void;
  logout: () => void;
  setUserId: (userId: number) => void;
  setZipCode: (zipCode: string) => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      userId: null,
      zipCode: '',
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, userId: null, zipCode: '' }),
      setUserId: (userId) => set({ userId: userId }),
      setZipCode: (zipCode) => set({ zipCode: zipCode }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
