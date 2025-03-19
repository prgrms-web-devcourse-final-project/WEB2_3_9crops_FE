import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import BackButton from '@/components/BackButton';
import { FONT_TYPE_OBJ, PAPER_TYPE_OBJ } from '@/pages/Write/constants';

const MatchedLetter = ({ matchedLetter }: { matchedLetter: MatchedLetter }) => {
  const navigate = useNavigate();

  useEffect(() => {}, [matchedLetter]);

  return (
    <>
      <div
        className={twMerge(
          `z-50 flex grow flex-col gap-3 px-5 pb-7.5`,
          PAPER_TYPE_OBJ[matchedLetter.paperType],
        )}
      >
        <div className="absolute top-5 left-0 flex w-full justify-between px-5">
          <BackButton />
        </div>
        <div className="flex flex-col gap-3 px-5">
          <span className="body-b mt-[55px]">TO. 따숨이</span>
          <span className="body-sb">{matchedLetter?.title}</span>
        </div>
        <textarea
          readOnly
          value={matchedLetter?.content}
          className={twMerge(
            `body-r basic-theme min-h-full w-full grow px-6`,
            FONT_TYPE_OBJ[matchedLetter.fontType],
          )}
        ></textarea>
        <span className="body-sb mt-10 flex justify-end">FROM. {matchedLetter.zipCode}</span>
        <button
          className="bg-primary-3 disabled:bg-gray-30 body-m mt-3 w-full rounded-lg py-2 disabled:text-white"
          onClick={() => {
            navigate(`/letter/write?letterId=${matchedLetter?.letterId}`, {
              state: { randomMatched: true, matchedLetter: matchedLetter },
            });
          }}
        >
          편지 작성하기
        </button>
      </div>
    </>
  );
};

export default MatchedLetter;
