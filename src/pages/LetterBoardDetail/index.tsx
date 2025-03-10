import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  getSharePostDetail,
  SharePost,
  getSharePostLikeCount,
  postSharePostLike,
} from '@/apis/share';
import ReportModal from '@/components/ReportModal';

import Header from './components/Header';
import Letter from './components/Letter';
import { useLocation, useParams } from 'react-router';
import useAuthStore from '@/stores/authStore';

const LetterBoardDetailPage = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [postDetail, setPostDetail] = useState<SharePost>();
  const [activeReportModal, setActiveReportModal] = useState(false);
  const location = useLocation();
  const sharePostId: string = location.pathname.split('/')[3];
  // const isShareLetterPreview = location.state?.isShareLetterPreview || false;

  const { id } = useParams();

  const myZipCode = useAuthStore.getState().zipCode;

  const postLike = async (sharePostId: string) => {
    try {
      const response = await postSharePostLike(sharePostId);
      if (!response) throw new Error('error while fetching like count');
      console.log('✅ 편지 좋아요 추가됨:', response);
    } catch (error) {
      console.error('❌ 편지 좋아요 추가 중 에러가 발생했습니다', error);
      throw new Error('편지 좋아요 추가 실패');
    }
  };

  const handleToggleLike = (sharePostId: string) => {
    if (sharePostId === 'error') {
      return;
    }
    setLikeCount((prev) => prev + (isLike ? -1 : 1));
    setIsLike((prev) => !prev);
    postLike(sharePostId);
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
        console.log('myZip', myZipCode);
        console.log('responseZip', response.zipCode);
        console.log('responseZip', response);

        if (myZipCode === response.zipCode || !response.zipCode) {
          setIsWriter(true);
        }
      } catch (error) {
        console.error('❌ 편지 좋아요 갯수를 가져오는 중 에러가 발생했습니다', error);
        throw new Error('편지 좋아요 갯수 가져오기 실패');
      }
    };

    if (id) {
      fetchPostDetail(id);
      fetchLikeCounts(id);
    }
  }, []);

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
          reportType="SHARE_POST"
          letterId={id ? parseInt(id) : 0}
          onClose={() => setActiveReportModal(false)}
        />
      )}
      <div className="grow bg-white">
        <Header
          likeCount={likeCount}
          isLike={isLike}
          isWriter={isWriter}
          onToggleLike={() => (id ? handleToggleLike(id) : handleToggleLike('error'))}
          onOpenReportModal={() => setActiveReportModal(true)}
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
        </main>
      </div>
    </>
  );
};

export default LetterBoardDetailPage;
