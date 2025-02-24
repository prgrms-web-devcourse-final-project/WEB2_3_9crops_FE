import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import { CATEGORY_LIST } from '../constants';

export default function ThemeOption() {
  const paperType = useWrite((state) => state.paperType);
  const setPaperType = useWrite((state) => state.setPaperType);
  return (
    <div className="flex w-full gap-3 overflow-x-scroll px-4 pt-3 pb-[30px]">
      {CATEGORY_LIST.map((target, idx) => {
        return (
          <button
            className="flex w-[30%] min-w-[30%] flex-col gap-1.5"
            key={idx}
            onClick={() => {
              setPaperType(target.paperType);
            }}
          >
            <span className="caption-m">{target.name}</span>
            <img
              src={target.src}
              alt="테마 이미지"
              className={twMerge(
                'w-full',
                paperType === target.paperType && 'border-primary-1-hover border-2',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
