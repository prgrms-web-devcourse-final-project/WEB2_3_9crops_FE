import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import LetterWrapper from '@/components/LetterWrapper';
import { formatNumber } from '@/utils/formatNumber';
import { timeFormatter } from '@/utils/timeFormatter';

// import letterPink from '@/assets/images/letter-pink.png';

export default function CoolTime({
  setIsCoolTime,
  coolTime,
}: {
  setIsCoolTime: React.Dispatch<React.SetStateAction<boolean>>;
  coolTime: CoolTime;
}) {
  const navigate = useNavigate();

  const TIME_STAMP = coolTime?.lastMatchedAt
    ? coolTime.lastMatchedAt
    : '2025-03-01T21:15:25.262045608';

  const COMPLETED_DATE = new Date(TIME_STAMP);

  const END_DATE = new Date(COMPLETED_DATE);
  END_DATE.setHours(COMPLETED_DATE.getHours() + 1);

  const NOW_DATE = new Date();

  const endTime = END_DATE.getTime() - NOW_DATE.getTime();

  const [endTimeSeconds, setEndTimeSeconds] = useState(endTime / 1000);

  const formatedEndTime = timeFormatter(endTimeSeconds);

  useEffect(() => {
    const endTargetTime = Date.now() + endTime;

    const count = setInterval(() => {
      const now = Date.now();
      const newEndTimeSeconds = Math.max(0, Math.floor((endTargetTime - now) / 1000));

      if (endTimeSeconds <= 0) {
        setIsCoolTime(false);
      }

      setEndTimeSeconds(newEndTimeSeconds);
    }, 1000);

    return () => {
      clearInterval(count);
    };
  });

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">랜덤 편지 활성화 까지</p>
        <p className="text-gray-80">
          {formatNumber(formatedEndTime.hours)} : {formatNumber(formatedEndTime.minutes)} :{' '}
          {formatNumber(formatedEndTime.seconds)}
        </p>
        <div className="mt-2 w-75">
          <LetterWrapper>
            <div className="flex h-50 w-full max-w-[300px] flex-col gap-[35px] p-4"></div>
          </LetterWrapper>
        </div>
        <button
          className="bg-primary-3 body-m mt-12.5 w-full rounded-lg py-2"
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
