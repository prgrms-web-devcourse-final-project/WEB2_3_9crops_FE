import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';

import { getSharePostList } from '@/apis/share';
import BackgroundBottom from '@/components/BackgroundBottom';
import NoticeRollingPaper from '@/components/NoticeRollingPaper';
import PageTitle from '@/components/PageTitle';

import LetterPreview from './components/LetterPreview';

const LetterBoardPage = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const fetchPostList = async (page: number = 1) => {
    try {
      const response = await getSharePostList(page);
      if (!response || !response.content) {
        console.error('게시글 목록을 불러오는데 실패했습니다.');
        return { content: [], currentPage: page, totalPages: 1 };
      }
      console.log('게시글 목록', response);
      return response as SharePostResponse;
    } catch (e) {
      console.error(e);
      return { content: [], currentPage: page, totalPages: 1 };
    }
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['sharePostList'],
      queryFn: ({ pageParam = 1 }) => fetchPostList(pageParam),
      enabled: true,
      initialPageParam: 1,
      getNextPageParam: (res) => {
        if (!res || !res?.content || res?.currentPage >= res?.totalPages) {
          return undefined;
        } else if (res) {
          return res.currentPage + 1;
        }
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    });

  const postLists = data?.pages?.flatMap((page) => page?.content || []) || [];

  useEffect(() => {
    if (!hasNextPage) return;
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    navigate('/notFound');
  }

  return (
    <>
      <main className="z-1 mt-[-25px] flex grow flex-col px-5 pt-20 pb-10">
        <>
          <NoticeRollingPaper />
          <PageTitle className="mx-auto mt-4">게시판</PageTitle>
          <p className="text-gray-60 caption-m mt-4.5 text-center">
            따숨이에게 힘이 되었던 다양한 편지들을 모아두었어요
          </p>
        </>
        {isLoading ? (
          <p className="body-m text-gray-60 mt-10 text-center">로딩 중 입니다.</p>
        ) : postLists ? (
          postLists?.length > 0 ? (
            <section className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
              {postLists?.map((item, index) => {
                return (
                  <LetterPreview
                    key={index}
                    id={item?.sharePostId || 0}
                    to={item?.receiverZipCode || 'ERROR'}
                    from={item?.writerZipCode || 'ERROR'}
                    content={item?.content || 'no Data'}
                    ref={index === postLists.length - 1 ? ref : null}
                  />
                );
              })}
            </section>
          ) : (
            <p className="body-m text-gray-60 mt-10 text-center">게시글이 없습니다.</p>
          )
        ) : (
          <p className="body-m text-gray-60 mt-10 text-center">
            오류가 발생했습니다. 다시 한 번 시도해주세요
          </p>
        )}
      </main>
      <BackgroundBottom />
    </>
  );
};

export default LetterBoardPage;
