import { twMerge } from 'tailwind-merge';

import celebrationStamp from '@/assets/images/celebration-stamp.png';
import consolationStamp from '@/assets/images/consolation-stamp.png';
import consultStamp from '@/assets/images/consult-stamp.png';
import etcStamp from '@/assets/images/etc-stamp.png';
import letterPink from '@/assets/images/letter-pink.png';
import respondentStamp from '@/assets/images/respondent-stamp.png';
import useWrite from '@/stores/writeStore';

export default function ResultLetter({
  stampName = '위로와 공감',
}: {
  stampName: '위로와 공감' | '축하와 응원' | '고민 상담' | '기타' | '답변자';
}) {
  const letterStyle = twMerge(`flex w-full flex-col gap-[35px] p-4`);
  const address = '1A3E2';
  const date = new Date();
  const today = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const stamps = {
    '축하와 응원': celebrationStamp,
    '위로와 공감': consolationStamp,
    '고민 상담': consultStamp,
    기타: etcStamp,
    답변자: respondentStamp,
  };

  const letterTitle = useWrite((state) => state.letterTitle);
  return (
    <div className={letterStyle} style={{ backgroundImage: `url(${letterPink})` }}>
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-2.5">
          <span className="caption-b text-gray-60">따숨이님께</span>
          <span className="caption-r text-gray-80 line-clamp-3">{letterTitle}</span>
        </div>
        <img src={stamps[stampName]} alt="우표" />
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
