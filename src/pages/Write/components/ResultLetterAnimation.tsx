import { useEffect, useState } from 'react';

import closedLetter from '@/assets/images/closed-letter.png';
import openedLetterFront from '@/assets/images/opened-letter-front.png';
import openedLetter from '@/assets/images/opened-letter.png';
import useAuthStore from '@/stores/authStore';
import useWrite from '@/stores/writeStore';

import ResultLetter from '../../../components/ResultLetter';

export default function ResultLetterAnimation() {
  const [next, setNext] = useState('st');

  const userZipCode = useAuthStore((state) => state.zipCode);

  const letterRequest = useWrite((state) => state.letterRequest);

  useEffect(() => {
    setTimeout(() => {
      setNext('nd');
    }, 2000);
    setTimeout(() => {
      setNext('rd');
    }, 5000);
  }, []);
  return (
    <>
      {next === 'rd' ? (
        <div className="animate-rotate-show w-full opacity-0">
          {/* MEMO : 여기엔 로그인된 유저의 zipCode가 들어가야함! */}
          <ResultLetter
            categoryName={letterRequest.category}
            title={letterRequest.title}
            zipCode={userZipCode}
          />
        </div>
      ) : (
        <>
          {next === 'st' && (
            <div className="relative h-[300px] w-full overflow-hidden">
              <img
                src={openedLetter}
                alt="열린 편지"
                className="absolute bottom-0 w-full object-cover"
              />
              <div className="animate-down absolute h-100 w-full bg-white"></div>
              <img
                src={openedLetterFront}
                alt="편지 앞면"
                className="absolute bottom-0 w-full object-cover"
              />
            </div>
          )}
          {next === 'nd' && (
            <div className="relative h-[300px] w-full">
              <img
                src={closedLetter}
                alt="닫힌 편지"
                className="animate-up animate-rotate-hide h-[200px] w-full object-cover"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
