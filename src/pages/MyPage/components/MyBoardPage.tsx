import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getMySharePostList } from '@/apis/myPage';
import BackgroundBottom from '@/components/BackgroundBottom';
import PageTitle from '@/components/PageTitle';

import LetterPreview from '../../LetterBoard/components/LetterPreview';

const MyBoardPage = () => {
  const navigate = useNavigate();

  const fetchMyPostList = async () => {
    try {
      const response = await getMySharePostList();
      if (!response) throw new Error('게시글 목록을 불러오는데 실패했습니다.');
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  const {
    data: postLists = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sharePostList'],
    queryFn: () => fetchMyPostList(),
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isError) {
    navigate('/notFound');
  }
  return (
    <>
      <main className={twMerge('flex grow flex-col px-5 pt-20 pb-10')}>
        <PageTitle className="mx-auto mb-11">내가 올린 게시물</PageTitle>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <section className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
            {postLists.map(
              (item: { sharePostId: number; writerZipCode: string }, index: number) => (
                <LetterPreview
                  key={index}
                  id={item.sharePostId}
                  to={item.writerZipCode}
                  from="12E21"
                  content="저희가 주고 받은 행운의 편지 저희가 주고 받은 행운의 편지 저희가 주고 받은 행운의 편지
        저희가 주고 받은 행운의 편지"
                />
              ),
            )}
          </section>
        )}
      </main>
      <BackgroundBottom />
    </>
  );
};

export default MyBoardPage;
