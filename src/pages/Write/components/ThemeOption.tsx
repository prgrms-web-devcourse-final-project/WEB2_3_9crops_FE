import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import { THEMES } from '../constants';

export default function ThemeOption() {
  const theme = useWrite((state) => state.theme);
  const setTheme = useWrite((state) => state.setTheme);
  return (
    <div className="flex w-full gap-3 overflow-x-scroll px-4 pt-3 pb-[30px]">
      {THEMES.map((target, idx) => {
        return (
          <button
            className="flex w-[30%] min-w-[30%] cursor-pointer flex-col gap-1.5"
            key={idx}
            onClick={() => {
              setTheme(target.name);
            }}
          >
            <span className="caption-m">{target.name}</span>
            <img
              src={target.src}
              alt="테마 이미지"
              className={twMerge(
                'w-full',
                theme === target.name && 'border-primary-1-hover border-2',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
