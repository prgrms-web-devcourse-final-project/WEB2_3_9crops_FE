import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getSharePostDetail, getSharePostList } from '@/apis/share';
import { SharePostResponse, SharePost } from '@/apis/share';
import ModalBackgroundWrapper from '@/components/ModalBackgroundWrapper';
import ModalOverlay from '@/components/ModalOverlay';

interface ShowShareAccessModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const ShowShareAccessModal = ({ onClose }: ShowShareAccessModalProps) => {
  const navigate = useNavigate();

  const [sharePosts, setSharePosts] = useState<SharePost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (page: number) => {
    try {
      const data: SharePostResponse = await getSharePostList(page, 10);
      setSharePosts((prev) => [...prev, ...data.content]);
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error('❌ 게시글 목록을 불러오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleNavigation = async (sharePostId: number) => {
    try {
      const postDetail = await getSharePostDetail(sharePostId);
      navigate(`/board/letter/${sharePostId}`, {
        state: { postDetail, isShareLetterPreview: true },
      });
    } catch (error) {
      console.error('❌ 게시글 상세 페이지로 이동하는 데에 실패했습니다.', error);
    }
  };

  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          공유 요청이 왔어요!
        </p>
        <div className="flex w-73 justify-center">
          <ModalBackgroundWrapper className="relative overflow-hidden rounded-lg p-5">
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">게시판 공유 승인하기</p>
              <p className="caption-r text-black">
                따숨님과 주고받은 추억을 게시판에 공유하고 싶으신 분이 있어요. 클릭해서 확인하고,
                허락 여부를 체크해주세요!
              </p>
            </div>
            <div
              className="mt-6 flex max-h-60 min-h-auto w-[251px] flex-col gap-[10px] overflow-y-scroll [&::-webkit-scrollbar]:hidden"
              onScroll={handleScroll}
            >
              {sharePosts?.map((post) => (
                <button
                  className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                  key={post.sharePostId}
                  onClick={() => handleNavigation(post.sharePostId)}
                >
                  <p>{post.writerZipCode}님의 공유 요청</p>
                </button>
              ))}
            </div>
          </ModalBackgroundWrapper>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowShareAccessModal;
