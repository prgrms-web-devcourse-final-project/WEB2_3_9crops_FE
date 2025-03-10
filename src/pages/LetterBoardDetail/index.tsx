import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import {
  getSharePostDetail,
  postShareProposalApproval,
  SharePost,
  postSharePostLike,
  getSharePostLikeCount,
} from '@/apis/share';
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
  const sharePostId: string = location.pathname.split('/')[3];
  // const location = useLocation();
  const navigate = useNavigate();
  // const isShareLetterPreview = location.state?.isShareLetterPreview || false;
  const isShareLetterPreview = false;
  const [postDetail, setPostDetail] = useState<SharePost>();

  const postLike = async () => {
    try {
      const response = await postSharePostLike(sharePostId);
      if (!response) throw new Error('error while fetching like count');
      console.log('✅ 편지 좋아요 추가됨:', response);
    } catch (error) {
      console.error('❌ 편지 좋아요 추가 중 에러가 발생했습니다', error);
      throw new Error('편지 좋아요 추가 실패');
    }
  };

  const handleToggleLike = () => {
    setLikeCount((prev) => prev + (isLike ? -1 : 1));
    setIsLike((prev) => !prev);
    postLike();
  };

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

  useEffect(() => {
    const fetchPostDetail = async (postId: string) => {
      try {
        const data = await getSharePostDetail(postId);
        setPostDetail(data);
      } catch (error) {
        console.error('❌ 공유 게시글 상세 조회에 실패했습니다.', error);
      }
    };

    const fetchLikeCounts = async (postId: string) => {
      try {
        const response = await getSharePostLikeCount(postId);
        if (!response) throw new Error('error while fetching like count');
        console.log('✅ 편지 좋아요 갯수:', response);
        setLikeCount(response.likeCount);
        setIsLike(response.liked);
      } catch (error) {
        console.error('❌ 편지 좋아요 갯수를 가져오는 중 에러가 발생했습니다', error);
        throw new Error('편지 좋아요 갯수 가져오기 실패');
      }
    };

    // if (location.state?.postDetail) {
    fetchPostDetail(sharePostId);
    fetchLikeCounts(sharePostId);
    // } else {
    //   console.warn('postDetail not found in location.state');
    // }
    // }, [location.state]);
  }, []);

  return (
    <>
      {activeReportModal && (
        <ReportModal
          reportType="POST"
          letterId={parseInt(sharePostId)}
          onClose={() => setActiveReportModal(false)}
        />
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
                  aria-label="거부하기"
                >
                  거부하기
                </button>

                <button
                  type="button"
                  className="primary-btn body-m h-10 flex-1 basis-1/2"
                  disabled={confirmDisabled}
                  onClick={() => handleProposalApproval('approve', postDetail?.sharePostId)}
                  aria-label="승인하기"
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
