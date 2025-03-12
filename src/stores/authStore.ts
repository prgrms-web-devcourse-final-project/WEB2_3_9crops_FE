import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useThemeStore from './themeStore';

interface AuthStore {
  isLoggedIn: boolean;
  zipCode: string;
  accessToken: string;
  isAdmin: boolean;
  login: () => void;
  logout: () => Promise<void>;
  setZipCode: (zipCode: string) => void;
  setAccessToken: (accessToken: string) => void;
  setIsAdmin: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      accessToken: '',
      zipCode: '',
      isAdmin: false,
      login: () => set({ isLoggedIn: true }),
      logout: async () => {
        const theme = useThemeStore.getState().theme;
        const toggleTheme = useThemeStore.getState().toggleTheme;

        if (theme === 'dark') {
          toggleTheme();
        }
        set({ isLoggedIn: false, zipCode: '', accessToken: '', isAdmin: false });
        // location.reload();
        // try {
        //   await postLogout();
        // } catch (e) {
        //   console.error(e);
        // }
      },
      setZipCode: (zipCode) => set({ zipCode: zipCode }),
      setAccessToken: (accessToken) => set({ accessToken: accessToken }),
      setIsAdmin: () => set({ isAdmin: true }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
