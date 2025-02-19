import letterPink from '@/assets/images/letter-pink.png';
import useWrite from '@/stores/writeStore';

import { STAMPS } from '../constants';

export default function ResultLetter({
  stampName = '위로와 공감',
}: {
  stampName: '위로와 공감' | '축하와 응원' | '고민 상담' | '기타' | '답변자';
}) {
  const address = '1A3E2';
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const letterTitle = useWrite((state) => state.letterTitle);
  return (
    <div
      className="flex w-full flex-col gap-[35px] p-4"
      style={{ backgroundImage: `url(${letterPink})` }}
    >
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-2.5">
          <span className="caption-b text-gray-60">따숨이님께</span>
          <span className="caption-r text-gray-80 line-clamp-3 break-all">{letterTitle}</span>
        </div>
        <img src={STAMPS[stampName]} alt="우표" />
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
