import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRollingPaperList } from '@/apis/rolling';
import { AddIcon, AlarmIcon } from '@/assets/icons';

import AddRollingPaperModal from './components/AddRollingPaperModal';
import PageTitle from './components/AdminPageTitle';
import RollingPaperItem from './components/RollingPaperItem';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';
import PagenationNavigation from './components/PagenationNavigation';

const SIZE = 10;

export default function AdminRollingPaper() {
  const [activeModal, setActiveModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('1');
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['admin-rolling-paper', currentPage],
    queryFn: () => getRollingPaperList(currentPage ?? 1, SIZE),
  });

  const handleNowPage = (page: string) => {
    setCurrentPage(page);
    refetch();
  };

  return (
    <>
      {activeModal && (
        <AddRollingPaperModal currentPage={currentPage} onClose={() => setActiveModal(false)} />
      )}
      <PageTitle>게시판 관리 / 롤링 페이퍼 설정</PageTitle>
      <WrapperFrame>
        <section className="flex items-center">
          <WrapperTitle title="롤링페이퍼" Icon={AlarmIcon} />
          <button
            type="button"
            className="ml-auto flex items-center gap-2 rounded-md text-black"
            onClick={() => setActiveModal(true)}
          >
            <AddIcon />
            롤링페이퍼 생성
          </button>
        </section>
        {isLoading && <p className="mt-20 text-center">Loading...</p>}
        {isSuccess && (
          <>
            <table className="mt-5 table-auto">
              <thead>
                <tr className="bg-primary-3 border-gray-40 h-14 border-b">
                  <th className="w-14 text-center">ID</th>
                  <th className="text-left">제목</th>
                  <th className="w-30 text-center">상태</th>
                  <th className="w-6"></th>
                </tr>
              </thead>
              <tbody>
                {data.content.map((rollingPaper) => (
                  <RollingPaperItem
                    key={rollingPaper.eventPostId}
                    information={rollingPaper}
                    currentPage={currentPage}
                  />
                ))}
              </tbody>
            </table>
            {data.content.length === 0 && (
              <span className="my-10 text-center text-gray-50">
                아직 생성된 롤링페이퍼가 없어요
              </span>
            )}
          </>
        )}
        <PagenationNavigation
          totalPage={Number(data?.totalPages)}
          buttonLength={5}
          handlePageNumberButtonClick={handleNowPage}
        />
      </WrapperFrame>
    </>
  );
}
