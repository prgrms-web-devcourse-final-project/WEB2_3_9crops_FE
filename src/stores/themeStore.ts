import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  applyAutoTheme: () => void;
}

const getAutoTheme = (): 'light' | 'dark' => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

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

      applyAutoTheme: () => {
        const autoTheme = getAutoTheme();
        set({ theme: autoTheme });
        document.documentElement.classList.toggle('dark', autoTheme === 'dark');
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

useThemeStore.getState().applyAutoTheme();

export default useThemeStore;
