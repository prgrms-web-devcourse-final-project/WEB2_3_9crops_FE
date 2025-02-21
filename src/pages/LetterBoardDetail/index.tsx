import { useState } from 'react';
import { useLocation } from 'react-router';

import { twMerge } from 'tailwind-merge';

import ReportModal from '@/components/ReportModal';

import Header from './components/Header';
import Letter from './components/Letter';

import landingBlur from '@/assets/images/landing_blur.png';

const DUMMY_LETTER = {
  receiver: '12E21',
  content:
    '편지 내용 어쩌구저쩌구 뾰로롱 편지 내용 어쩌구저쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 저쩌구 끝~!!',
  sender: '12345',
};

interface ShareLetterPreviewProps {
  confirmDisabled?: boolean;
  children?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const LetterBoardDetailPage = ({
  confirmDisabled,
  onCancel,
  onConfirm,
}: ShareLetterPreviewProps) => {
  const [likeCount, setLikeCount] = useState(122);
  const [isLike, setIsLike] = useState(false);
  const isWriter = false;
  const [activeReportModal, setActiveReportModal] = useState(false);

  const handleToggleLike = () => {
    setLikeCount((prev) => prev + (isLike ? -1 : 1));
    setIsLike((prev) => !prev);
  };

  const location = useLocation();

  const isShareLetterPreview = location.state?.isShareLetterPreview || false; // state가 없다면 false로 기본값 설정
  console.log(location);

  return (
    <>
      {activeReportModal && <ReportModal onClose={() => setActiveReportModal(false)} />}
      <div className="grow bg-white">
        <Header
          likeCount={likeCount}
          isLike={isLike}
          isWriter={isWriter}
          onToggleLike={handleToggleLike}
          onOpenReportModal={() => setActiveReportModal(true)}
          isShareLetterPreview={isShareLetterPreview}
        />
        <main className="px-5 pt-18 pb-3">
          <p className="body-b mb-6 px-5">FROM. 12E31</p>
          <p
            className={twMerge(
              'body-r bg-[repeating-linear-gradient(transparent,transparent_25px,#ffe6e3_26px)] px-5 whitespace-pre-wrap',
              'leading-[26px]',
            )}
          >
            내가 최근 먀먀먀를 했음. 그런데 이런 고민을 부모님께 말씀드리기에는 너무 죄송했음.
            이런저런 조언을 구하지 못해 편지를 작성했는데 너무나도 따뜻한 조언과 이야기를 받고 힘이
            났음. 다른 분들께도 내가 받았던 응원을 함께 공유하고 싶음.
          </p>
          <section className="flex flex-col gap-6.5 px-5 py-6.5">
            <Letter letter={DUMMY_LETTER} isSender />
            <Letter letter={DUMMY_LETTER} />
            <Letter letter={DUMMY_LETTER} isSender />
            <Letter letter={DUMMY_LETTER} />
            <Letter letter={DUMMY_LETTER} isSender />
            <Letter letter={DUMMY_LETTER} isSender />
            <Letter letter={DUMMY_LETTER} />
          </section>

          {isShareLetterPreview && (
            <>
              <img src={landingBlur} alt="landing blur" className="fixed bottom-0 w-screen" />
              <section className="fixed bottom-[30px] left-1/2 flex w-73 translate-x-[-50%] gap-6">
                <button
                  type="button"
                  className="body-m secondary-btn h-10 flex-1 basis-1/2"
                  onClick={onCancel}
                >
                  거부하기
                </button>
                <button
                  type="button"
                  className="primary-btn body-m h-10 flex-1 basis-1/2"
                  disabled={confirmDisabled}
                  onClick={onConfirm}
                >
                  승인하기
                </button>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default LetterBoardDetailPage;
