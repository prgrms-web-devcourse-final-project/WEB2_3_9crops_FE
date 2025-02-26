import { useEffect, useState } from 'react';

import ResultLetter from '@/components/ResultLetter';

export default function Matched({
  setMatched,
  setCoolTime,
}: {
  setMatched: React.Dispatch<React.SetStateAction<boolean>>;
  setCoolTime: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const TIME_STAMP = '2025-02-25T21:52:25.262045608';

  const MATCHED_DATE = new Date(TIME_STAMP);

  const END_DATE = new Date(MATCHED_DATE);
  END_DATE.setHours(MATCHED_DATE.getHours() + 24);

  const GRACE_DATE = new Date(MATCHED_DATE);
  GRACE_DATE.setMinutes(MATCHED_DATE.getMinutes() + 5);

  const NOW_DATE = new Date();

  const endTime = END_DATE.getTime() - NOW_DATE.getTime();
  const graceTime = GRACE_DATE.getTime() - NOW_DATE.getTime();

  const [endTimes, setEndTimes] = useState({
    hours: Math.floor((endTime / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((endTime / (1000 * 60)) % 60),
    seconds: Math.floor((endTime / 1000) % 60),
  });

  const [graceTimes, setGraceTimes] = useState({
    minutes: Math.floor((graceTime / (1000 * 60)) % 60),
    seconds: Math.floor((graceTime / 1000) % 60),
  });

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  useEffect(() => {
    if (endTimes.hours < 0 || endTimes.minutes < 0 || endTimes.seconds < 0) {
      setEndTimes({ hours: 0, minutes: 0, seconds: 0 });
    }
    if (endTimes.hours === 0 && endTimes.minutes === 0 && endTimes.seconds === 0) {
      setMatched(false);
      setCoolTime(true);
      return;
    }
    const endTimeFlow = setInterval(() => {
      setEndTimes((currentTime) => {
        if (currentTime.seconds > 0) {
          return { ...currentTime, seconds: currentTime.seconds - 1 };
        } //
        else {
          if (currentTime.minutes > 0) {
            return { ...currentTime, minutes: currentTime.minutes - 1, seconds: 59 };
          } //
          else {
            if (currentTime.hours > 0) {
              return { hours: currentTime.hours - 1, minutes: 59, seconds: 59 };
            } //
            else {
              setMatched(false);
              setCoolTime(true);
              return { ...currentTime };
            }
          }
        }
      });
      if (endTimes.hours === 0 && endTimes.minutes === 0 && endTimes.seconds === 0) {
        clearInterval(endTimeFlow);
      }
    }, 1000);

    return () => {
      clearInterval(endTimeFlow);
    };
  }, [endTimes, setMatched, setCoolTime]);

  useEffect(() => {
    if (graceTimes.minutes < 0 || graceTimes.seconds < 0) {
      setGraceTimes({ minutes: 0, seconds: 0 });
    }
    if (graceTimes.minutes === 0 && graceTimes.seconds === 0) {
      return setIsDisabled(true);
    }
    const graceTimeFlow = setInterval(() => {
      setGraceTimes((currentTime) => {
        if (currentTime.seconds > 0) {
          return { ...currentTime, seconds: currentTime.seconds - 1 };
        } //
        else {
          if (currentTime.minutes > 0) {
            return { minutes: currentTime.minutes - 1, seconds: 59 };
          } //
          else {
            setIsDisabled(true);
            return { ...currentTime };
          }
        }
      });
      if (graceTimes.minutes === 0 && graceTimes.seconds === 0) {
        clearInterval(graceTimeFlow);
      }
    }, 1000);

    return () => {
      clearInterval(graceTimeFlow);
    };
  }, [graceTimes]);

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">답장까지 남은 시간</p>
        <p className="text-gray-80">
          {formatNumber(endTimes.hours)} : {formatNumber(endTimes.minutes)} :{' '}
          {formatNumber(endTimes.seconds)}
        </p>
        <div className="mt-2 w-75">
          <ResultLetter categoryName="ETC" title="테스트용가리" />
        </div>
        <button
          className="bg-primary-3 body-m disabled:bg-gray-30 mt-12.5 w-full rounded-lg py-2"
          onClick={() => {
            console.log('취소');
          }}
          disabled={isDisabled}
        >
          {isDisabled
            ? '취소 시간이 지났습니다.'
            : `답장 취소하기 ${formatNumber(graceTimes.minutes)} : ${formatNumber(graceTimes.seconds)}`}
        </button>
      </div>
    </div>
  );
}
