import { CATEGORYS } from '../pages/Write/constants';

import LetterWrapper from './LetterWrapper';

export default function ResultLetter({
  categoryName = 'CONSOLATION',
  title,
  zipCode = 'error',
}: {
  categoryName: Category;
  title: string;
  zipCode?: string;
}) {
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <LetterWrapper>
      <div className="flex w-full flex-col gap-[35px]">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2.5">
            <span className="caption-b text-gray-60">따숨이님께</span>
            <span className="caption-r text-gray-80 line-clamp-3 break-all">{title}</span>
          </div>
          <img src={CATEGORYS[categoryName]} alt="우표" />
        </div>
        <img src={CATEGORYS[categoryName]} alt="우표" />
      </div>
      <div className="flex flex-col gap-[5px]">
        <span className="caption-sb text-gray-60">{today}</span>
        <div className="flex gap-1">
          {zipCode.split('').map((spell, idx) => {
            return (
              <span
                className="caption-r flex h-6 w-6 items-center justify-center rounded-sm bg-white/40"
                key={idx}
              >
                {spell}
              </span>
            );
          })}
        </div>
      </div>
    </LetterWrapper>
  );
}
