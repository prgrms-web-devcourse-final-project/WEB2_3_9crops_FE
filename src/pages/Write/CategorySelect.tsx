import { useState } from 'react';
import { Link } from 'react-router';

import useWrite from '@/stores/writeStore';

import CategoryList from './components/CategoryList';
import ResultLetter from './components/ResultLetter';
import WritePageButton from './components/WritePageButton';

export default function CategorySelect({
  setStep,
  prevLetter,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  prevLetter: PrevLetter;
}) {
  const [send, setSend] = useState<boolean>(false);

  const stamp = useWrite((state) => state.stamp);
  return (
    <>
      <div className="flex h-full min-h-[calc(100vh-40px)] w-full flex-col items-center">
        <div className="absolute right-5">
          {!send && !prevLetter && (
            <WritePageButton
              text="이전 단계"
              onClick={() => {
                setStep('edit');
              }}
              bgColor="white"
            />
          )}
        </div>

        {send || prevLetter ? (
          <span className="body-b text-gray-60 mt-15 rounded-full bg-white px-6 py-4">
            편지 작성이 완료 되었어요!
          </span>
        ) : (
          <span className="body-b text-gray-60 mt-15 rounded-full bg-white px-6 py-4">
            어떤 답장을 받고 싶나요?
          </span>
        )}

        {prevLetter && (
          <div className="mt-25 flex w-full max-w-[300px] flex-col items-center gap-5">
            <ResultLetter stampName="답변자" />
            <div className="flex flex-col items-center">
              <span className="body-sb text-gray-60">작성하신 편지는</span>
              <span className="body-sb text-gray-60">
                <span>{'00'}시간 </span>
                <span>{'00'}분 </span>
                <span>{'00'}초 후에 도착합니다.</span>
              </span>
            </div>
          </div>
        )}

        {send && (
          <div className="mt-25 flex w-full max-w-[300px] flex-col items-center gap-5">
            <ResultLetter stampName={stamp} />
            <span className="body-sb text-gray-60">두근두근! 답장이 언제 올까요?</span>
          </div>
        )}

        {!send && !prevLetter && <CategoryList />}

        {send || prevLetter ? (
          <Link
            to={'/'}
            className="bg-primary-3 body-m mt-auto flex h-10 w-[280px] cursor-pointer items-center justify-center rounded-lg"
          >
            홈으로 돌아가기
          </Link>
        ) : (
          <button
            className="bg-primary-3 body-m mt-auto flex h-10 w-[280px] cursor-pointer items-center justify-center rounded-lg"
            onClick={() => {
              if (stamp) {
                setSend(true);
              } else {
                alert('우표 선택을 해주세요');
              }
            }}
          >
            편지 전송
          </button>
        )}
      </div>
    </>
  );
}
