import { useEffect, useState } from 'react';

import ResultLetter from '@/components/ResultLetter';

export default function Matched() {
  const TIME_STAMP = '2025-02-26T18:11:46.262045608';

  const DUMMY_DATE = new Date(TIME_STAMP);

  const END_DATE = new Date(DUMMY_DATE);
  END_DATE.setHours(DUMMY_DATE.getHours() + 24);

  const GRACE_DATE = new Date(DUMMY_DATE);
  GRACE_DATE.setMinutes(DUMMY_DATE.getMinutes() + 5);

  const NOW_DATE = new Date();

  const endTime = END_DATE.getTime() - NOW_DATE.getTime();
  const graceTime = GRACE_DATE.getTime() - NOW_DATE.getTime();

  const [endHours, setEndHours] = useState(Math.floor((endTime / (1000 * 60 * 60)) % 24));
  const [endMinutes, setEndMinutes] = useState(Math.floor((endTime / (1000 * 60)) % 60));
  const [endSeconds, setEndSeconds] = useState(Math.floor((endTime / 1000) % 60));

  const [graceMinutes, setGraceMinutes] = useState(Math.floor((graceTime / (1000 * 60)) % 60));
  const [graceSeconds, setGraceSeconds] = useState(Math.floor((graceTime / 1000) % 60));

  useEffect(() => {
    if (endHours < 0 || endMinutes < 0 || endSeconds < 0) {
      setEndHours(0);
      setEndMinutes(0);
      setEndSeconds(0);
    }

    const endTimeFlow = setInterval(() => {
      setEndSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setEndMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            } else {
              setEndHours((prevendHours) => {
                if (prevendHours > 0) {
                  return prevendHours - 1;
                } else {
                  return 0;
                }
              });
              if (endHours > 0) {
                return 59;
              } else {
                return 0;
              }
            }
          });
          if (endMinutes > 0) {
            return 59;
          } else {
            return 0;
          }
        }
      });
      if (endHours === 0 && endMinutes === 0 && endSeconds === 0) {
        console.log('몬가몬가 로직 발동!');
        clearInterval(endTimeFlow);
      }
    }, 1000);

    return () => {
      clearInterval(endTimeFlow);
    };
  }, [endHours, endMinutes, endSeconds]);

  useEffect(() => {
    if (graceMinutes < 0 || graceSeconds < 0) {
      setGraceMinutes(0);
      setGraceSeconds(0);
    }

    const graceTimeFlow = setInterval(() => {
      setGraceSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setGraceMinutes((prevMinuites) => {
            if (prevMinuites > 0) {
              return prevMinuites - 1;
            } else {
              return 0;
            }
          });
          if (graceMinutes > 0) {
            return 59;
          } else {
            return 0;
          }
        }
      });

      if (graceMinutes === 0 && graceSeconds === 0) {
        console.log('몬가몬가 로직 발동!');
        clearInterval(graceTimeFlow);
      }
    }, 1000);

    return () => {
      clearInterval(graceTimeFlow);
    };
  }, [graceMinutes, graceSeconds]);

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">답장까지 남은 시간</p>
        <p className="text-gray-80">
          {endHours} : {endMinutes} : {endSeconds}
        </p>
        <div className="mt-2 w-75">
          <ResultLetter categoryName="ETC" title="테스트용가리" />
        </div>
        <button className="bg-primary-3 body-m mt-12.5 w-full rounded-lg py-2" onClick={() => {}}>
          매칭 취소하기 {graceMinutes} : {graceSeconds}
        </button>
      </div>
    </div>
  );
}
