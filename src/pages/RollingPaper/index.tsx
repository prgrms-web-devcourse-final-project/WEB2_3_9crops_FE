import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';

import { deleteRollingPaperComment, getRollingPaperDetail } from '@/apis/rolling';
import BackgroundBottom from '@/components/BackgroundBottom';
import ConfirmModal from '@/components/ConfirmModal';
import PageTitle from '@/components/PageTitle';
import Header from '@/layouts/Header';

import Comment from './components/Comment';
import CommentDetailModal from './components/CommentDetailModal';
import WriteCommentButton from './components/WriteCommentButton';
import useAuthStore from '@/stores/authStore';

const RollingPaperPage = () => {
  const id = useParams().id ?? '';
  const [activeComment, setActiveComment] = useState<RollingPaperComment | null>(null);
  const [activeDetailModal, setActiveDetailModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const zipCode = useAuthStore((props) => props.zipCode);
  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['rolling-paper', id],
    queryFn: () => getRollingPaperDetail(id),
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (rollingPaperId: number | string) => deleteRollingPaperComment(rollingPaperId),
    onSuccess: (data) => {
      queryClient.setQueryData(['rolling-paper', id], (oldData: RollingPaper) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          eventPostComments: {
            content: oldData.eventPostComments.content.filter(
              (comment: RollingPaperComment) => comment.commentId !== data.commentId,
            ),
          },
        };
      });

      setActiveDeleteModal(false);
      setActiveComment(null);
    },
    onError: (err) => {
      console.error(err);
    },
  });

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
      <main className="flex grow flex-col items-center px-5 pt-20 pb-12">
        <PageTitle className="mb-18 max-w-73 text-center">{data?.title}</PageTitle>
        <p className="body-sb text-gray-60 mb-2 w-full dark:text-white">
          등록된 편지 {data ? data.eventPostComments.content.length : 0}
        </p>
        <section className="w-full">
          <MasonryInfiniteGrid column={2} align="stretch" gap={16}>
            {isSuccess &&
              data.eventPostComments.content.map((comment) => (
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
          {isSuccess && data.eventPostComments.content.length === 0 && (
            <p className="body-sb text-gray-60 my-20 text-center">
              아직 등록된 편지가 없어요.
              <br />
              첫번째로 편지를 남겨볼까요?
            </p>
          )}
        </section>
        <WriteCommentButton rollingPaperId={id} />
      </main>
      <BackgroundBottom />
    </>
  );
};

export default RollingPaperPage;
