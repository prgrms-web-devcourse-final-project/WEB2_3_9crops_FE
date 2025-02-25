import { twMerge } from 'tailwind-merge';

import BackgroundBottom from '@/components/BackgroundBottom';
import NoticeRollingPaper from '@/components/NoticeRollingPaper';
import PageTitle from '@/components/PageTitle';

import LetterPreview from './components/LetterPreview';

const LetterBoardPage = () => {
  const isMyBoard = window.location.pathname.includes('/mypage');

  return (
    <>
      <main className={twMerge('flex grow flex-col px-5 pt-20 pb-10', !isMyBoard && 'mt-[-25px]')}>
        {isMyBoard ? (
          <PageTitle className="mx-auto mb-11">내가 올린 게시물</PageTitle>
        ) : (
          <>
            <NoticeRollingPaper />
            <PageTitle className="mx-auto mt-4">게시판</PageTitle>
            <p className="text-gray-60 caption-m mt-4.5 text-center">
              따숨이에게 힘이 되었던 다양한 편지들을 모아두었어요
            </p>
          </>
        )}
        <section className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <LetterPreview
              key={index}
              id={`${index}`}
              to="12E21"
              from="12E21"
              content="저희가 주고 받은 행운의 편지 저희가 주고 받은 행운의 편지 저희가 주고 받은 행운의 편지
        저희가 주고 받은 행운의 편지"
            />
          ))}
        </section>
      </main>
      <BackgroundBottom />
    </>
  );
};

export default LetterBoardPage;
