import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router';

import { deleteRollingPaperComment, getRollingPaperDetail } from '@/apis/rolling';
import BackgroundBottom from '@/components/BackgroundBottom';
import ConfirmModal from '@/components/ConfirmModal';
import PageTitle from '@/components/PageTitle';
import Header from '@/layouts/Header';
import MenuButton from '@/components/MenuButton';

import Comment from './components/Comment';
import CommentDetailModal from './components/CommentDetailModal';
import WriteCommentButton from './components/WriteCommentButton';
import useAuthStore from '@/stores/authStore';
import ReportModal from '@/components/ReportModal';

const MESSAGE_SIZE = 10;

const RollingPaperPage = () => {
  const id = useParams().id ?? '';
  const [activeComment, setActiveComment] = useState<RollingPaperComment | null>(null);
  const [activeDetailModal, setActiveDetailModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [activeReportModal, setActiveReportModal] = useState(false);
  const zipCode = useAuthStore((props) => props.zipCode);
  const queryClient = useQueryClient();

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['rolling-paper', id],
    queryFn: ({ pageParam = 1 }) => getRollingPaperDetail(id, pageParam, MESSAGE_SIZE),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.eventPostComments;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (rollingPaperId: number | string) => deleteRollingPaperComment(rollingPaperId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rolling-paper', id] });
      setActiveDeleteModal(false);
      setActiveComment(null);
    },
    onError: () => {
      alert('편지 삭제에 실패했어요. 다시 시도해주세요');
    },
  });

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allComments = data?.pages.flatMap((page) => page.eventPostComments.content) || [];
  const totalComments = data?.pages[0]?.eventPostComments.totalElements || 0;
  const title = data?.pages[0]?.title || '';

  return (
    <>
      {activeDetailModal && activeComment && (
        <CommentDetailModal
          comment={activeComment}
          isWriter={activeComment.zipCode === zipCode}
          onClose={() => {
            setActiveDetailModal(false);
            setActiveComment(null);
          }}
          onDelete={() => {
            setActiveDetailModal(false);
            setActiveDeleteModal(true);
          }}
          onReport={() => {
            setActiveDetailModal(false);
            setActiveReportModal(true);
          }}
        />
      )}
      {activeReportModal && (
        <ReportModal
          reportType="EVENT_COMMENT"
          letterId={Number(activeComment?.commentId)}
          onClose={() => setActiveReportModal(false)}
        />
      )}
      {activeDeleteModal && (
        <ConfirmModal
          title="정말 편지를 삭제하시겠어요?"
          description="편지를 삭제하는 경우 복구가 불가능합니다!"
          cancelText="되돌아가기"
          confirmText="삭제하기"
          onCancel={() => {
            setActiveComment(null);
            setActiveDeleteModal(false);
          }}
          onConfirm={() => {
            if (activeComment) deleteComment(activeComment.commentId);
          }}
        />
      )}
      <Header />
      <main className="z-1 flex grow flex-col items-center px-5 pt-20 pb-12">
        <PageTitle className="mb-18 max-w-73 text-center">{title}</PageTitle>
        <p className="body-sb text-gray-60 mb-2 w-full dark:text-white">
          등록된 편지 {totalComments}
        </p>
        <section className="mb-4 w-full">
          <MasonryInfiniteGrid column={2} align="stretch" gap={16} onRequestAppend={handleLoadMore}>
            {isSuccess &&
              allComments.map((comment) => (
                <Comment
                  key={comment.commentId}
                  comment={comment}
                  onClick={() => {
                    setActiveDetailModal(true);
                    setActiveComment(comment);
                  }}
                />
              ))}
          </MasonryInfiniteGrid>
          {isSuccess && allComments.length === 0 && (
            <p className="body-sb text-gray-60 my-20 text-center">
              아직 등록된 편지가 없어요.
              <br />
              첫번째로 편지를 남겨볼까요?
            </p>
          )}
          {isFetchingNextPage && (
            <p className="body-sb text-gray-60 my-4 text-center">Loading...</p>
          )}
        </section>
        <WriteCommentButton rollingPaperId={id} />
        <MenuButton />
      </main>
      <BackgroundBottom />
    </>
  );
};

export default RollingPaperPage;
