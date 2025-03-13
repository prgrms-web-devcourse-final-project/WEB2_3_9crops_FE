import { twMerge } from 'tailwind-merge';

import { CheckIcon } from '@/assets/icons';
import useWrite from '@/stores/writeStore';

import { FONT_LIST } from '../constants';

export default function FontOption() {
  const letterRequest = useWrite((state) => state.letterRequest);
  const setLetterRequest = useWrite((state) => state.setLetterRequest);
  return (
    <div className="flex w-full flex-col gap-3 px-4 pt-3 pb-[30px]">
      <div className="flex h-[330px] flex-col gap-3 overflow-y-scroll">
        {FONT_LIST.map((font, idx) => {
          return (
            <div className="w-full" key={idx}>
              <div className="flex flex-col items-start gap-1.5">
                <p className="caption-m">{font.fontName}</p>
                <button
                  className={twMerge(
                    'caption-m flex-start flex w-full items-center justify-between rounded-lg bg-white px-3 py-2',
                    `${font.fontFamily}`,
                  )}
                  onClick={() => {
                    setLetterRequest({ fontType: font.fontType });
                  }}
                  aria-label="편지 글꼴 선택"
                >
                  안녕! 나는 따수미야! 0123456789{' '}
                  <CheckIcon
                    className={twMerge(
                      `h-5 w-5 ${letterRequest.fontType === font.fontType ? 'text-primary-1-hover' : 'text-black'}`,
                    )}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
