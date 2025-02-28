import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  zipCode: string;
  accessToken: string;
  login: () => void;
  logout: () => void;
  setZipCode: (zipCode: string) => void;
  setAccessToken: (accessToken: string) => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      accessToken: '',
      zipCode: '',
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, zipCode: '', accessToken: '' }),
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
