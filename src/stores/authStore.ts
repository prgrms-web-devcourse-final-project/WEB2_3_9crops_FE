import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useThemeStore from './themeStore';
import { getNewToken } from '@/apis/auth';

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
  isRefreshing: boolean;
  refreshPromise: Promise<string> | null;
  refreshToken: () => Promise<string>;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
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
      isRefreshing: false,
      refreshPromise: null,
      refreshToken: async () => {
        // 이미 재발급 중이면 진행 중인 Promise 반환
        if (get().isRefreshing && get().refreshPromise) {
          return get().refreshPromise;
        }
        const refreshPromise = getNewToken()
          .then((response) => {
            if (response?.status !== 200) throw new Error('Token refresh failed');
            const newToken = response?.data.data.accessToken;
            set({ accessToken: newToken, isRefreshing: false, refreshPromise: null });
            return newToken;
          })
          .catch((error) => {
            set({ isRefreshing: false, refreshPromise: null });
            // 재발급 실패 시 로그아웃
            if (get().isLoggedIn) get().logout();
            throw error;
          });

        set({ isRefreshing: true, refreshPromise });
        return refreshPromise;
      },
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
