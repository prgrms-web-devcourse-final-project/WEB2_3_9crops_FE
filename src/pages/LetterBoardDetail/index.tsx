import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  getSharePostDetail,
  SharePost,
  getSharePostLikeCount,
  postSharePostLike,
  deleteSharePost,
} from '@/apis/share';
import ReportModal from '@/components/ReportModal';

import Header from './components/Header';
import Letter from './components/Letter';

import { useNavigate, useParams } from 'react-router';
import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import { useQueryClient } from '@tanstack/react-query';

const LetterBoardDetailPage = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [postDetail, setPostDetail] = useState<SharePost>();
  const [activeReportModal, setActiveReportModal] = useState(false);
  // const location = useLocation();
  // const sharePostId: string = location.pathname.split('/')[3];
  // const isShareLetterPreview = location.state?.isShareLetterPreview || false;

  const { id } = useParams();
  const myZipCode = useAuthStore.getState().zipCode;
  const setToastActive = useToastStore((state) => state.setToastActive);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postLike = async (sharePostId: string) => {
    try {
      const response = await postSharePostLike(sharePostId);
      if (!response) throw new Error('error while fetching like count');
    } catch (error) {
      console.error('❌ 편지 좋아요 추가 중 에러가 발생했습니다', error);
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

  const handleDeleteLetter = async () => {
    try {
      if (id) {
        const response = await deleteSharePost(id);
        if (!response) throw new Error('deleteSharePost: no response');
        queryClient.invalidateQueries({ queryKey: ['sharePostList'] });
        navigate(-1);
        setToastActive({
          toastType: 'Success',
          title: '게시물 삭제 완료',
        });
      } else throw new Error('deleteSharePost: id 값을 조회할 수 없습니다.');
    } catch (error) {
      console.error(error);
      setToastActive({
        toastType: 'Error',
        title: '삭제 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  useEffect(() => {
    const fetchPostDetail = async (postId: string) => {
      try {
        const data = await getSharePostDetail(postId);
        setPostDetail(data);
        if (myZipCode === data.zipCode || !data.zipCode) {
          setIsWriter(true);
        }
      } catch (error) {
        console.error('❌ 공유 게시글 상세 조회에 실패했습니다.', error);
      }
    };

    const fetchLikeCounts = async (postId: string) => {
      try {
        const response = await getSharePostLikeCount(postId);
        if (!response) throw new Error('error while fetching like count');
        setLikeCount(response.likeCount);
        setIsLike(response.liked);
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
          onDeleteLetter={() => handleDeleteLetter()}
        />
        <main className="px-5 pt-18 pb-3">
          <p className="body-b mb-6 px-5">FROM. {postDetail?.zipCode}</p>
          <p
            className={twMerge(
              'body-r bg-[repeating-linear-gradient(transparent,transparent_25px,#ffe6e3_26px)] px-5 break-all whitespace-pre-wrap',
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
