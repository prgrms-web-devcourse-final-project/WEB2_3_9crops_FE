import { useState } from 'react';
import { Link } from 'react-router';

import { postLetter } from '@/apis/write';
import PageTitle from '@/components/PageTitle';
import useWrite from '@/stores/writeStore';

import CategoryList from './components/CategoryList';
import ResultLetterAnimation from './components/ResultLetterAnimation';
import WritePageButton from './components/WritePageButton';

export default function CategorySelect({
  setStep,
  prevLetter,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  prevLetter: PrevLetter[];
}) {
  const letterTitle = useWrite((state) => state.letterTitle);
  const letterText = useWrite((state) => state.letterText);
  const category = useWrite((state) => state.category);
  const paperType = useWrite((state) => state.paperType);
  const fontType = useWrite((state) => state.fontType);

  const [send, setSend] = useState<boolean>(false);

  const LETTER_REQUEST: LetterRequest = {
    receiver: null,
    parentLetterId: null,
    title: letterTitle,
    content: letterText,
    category: category,
    paperType: paperType,
    fontType: fontType,
  };

  return (
    <>
      <div className="flex w-full grow flex-col items-center">
        <div className="absolute right-5">
          {!send && prevLetter.length <= 0 && (
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
          {send || prevLetter.length > 0
            ? '편지 작성이 완료 되었어요!'
            : '어떤 답장을 받고 싶나요?'}
        </PageTitle>

        {/* 카테고리 선택 컴포넌트 */}
        {!send && prevLetter.length <= 0 && <CategoryList />}

        {prevLetter.length > 0 && (
          <div className="mt-25 flex w-full max-w-[300px] flex-col items-center gap-5">
            <ResultLetterAnimation categoryName="답변자" />
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

        {send && (
          <div className="mt-25 flex w-full max-w-[300px] flex-col items-center gap-5">
            <ResultLetterAnimation categoryName={category} />
            <span className="animate-show-text body-sb text-gray-60 opacity-0">
              두근두근! 답장이 언제 올까요?
            </span>
          </div>
        )}

        {send || prevLetter.length > 0 ? (
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
              if (category) {
                postLetter(LETTER_REQUEST, setSend);
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
