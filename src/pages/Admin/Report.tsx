import { useEffect, useState } from 'react';

import { getReports } from '@/apis/admin';
import { AlarmIcon } from '@/assets/icons';

import ReportDetailModal from './components/ReportDetailModal';
import ReportHandlingModal from './components/ReportHandlingModal';
import ReportListItem from './components/ReportListItem';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';

export default function ReportManage() {
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [handleModalOpen, setHandleModalOpen] = useState<boolean>(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectReport] = useState<Report | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // const [allReports, setAllReports] = useState();
  useEffect(() => {
    getReports(setReports, '?status=PENDING');
  }, []);
  return (
    <WrapperFrame>
      <WrapperTitle title="신고 편지 목록" Icon={AlarmIcon} />

      <section className="mt-5 flex flex-col">
        <div className="bg-primary-3 flex w-full border-b px-6 py-4">
          <div className="flex w-[80%] items-center">
            <span className="admin-list-set basis-1/10 overflow-ellipsis">ID</span>
            <span className="admin-list-set basis-2/10">제보자 이메일</span>
            <span className="admin-list-set basis-2/10">작성자 이메일</span>
            <span className="admin-list-set basis-2/10">제보 일자</span>
            <span className="admin-list-set basis-3/10">제보 사유</span>
          </div>
        </div>
        {reports.map((data, idx) => (
          <ReportListItem
            key={idx}
            report={data}
            setDetailModalOpen={setDetailModalOpen}
            setSelectedReportId={setSelectedReportId}
            setHandleModalOpen={setHandleModalOpen}
            setSelectReport={setSelectReport}
          />
        ))}
      </section>
      {detailModalOpen && (
        <ReportDetailModal selectedReport={selectedReport} closeEvent={setDetailModalOpen} />
      )}
      {handleModalOpen && (
        <ReportHandlingModal
          setReports={setReports}
          setHandleModalOpen={setHandleModalOpen}
          selectedReportId={selectedReportId}
        />
      )}
    </WrapperFrame>
  );
}
