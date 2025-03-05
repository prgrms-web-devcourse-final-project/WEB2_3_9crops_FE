import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { deleteRandomLetterMatching } from '@/apis/randomLetter';
import ResultLetter from '@/components/ResultLetter';
import { formatNumber } from '@/utils/formatNumber';
import { timeFormatter } from '@/utils/timeFormatter';

export default function Matched({
  matchedLetter,
  setIsMatched,
  setIsCoolTime,
  setOpenSelectedDetailModal,
}: {
  matchedLetter: MatchedLetter;
  setIsMatched: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCoolTime: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSelectedDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const TIME_STAMP = matchedLetter.replyDeadLine;
  const MATCH_DURATION = 1000 * 60 * 60 * 24;
  const MATCH_GRACE = 1000 * 60 * 5;

  const END_DATE = new Date(TIME_STAMP);

  const MATCHED_DATE = new Date(END_DATE.getTime() - MATCH_DURATION + MATCH_GRACE);

  const NOW_DATE = new Date();

  const endTime = END_DATE.getTime() - NOW_DATE.getTime();
  const graceTime = MATCHED_DATE.getTime() - NOW_DATE.getTime();

  const [endTimeSeconds, setEndTimeSeconds] = useState(Math.floor(endTime / 1000));
  const [graceTimeSeconds, setGraceTimeSeconds] = useState(Math.floor(graceTime / 1000));

  const FormatedEndTimes = timeFormatter(endTimeSeconds);
  const FormatedGraceTimes = timeFormatter(graceTimeSeconds);

  const handleDeleteRandomLetterMatching = async () => {
    const res = await deleteRandomLetterMatching();
    if (res?.status === 200) {
      alert('매칭이 취소되었습니다.');
      navigate(-1);
    }
  };

  useEffect(() => {
    if (endTime <= 0) {
      setIsMatched(false);
      setIsCoolTime(true);
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
        setIsMatched(false);
        setIsCoolTime(true);
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
  }, [endTime, graceTime, setIsMatched, setIsCoolTime]);

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">답장까지 남은 시간</p>
        <p className="text-gray-80">
          {formatNumber(FormatedEndTimes.hours)} : {formatNumber(FormatedEndTimes.minutes)} :{' '}
          {formatNumber(FormatedEndTimes.seconds)}
        </p>
        <div
          className="mt-2 w-75"
          onClick={() => {
            setOpenSelectedDetailModal(true);
          }}
        >
          <ResultLetter
            categoryName={matchedLetter.category}
            title={matchedLetter.title}
            zipCode={matchedLetter.zipCode}
          />
        </div>
        <button
          className="bg-primary-3 body-m disabled:bg-gray-30 mt-12.5 w-full rounded-lg py-2"
          onClick={() => {
            handleDeleteRandomLetterMatching();
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
