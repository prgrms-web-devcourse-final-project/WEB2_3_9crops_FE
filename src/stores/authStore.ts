import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useThemeStore from './themeStore';
import { useTheme } from '@emotion/react';

// import { postLogout } from '@/apis/auth';

interface AuthStore {
  isLoggedIn: boolean;
  zipCode: string;
  accessToken: string;
  login: () => void;
  logout: () => Promise<void>;
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
      logout: async () => {
        const theme = useThemeStore.getState().theme;
        const toggleTheme = useThemeStore.getState().toggleTheme;

        if (theme === 'dark') {
          toggleTheme();
        }
        set({ isLoggedIn: false, zipCode: '', accessToken: '' });
        // location.reload();
        // try {
        //   await postLogout();
        // } catch (e) {
        //   console.error(e);
        // }
      },
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
