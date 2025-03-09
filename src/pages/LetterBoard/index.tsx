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
      if (!response) throw new Error('게시글 목록을 불러오는데 실패했습니다.');
      console.log('page', response);
      return response as SharePostResponse;
    } catch (e) {
      console.error(e);
    }
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['sharePostList'],
      queryFn: ({ pageParam = 1 }) => fetchPostList(pageParam),
      enabled: true,
      initialPageParam: 1,
      getNextPageParam: (res) => {
        if (!res || res.currentPage >= res.totalPages) {
          return undefined;
        }
        return res.currentPage + 1;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const postLists = data?.pages.flatMap((page) => page?.content) || [];

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
      <main className="mt-[-25px] flex grow flex-col px-5 pt-20 pb-10">
        <>
          <NoticeRollingPaper />
          <PageTitle className="mx-auto mt-4">게시판</PageTitle>
          <p className="text-gray-60 caption-m mt-4.5 text-center dark:text-white">
            따숨이에게 힘이 되었던 다양한 편지들을 모아두었어요
          </p>
        </>
        {isLoading ? (
          <p>loading</p>
        ) : postLists && postLists?.length > 0 ? (
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
          <p className="body-m text-gray-60 mt-10 text-center dark:text-white">
            게시글이 없습니다.
          </p>
        )}
      </main>
      <BackgroundBottom />
    </>
  );
};

export default LetterBoardPage;
