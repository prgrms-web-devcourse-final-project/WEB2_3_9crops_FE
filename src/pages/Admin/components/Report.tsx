import { AlarmIcon } from '@/assets/icons';
import WrapperBox from './WrapperBox';

export default function ReportManage() {
  const DUMMY = [
    {
      id: '001',
      reporterEmail: 'user1@gmail.com',
      editorEmail: 'user22@gmail.com',
      reportedAt: new Date(2025, 1, 20),
      reason: '욕설',
    },
    {
      id: '002',
      reporterEmail: 'user1fawfaws@gmail.com',
      editorEmail: 'faw5f1a5w6@gmail.com',
      reportedAt: new Date(2020, 12, 4),
      reason: '욕설',
    },
    {
      id: '003',
      reporterEmail: 'fa5w6f1a5f1w6@gmail.com',
      editorEmail: 'afwf@gmail.com',
      reportedAt: new Date(2000, 6, 23),
      reason: '욕설',
    },
    {
      id: '004',
      reporterEmail: 'a@gmail.com',
      editorEmail: 'a1f515wa6@gmail.com',
      reportedAt: new Date(1080, 11, 5),
      reason: '욕설',
    },
    {
      id: '005',
      reporterEmail: 'aa@gmail.com',
      editorEmail: 'w@gmail.com',
      reportedAt: new Date(2040, 1, 2),
      reason: '욕설',
    },
    {
      id: '006',
      reporterEmail: 'a5w1f65a@gmail.com',
      editorEmail: 'aw1f56a1f5aw16@gmail.com',
      reportedAt: new Date(2025, 1, 23),
      reason: '욕설',
    },
  ];
  return (
    <WrapperBox>
      <span className="h3-sb flex items-center gap-4.5">
        <AlarmIcon className="h-9 w-9"></AlarmIcon> 신고 편지 목록
      </span>
      <section className="mt-5 flex flex-col">
        <div className="bg-primary-3 flex w-full border-b px-6 py-4">
          <div className="flex w-[80%] items-center">
            <span className="ml-4 flex basis-1/10 overflow-ellipsis">ID</span>
            <span className="ml-4 flex basis-2/10">제보자 이메일</span>
            <span className="ml-4 flex basis-2/10">작성자 이메일</span>
            <span className="ml-4 flex basis-2/10">제보 일자</span>
            <span className="ml-4 flex basis-3/10">제보 사유</span>
          </div>
        </div>
        {DUMMY.map((data) => (
          <div className="hover:bg-primary-4 flex justify-between border-b bg-white px-6 py-4">
            <div className="flex w-[80%] items-center">
              <span className="ml-4 line-clamp-1 flex basis-1/10">{data.id}</span>
              <span className="ml-4 line-clamp-1 flex basis-2/10">{data.reporterEmail}</span>
              <span className="ml-4 line-clamp-1 flex basis-2/10">{data.editorEmail}</span>
              <span className="ml-4 line-clamp-1 flex basis-2/10">{`${data.reportedAt.getFullYear()}.${data.reportedAt.getMonth()}.${data.reportedAt.getDay()}`}</span>
              <span className="ml-4 line-clamp-1 flex basis-3/10">{data.reason}</span>
            </div>
            <button>a</button>
          </div>
        ))}
      </section>
    </WrapperBox>
  );
}
