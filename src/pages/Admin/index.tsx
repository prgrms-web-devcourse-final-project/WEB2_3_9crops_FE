import { Outlet, useNavigate } from 'react-router';

import { AlarmIcon, ArrowDownIcon } from '@/assets/icons';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <main className="flex h-full min-h-screen w-full">
      <section className="bg-primary-3 flex flex-1 grow basis-1/6 flex-col">
        <div className="bg-primary-3 flex h-24 w-full items-center justify-center border-b py-5">
          로고
        </div>
        <div className="flex flex-col gap-2.5 border-b px-7 py-5">
          <span className="h3-r px-2.5 py-2">로그인된 계정</span>
          <span className="h3-b">{'admin123@test.com'}</span>
        </div>
        <div className="flex grow flex-col justify-between">
          <section className="flex flex-col gap-4 py-5">
            <span className="h3-r px-7 py-2">사이트 관리</span>

            <div>
              <button className="flex w-full items-center gap-5 px-7 py-2 hover:bg-amber-50">
                <AlarmIcon className="h-7 w-7" /> <span className="h2-b">대시보드</span>
              </button>
            </div>

            <div>
              <button className="flex w-full items-center gap-5 px-7 py-2 hover:bg-amber-50">
                <AlarmIcon className="h-7 w-7" /> <span className="h2-b">사용자 목록</span>
              </button>
            </div>

            <div className="flex flex-col">
              <button className="flex w-full items-center gap-5 px-7 py-2 hover:bg-amber-50">
                <AlarmIcon className="h-7 w-7" />
                <span className="h2-b">게시판 관리</span>
                <ArrowDownIcon className="ml-auto h-6 w-6" />
              </button>
              <div className="flex flex-col">
                <button className="flex w-full items-center gap-5 py-2 pl-19 hover:bg-amber-100">
                  공개 편지 설정
                </button>
                <button className="flex w-full items-center gap-5 py-2 pl-19 hover:bg-amber-100">
                  롤링 페이퍼 설정
                </button>
              </div>
            </div>

            <div>
              <button className="flex w-full items-center gap-5 px-7 py-2 hover:bg-amber-50">
                <AlarmIcon className="h-7 w-7" />
                <span className="h2-b">검열 관리</span>
                <ArrowDownIcon className="ml-auto h-6 w-6" />
              </button>
              <div className="flex flex-col">
                <button
                  className="flex w-full items-center gap-5 py-2 pl-19 hover:bg-amber-100"
                  onClick={() => navigate('/admin/report')}
                >
                  신고 편지 목록
                </button>
                <button
                  className="flex w-full items-center gap-5 py-2 pl-19 hover:bg-amber-100"
                  onClick={() => navigate('/admin/badwords')}
                >
                  필터링 단어 설정
                </button>
                <button
                  className="flex w-full items-center gap-5 py-2 pl-19 hover:bg-amber-100"
                  onClick={() => navigate('/admin/filtered-letter')}
                >
                  차단된 편지 목록
                </button>
              </div>
            </div>
          </section>
          <button className="flex w-full items-center gap-5 px-7 py-4 hover:bg-amber-50">
            <AlarmIcon className="h-7 w-7" /> <span className="h2-r">로그아웃</span>
          </button>
        </div>
      </section>
      <section className="flex flex-1 grow basis-5/6 flex-col bg-amber-200">
        <div className="h2-l w-full border-b border-[#D6D6D6] bg-white py-5 pl-10.5">
          사용자 목록
        </div>
        <div className="bg-primary-4 h-full p-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
};
export default AdminPage;
