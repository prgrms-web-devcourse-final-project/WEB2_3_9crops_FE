import { useEffect, useState } from 'react';

import { deleteRandomLetterMatching } from '@/apis/randomLetter';
import ResultLetter from '@/components/ResultLetter';
import { formatNumber } from '@/utils/formatNumber';
import { timeFormatter } from '@/utils/timeFormatter';

export default function Matched({
  setMatched,
  setCoolTime,
}: {
  setMatched: React.Dispatch<React.SetStateAction<boolean>>;
  setCoolTime: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const TIME_STAMP = '2025-02-28T22:35:25.262045608';

  const MATCHED_DATE = new Date(TIME_STAMP);

  const END_DATE = new Date(MATCHED_DATE);
  END_DATE.setHours(MATCHED_DATE.getHours() + 24);

  const GRACE_DATE = new Date(MATCHED_DATE);
  GRACE_DATE.setMinutes(MATCHED_DATE.getMinutes() + 5);

  const NOW_DATE = new Date();

  const endTime = END_DATE.getTime() - NOW_DATE.getTime();
  const graceTime = GRACE_DATE.getTime() - NOW_DATE.getTime();

  const [endTimeSeconds, setEndTimeSeconds] = useState(Math.floor(endTime / 1000));
  const [graceTimeSeconds, setGraceTimeSeconds] = useState(Math.floor(graceTime / 1000));

  const FormatedEndTimes = timeFormatter(endTimeSeconds);
  const FormatedGraceTimes = timeFormatter(graceTimeSeconds);

  useEffect(() => {
    if (endTime <= 0) {
      setMatched(false);
      setCoolTime(true);
    }
    if (graceTime <= 0) {
      setIsDisabled(true);
    }

    const endTargetTime = Date.now() + endTime;
    const graceTargetTime = Date.now() + graceTime;

    const counting = setInterval(() => {
      const now = Date.now();
      const newEndTimeSeconds = Math.max(0, Math.floor((endTargetTime - now) / 1000));
      const newGraceTimeSeconds = Math.max(0, Math.floor((graceTargetTime - now) / 1000));

      if (newEndTimeSeconds <= 0) {
        setMatched(false);
        setCoolTime(true);
      }
      if (newGraceTimeSeconds <= 0) {
        setIsDisabled(true);
      }

      setEndTimeSeconds(newEndTimeSeconds);
      setGraceTimeSeconds(newGraceTimeSeconds);
    }, 1000);

    return () => {
      clearInterval(counting);
    };
  }, [endTime, graceTime, setMatched, setCoolTime]);

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">답장까지 남은 시간</p>
        <p className="text-gray-80">
          {formatNumber(FormatedEndTimes.hours)} : {formatNumber(FormatedEndTimes.minutes)} :{' '}
          {formatNumber(FormatedEndTimes.seconds)}
        </p>
        <div className="mt-2 w-75">
          <ResultLetter categoryName="ETC" title="테스트용가리" />
        </div>
        <button
          className="bg-primary-3 body-m disabled:bg-gray-30 mt-12.5 w-full rounded-lg py-2"
          onClick={() => {
            console.log('취소');
            deleteRandomLetterMatching();
          }}
          disabled={isDisabled}
          aria-label="취소버튼"
        >
          {isDisabled
            ? '취소 시간이 지났습니다.'
            : `답장 취소하기 ${formatNumber(FormatedGraceTimes.minutes)} : ${formatNumber(FormatedGraceTimes.seconds)}`}
        </button>
      </div>
    </div>
  );
}
