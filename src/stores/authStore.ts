import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  userId: number | null;
  zipCode: string;
  accessToken: string;
  login: () => void;
  logout: () => void;
  setUserId: (userId: number) => void;
  setZipCode: (zipCode: string) => void;
  setAccessToken: (accessToken: string) => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      accessToken: '',
      userId: null,
      zipCode: '',
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, userId: null, zipCode: '' }),
      setUserId: (userId) => set({ userId: userId }),
      setZipCode: (zipCode) => set({ zipCode: zipCode }),
      setAccessToken: (accessToken) => set({ accessToken: accessToken }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
