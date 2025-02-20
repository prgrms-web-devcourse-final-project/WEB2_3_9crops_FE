import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import CheckIcon from './CheckIcon';

export default function FontOption() {
  const fonts = [
    {
      fontName: '기본',
      fontFamily: 'pretendard',
    },
    {
      fontName: 'KoPub바탕',
      fontFamily: 'batang',
    },
    {
      fontName: '교보손글씨 2020 박도연',
      fontFamily: 'kobyo',
    },
    {
      fontName: '인천 교육 힘찬',
      fontFamily: 'himchan',
    },
  ];
  const [selected, setSelected] = useState<number>(0);

  const setFont = useWrite((state) => state.setFont);

  return (
    <div className="flex w-full flex-col gap-3 px-4 pt-3 pb-[30px]">
      <div className="flex h-[330px] flex-col gap-3 overflow-y-scroll">
        {fonts.map((font, idx) => {
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
                    setSelected(idx);
                    setFont(font.fontFamily);
                  }}
                >
                  안녕! 나는 따수미야! 0123456789 <CheckIcon idx={idx} selected={selected} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
