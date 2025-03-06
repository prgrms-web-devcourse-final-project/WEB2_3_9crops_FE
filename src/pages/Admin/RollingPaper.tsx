import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRollingPaperList } from '@/apis/rolling';
import { AddIcon, AlarmIcon } from '@/assets/icons';

import AddRollingPaperModal from './components/AddRollingPaperModal';
import PageTitle from './components/AdminPageTitle';
import RollingPaperItem from './components/RollingPaperItem';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';

export default function AdminRollingPaper() {
  const [activeModal, setActiveModal] = useState(false);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['admin-rolling-paper'],
    queryFn: getRollingPaperList,
  });
  console.log(data);

  return (
    <>
      {activeModal && <AddRollingPaperModal onClose={() => setActiveModal(false)} />}
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
          <table className="mt-5 table-auto">
            <thead>
              <tr className="bg-primary-3 border-gray-40 h-14 border-b">
                <th className="w-14 text-center">ID</th>
                <th className="text-left">제목</th>
                <th className="w-30 text-center">상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.content.map((rollingPaper) => (
                <RollingPaperItem key={rollingPaper.eventPostId} information={rollingPaper} />
              ))}
            </tbody>
          </table>
        )}
        {/* TODO: 페이지네이션 적용 */}
      </WrapperFrame>
    </>
  );
}
