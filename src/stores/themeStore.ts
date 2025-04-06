import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const getAutoTheme = (): 'light' | 'dark' => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => {
      const applyTheme = (theme: 'light' | 'dark') => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      };

      const initialTheme = get()?.theme ?? getAutoTheme();
      applyTheme(initialTheme);

      return {
        theme: initialTheme,
        toggleTheme: () =>
          set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
            return { theme: newTheme };
          }),
      };
    },
    {
      name: 'theme',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
export default useThemeStore;
