import letterPink from '@/assets/images/letter-pink.png';

import { CATEGORYS } from '../pages/Write/constants';

export default function ResultLetter({
  categoryName = 'CONSOLATION',
  title,
}: {
  categoryName: Category;
  title: string;
}) {
  const address = '1A3E2';
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <div
      className="flex w-full max-w-[300px] flex-col gap-[35px] p-4"
      style={{ backgroundImage: `url(${letterPink})` }}
    >
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-2.5">
          <span className="caption-b text-gray-60">따숨이님께</span>
          <span className="caption-r text-gray-80 line-clamp-3 break-all">{title}</span>
        </div>
        <img src={CATEGORYS[categoryName]} alt="우표" />
      </div>
      <div className="flex flex-col gap-[5px]">
        <span className="caption-sb text-gray-60">{today}</span>
        <div className="flex gap-1">
          {address.split('').map((spell, idx) => {
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
    </div>
  );
}
