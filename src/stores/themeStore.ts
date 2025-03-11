import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => ({
      theme: get()?.theme ?? 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';

          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          return { theme: newTheme };
        }),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useThemeStore;
