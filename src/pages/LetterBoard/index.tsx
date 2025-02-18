import NoticeRolling from '@/components/NoticeRolling';
import PageTitle from '@/components/PageTitle';
import Header from '@/layouts/Header';

import LetterPreview from './components/LetterPreview';

const LetterBoardPage = () => {
  return (
    <>
      <Header />
      <main className="mt-[-9px] flex grow flex-col items-center px-5 pb-10">
        <NoticeRolling />
        <PageTitle className="mt-4">게시판</PageTitle>
        <p className="text-gray-60 caption-m mt-4.5">
          따숨이에게 힘이 되었던 다양한 편지들을 모아두었어요
        </p>
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
    </>
  );
};

export default LetterBoardPage;
