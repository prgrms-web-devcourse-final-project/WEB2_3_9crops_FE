import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router';

import { getMailboxDetail, postMailboxDisconnect } from '@/apis/mailBox';
import { postShareProposals } from '@/apis/share';
import ConfirmModal from '@/components/ConfirmModal';
import MessageModal from '@/components/MessageModal';
import PageTitle from '@/components/PageTitle';

import InformationTooltip from './components/InformationTooltip';
import LetterPreview from './components/LetterPreview';
interface MailBoxDetailProps {
  letterId: number;
  title: string;
  myLetter: boolean;
  active: boolean;
  createdAt: string;
}

const LetterBoxDetailPage = () => {
  const location = useLocation();
  const userInfo = { ...location.state };

  const [isShareMode, setShareMode] = useState(false);
  const [isOpenDisConnectModal, setIsOpenDisConnectModal] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [shareComment, setShareComment] = useState('');
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['mailBoxDetail', userInfo.id],
      queryFn: async ({ pageParam }) => {
        console.log(`Fetching page: ${pageParam}`);
        const response = await getMailboxDetail(userInfo.id, pageParam);
        console.log(response.data);
        return response.data;
      },
      enabled: !!userInfo.id,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.currentPage >= lastPage.totalPages ? undefined : allPages.length + 1;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const mailLists: MailBoxDetailProps[] = data?.pages.flatMap((page) => page.content) || [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const disconnectMutation = useMutation({
    mutationFn: async () => await postMailboxDisconnect(userInfo.id),
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ['mailBox'] });
    },
    onError: (error) => {
      // TODO: 차단 실패 toastUI 띄워주기
      // 요청이 실패했어요 잠시 후에 다시 시도해주세요.
      console.error(error);
    },
  });

  const shareMutation = useMutation({
    mutationFn: () => postShareProposals(selected, userInfo.id, shareComment),
    onSuccess: () => {
      toggleShareMode();
      setShareComment('');
    },
    onError: (error) => {
      // TODO: 차단 실패 toastUI 띄워주기
      // 요청이 실패했어요 잠시 후에 다시 시도해주세요.
      console.error(error);
    },
  });

  const toggleShareMode = () => {
    if (isShareMode) {
      setSelected([]);
    }
    setShareMode((prev) => !prev);
  };

  const toggleSelected = (selectedId: number) => {
    if (selected.includes(selectedId)) {
      setSelected((prev) => prev.filter((id) => id !== selectedId));
    } else {
      setSelected((prev) => [...prev, selectedId]);
    }
  };

  const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setShareComment(e.target.value);
  };

  if (isError) {
    navigate('/notFound');
  }

  return (
    <>
      {isOpenDisConnectModal && (
        <ConfirmModal
          title={`정말 ${userInfo.zipCode}님과 편지를 그만하시겠어요?`}
          description="한 번 연결을 끊으면 다시 연결할 수 없어요!"
          cancelText="되돌아가기"
          confirmText="편지 그만하기"
          onCancel={() => setIsOpenDisConnectModal(false)}
          onConfirm={() => {
            setIsOpenDisConnectModal(false);
            disconnectMutation.mutate();
          }}
        />
      )}
      {isOpenShareModal && (
        <MessageModal
          description="공유하는 편지에 대한 설명을 적어주세요!"
          placeholder="이곳을 눌러 설명을 작성해주세요"
          cancelText="취소하기"
          completeText="동의 요청 보내기"
          inputValue={shareComment}
          onInputChange={handleChangeComment}
          onCancel={() => {
            setIsOpenShareModal(false);
            setShareComment('');
          }}
          onComplete={() => {
            setIsOpenShareModal(false);
            shareMutation.mutate();
          }}
        >
          <p className="text-gray-70 body-m mt-1">상대방 동의 후에 게시글이 업로드 됩니다.</p>
        </MessageModal>
      )}
      <main className="flex grow flex-col px-5 pt-20 pb-10">
        <PageTitle className="mx-auto">
          {isShareMode
            ? '게시판에 올릴 편지를 선택해주세요'
            : `${userInfo.zipCode}님과 주고 받은 편지`}
        </PageTitle>
        <section className="text-gray-60 body-sb mt-18 mb-2 flex w-full justify-between">
          <p>주고 받은 편지 {mailLists.length}</p>
          <div className="flex items-center gap-0.5 underline">
            {!userInfo.isClosed && (
              <button type="button" onClick={toggleShareMode}>
                {isLoading ? '' : isShareMode ? '취소하기' : '편지 공유하기'}
              </button>
            )}
            {!isShareMode && !userInfo.isClosed && !isLoading && <InformationTooltip />}
          </div>
        </section>
        <section className="mb-5 flex flex-col gap-4">
          {isLoading ? (
            //TODO: skeleton
            <div>Loading</div>
          ) : (
            mailLists.map((letter, index) => (
              <LetterPreview
                key={letter.letterId}
                id={letter.letterId}
                date={letter.createdAt}
                title={letter.title}
                isSend={letter.myLetter}
                checked={selected.includes(letter.letterId)}
                isShareMode={isShareMode}
                isClosed={userInfo.isClosed}
                onToggle={() => toggleSelected(letter.letterId)}
                zipCode={userInfo.zipCode}
                ref={index === mailLists.length - 1 ? ref : null}
              />
            ))
          )}
        </section>
        {!isShareMode && !userInfo.isClosed && !isLoading && (
          <button
            type="button"
            className="body-sb text-gray-60 mt-auto text-left underline"
            onClick={() => setIsOpenDisConnectModal(true)}
          >
            더 이상 편지하지 않을래요
          </button>
        )}
      </main>
      {isShareMode && (
        <div className="left-1/2-translate-x-1/2 fixed bottom-10 z-20 w-full max-w-150 px-5">
          <button
            type="button"
            className="body-m primary-btn w-full py-2 text-black"
            disabled={selected.length === 0}
            onClick={() => setIsOpenShareModal(true)}
          >
            다음으로
          </button>
        </div>
      )}
    </>
  );
};

export default LetterBoxDetailPage;
