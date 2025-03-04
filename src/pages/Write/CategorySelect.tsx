import { Link } from 'react-router';

import { postLetter } from '@/apis/write';
import PageTitle from '@/components/PageTitle';
import CategoryList from '@/pages/Write/components/CategoryList';
import useWrite from '@/stores/writeStore';

import ResultLetterAnimation from './components/ResultLetterAnimation';
import WritePageButton from './components/WritePageButton';

export default function CategorySelect({
  setStep,
  send,
  setSend,
  isReply,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  send: boolean;
  setSend: React.Dispatch<React.SetStateAction<boolean>>;
  isReply: boolean;
}) {
  const letterRequest = useWrite((state) => state.letterRequest);

  const handlePostLetter = async (letterRequest: LetterRequest) => {
    const res = await postLetter(letterRequest);
    if (res?.status === 200) {
      console.log(letterRequest);
      setSend(true);
    } else {
      alert('전송오류(임시)');
    }
  };

  return (
    <>
      <div className="flex w-full grow flex-col items-center">
        <div className="absolute left-0 flex w-full items-center justify-between px-5">
          {!send && !isReply && (
            <WritePageButton
              text="이전 단계"
              onClick={() => {
                setStep('edit');
              }}
              bgColor="white"
            />
          )}
        </div>

        <PageTitle className="mt-20">
          {send || isReply ? '편지 작성이 완료 되었어요!' : '어떤 답장을 받고 싶나요?'}
        </PageTitle>

        {/* 카테고리 선택 컴포넌트 */}
        {!send && !isReply && <CategoryList />}

        {send && isReply && (
          <div className="mt-25 flex w-full max-w-[300px] flex-col items-center gap-5">
            <ResultLetterAnimation />
            <div className="animate-show-text flex flex-col items-center opacity-0">
              <span className="body-sb text-gray-60">작성하신 편지는</span>
              <span className="body-sb text-gray-60">
                <span>{'00'}시간 </span>
                <span>{'00'}분 </span>
                <span>{'00'}초 후에 도착합니다.</span>
              </span>
            </div>
          </div>
        )}

        {send && !isReply && (
          <div className="mt-25 flex w-full max-w-[300px] flex-col items-center gap-5">
            <ResultLetterAnimation />
            <span className="animate-show-text body-sb text-gray-60 opacity-0">
              두근두근! 답장이 언제 올까요?
            </span>
          </div>
        )}

        {send || isReply ? (
          <Link
            to={'/'}
            className="bg-primary-3 body-m mt-auto flex h-10 w-full items-center justify-center rounded-lg"
          >
            홈으로 돌아가기
          </Link>
        ) : (
          <button
            className="bg-primary-3 body-m mt-auto flex h-10 w-full items-center justify-center rounded-lg"
            onClick={() => {
              if (letterRequest.category) {
                handlePostLetter(letterRequest);
                // setSend(true);
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
