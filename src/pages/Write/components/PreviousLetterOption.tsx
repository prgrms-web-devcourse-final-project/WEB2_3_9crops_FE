import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PreviousLetterOption({ prevLetter = [] }: { prevLetter: PrevLetter[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex w-full flex-col gap-3 px-4 pt-3 pb-[30px]">
      <div className="flex flex-col gap-1.5">
        <div className="caption-m flex justify-between">
          <span>{prevLetter[index].title}</span>
          <div className="flex gap-1">
            {prevLetter?.map((_, idx) => {
              return (
                <button
                  className={twMerge(
                    `flex h-5 w-5 items-center justify-center rounded-full bg-white`,
                    idx === index && 'bg-primary-1',
                  )}
                  onClick={() => setIndex(idx)}
                  key={idx}
                  aria-label="과거에 주고 받은 편지"
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-[305px] w-full overflow-y-scroll rounded-lg bg-white px-4 py-2">
          {prevLetter![index].content}
        </div>
      </div>
    </div>
  );
}
