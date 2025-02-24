import { useEffect, useState } from 'react';

import { client } from '@/apis/client';
import { AlarmIcon } from '@/assets/icons';

import DetailFrame from './components/DetailFrame';
import ListItem from './components/ListItem';
import WrapperFrame from './components/WrapperFrame';

export default function ReportManage() {
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  // {
  //   id: '001',
  //   reporterEmail: 'user1@gmail.com',
  //   targetEmail: 'user22@gmail.com',
  //   reportedAt: new Date(2025, 1, 20),
  //   letterId:2001,
  //   sharePostId:null,
  //   eventId:null,
  //   reportType:'LETTER',
  //   reason:"ABUSE",
  //   reasonDetail:null,
  //   status: 'PENDING',
  // },
  const DUMMY = [
    {
      id: '001',
      reporterEmail: 'user1fawfaws@gmail.com',
      targetEmail: 'faw5f1a5w6@gmail.com',
      reportedAt: new Date(2020, 12, 4),
      reason: '욕설',
    },
    {
      id: '002',
      reporterEmail: 'user1fawfaws@gmail.com',
      targetEmail: 'faw5f1a5w6@gmail.com',
      reportedAt: new Date(2020, 12, 4),
      reason: '욕설',
    },
    {
      id: '003',
      reporterEmail: 'fa5w6f1a5f1w6@gmail.com',
      targetEmail: 'afwf@gmail.com',
      reportedAt: new Date(2000, 6, 23),
      reason: '욕설',
    },
    {
      id: '004',
      reporterEmail: 'a@gmail.com',
      targetEmail: 'a1f515wa6@gmail.com',
      reportedAt: new Date(1080, 11, 5),
      reason: '욕설',
    },
    {
      id: '005',
      reporterEmail: 'aa@gmail.com',
      targetEmail: 'w@gmail.com',
      reportedAt: new Date(2040, 1, 2),
      reason: '욕설',
    },
    {
      id: '006',
      reporterEmail: 'a5w1f65a@gmail.com',
      targetEmail: 'aw1f56a1f5aw16@gmail.com',
      reportedAt: new Date(2025, 1, 23),
      reason: '욕설',
    },
  ];
  const modalContents = [
    {
      title: '신고 목록 삭제',
      onClick: () => {
        console.log('삭제');
      },
    },
    {
      title: '작성자 활동 정지',
      onClick: () => {
        console.log('정지');
      },
    },
  ];
  // const [allReports, setAllReports] = useState();
  useEffect(() => {
    const getAllReports = async () => {
      const res = await client.get('/api/reports');
      console.log(res);
    };
    getAllReports();
    const getReportDetail = async () => {
      const res = await client.get('/api/reports/2');
      console.log(res);
    };
    getReportDetail();
    const postReport = async () => {
      const res = await client.post('/api/reports', {
        letterId: 2010,
        reportType: 'POST',
        reason: 'HARASSMENT',
        reasonDetail: '테스트용',
      });
      console.log(res);
    };
    postReport();
  }, []);
  return (
    <WrapperFrame>
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
        {DUMMY.map((data, idx) => (
          <ListItem
            data={data}
            modalContents={modalContents}
            key={idx}
            setDetailModalOpen={setDetailModalOpen}
          />
        ))}
      </section>
      {detailModalOpen && (
        <DetailFrame closeEvent={setDetailModalOpen}>
          <>
            <span className="h2-sb">제보 편지 상세 조회</span>
          </>
        </DetailFrame>
      )}
    </WrapperFrame>
  );
}
