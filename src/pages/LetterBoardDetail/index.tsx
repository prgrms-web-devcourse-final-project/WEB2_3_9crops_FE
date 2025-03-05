import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getSharePostDetail, postShareProposalApproval, SharePost } from '@/apis/share';
import BlurImg from '@/assets/images/landing-blur.png';
import ReportModal from '@/components/ReportModal';

import Header from './components/Header';
import Letter from './components/Letter';

interface ShareLetterPreviewProps {
  confirmDisabled?: boolean;
  children?: React.ReactNode;
}

const LetterBoardDetailPage = ({ confirmDisabled }: ShareLetterPreviewProps) => {
  const [likeCount, setLikeCount] = useState(122);
  const [isLike, setIsLike] = useState(false);
  const isWriter = false;
  const [activeReportModal, setActiveReportModal] = useState(false);

  const handleToggleLike = () => {
    setLikeCount((prev) => prev + (isLike ? -1 : 1));
    setIsLike((prev) => !prev);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const isShareLetterPreview = location.state?.isShareLetterPreview || false;
  const [postDetail, setPostDetail] = useState<SharePost>();

  useEffect(() => {
    const fetchPostDetail = async () => {
      console.log('location.state:', location.state);

      try {
        if (location.state?.postDetail) {
          const { sharePostId } = location.state.postDetail;

          console.log('sharePostId:', sharePostId);

          const data = await getSharePostDetail(sharePostId);

          setPostDetail(data);
        } else {
          console.warn('postDetail not found in location.state');
        }
      } catch (error) {
        console.error('❌ 공유 게시글 상세 조회에 실패했습니다.', error);
      }
    };

    fetchPostDetail();
  }, [location.state]);

  const handleProposalApproval = async (
    action: 'approve' | 'reject',
    shareProposalId: number = location.state?.postDetail?.sharePostId,
  ) => {
    try {
      const result = await postShareProposalApproval(shareProposalId, action);
      console.log(`✅ 편지 공유 ${action === 'approve' ? '수락' : '거절'}됨:`, result);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* MEMO : 안지원 왔다감 ^o^/ 신고 처리 API 작업을 하면서 추가 사항이 생겼습니다! reportType(이건 제가 추가해놓겠습니당), letterId(해당 게시글 또는 편지 id값, 추가 필요!)을 담아야 신고 모달을 정상적으로 사용 가능합니다!! */}
      {activeReportModal && (
        <ReportModal reportType="POST" onClose={() => setActiveReportModal(false)} />
      )}
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
          <p className="body-b mb-6 px-5">FROM. {postDetail?.zipCode}</p>
          <p
            className={twMerge(
              'body-r bg-[repeating-linear-gradient(transparent,transparent_25px,#ffe6e3_26px)] px-5 whitespace-pre-wrap',
              'leading-[26px]',
            )}
          >
            {postDetail?.sharePostContent}
          </p>
          <section className="flex flex-col gap-6.5 px-5 py-6.5">
            {postDetail?.letters.map((letter, index) => (
              <Letter
                key={index}
                letter={letter}
                isWriter={letter.writerZipCode === postDetail.zipCode}
              />
            ))}
          </section>

          {isShareLetterPreview && (
            <>
              <img
                src={BlurImg}
                alt="landing blur"
                className="fixed bottom-0 left-0 z-10 w-screen"
              />
              <section className="fixed bottom-[30px] left-1/2 z-20 flex w-73 translate-x-[-50%] gap-6">
                <button
                  type="button"
                  className="body-m secondary-btn h-10 flex-1 basis-1/2"
                  onClick={() => handleProposalApproval('reject', postDetail?.sharePostId)}
                >
                  거부하기
                </button>

                <button
                  type="button"
                  className="primary-btn body-m h-10 flex-1 basis-1/2"
                  disabled={confirmDisabled}
                  onClick={() => handleProposalApproval('approve', postDetail?.sharePostId)}
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
