import { useNavigate } from 'react-router';

import LetterWrapper from '@/components/LetterWrapper';

// import letterPink from '@/assets/images/letter-pink.png';

export default function CoolTime() {
  const navigate = useNavigate();

  const DUMMY_TIME = new Date();
  const hours = DUMMY_TIME.getHours();
  const minuites = DUMMY_TIME.getMinutes();
  const seconds = DUMMY_TIME.getSeconds();
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">편지 매칭 활성화 까지</p>
        <p className="text-gray-80">
          {hours} : {minuites} : {seconds}
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
