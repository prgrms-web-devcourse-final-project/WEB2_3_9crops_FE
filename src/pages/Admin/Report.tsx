import { useEffect, useState } from 'react';

import { getReports } from '@/apis/admin';
import { AlarmIcon } from '@/assets/icons';

import AdminPageTitle from './components/AdminPageTitle';
import ListHeaderFrame from './components/ListHeaderFrame';
import PagenationNavigation from './components/PagenationNavigation';
import ReportDetailModal from './components/ReportDetailModal';
import ReportHandlingModal from './components/ReportHandlingModal';
import ReportListItem from './components/ReportListItem';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';

export default function ReportManage() {
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [handleModalOpen, setHandleModalOpen] = useState<boolean>(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [reportPages, setReportPages] = useState<ReportPages>({
    currentPage: '1',
    totalPages: '0',
  });

  const [selectedReport, setSelectReport] = useState<Report | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const [reportQueryString, setReportQueryString] = useState<ReportQueryString>({
    reportType: null,
    status: 'PENDING',
    page: '1',
    size: '8',
  });

  const handleGetReports = async (reportQueryString: ReportQueryString) => {
    const res = await getReports(reportQueryString);
    if (res?.status === 200) {
      const data = res.data.data;
      setReports(data.content);
      setReportPages(() => ({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      }));
    }
  };

  const handleNowPage = (page: string) => {
    setReportQueryString((cur) => ({ ...cur, page: page }));
  };

  const handleStatus = (status: Status) => {
    setReportQueryString((cur) => ({ ...cur, status: status }));
  };

  useEffect(() => {
    handleGetReports(reportQueryString);
  }, [reportQueryString]);
  return (
    <>
      <AdminPageTitle>검열 관리 / 신고 편지 목록</AdminPageTitle>
      <WrapperFrame>
        <div className="flex items-center justify-between">
          <WrapperTitle title="신고 편지 목록" Icon={AlarmIcon} />
          <select
            onChange={(e) => {
              const status = e.currentTarget.value as Status;
              handleStatus(status);
            }}
          >
            <option value="PENDING">대기중</option>
            <option value="RESOLVED">승인됨</option>
            <option value="REJECTED">거절됨</option>
          </select>
        </div>

        <section className="mt-5 flex flex-col">
          <ListHeaderFrame>
            <span className="admin-list-set basis-1/10 overflow-ellipsis">ID</span>
            <span className="admin-list-set basis-2/10">제보자 이메일</span>
            <span className="admin-list-set basis-2/10">작성자 이메일</span>
            <span className="admin-list-set basis-2/10">제보 일자</span>
            <span className="admin-list-set basis-3/10">제보 사유</span>
          </ListHeaderFrame>
          {reports?.map((data, idx) => (
            <ReportListItem
              key={idx}
              report={data}
              setDetailModalOpen={setDetailModalOpen}
              setSelectedReportId={setSelectedReportId}
              setHandleModalOpen={setHandleModalOpen}
              setSelectReport={setSelectReport}
            />
          ))}
          <PagenationNavigation
            totalPage={Number(reportPages.totalPages)}
            buttonLength={3}
            handlePageNumberButtonClick={handleNowPage}
          />
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
    </>
  );
}
