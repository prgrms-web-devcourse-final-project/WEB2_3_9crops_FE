import { useEffect, useState } from 'react';

import { getReports } from '@/apis/admin';
import { AlarmIcon } from '@/assets/icons';

import AdminPageTitle from './components/AdminPageTitle';
import ListHeaderFrame from './components/ListHeaderFrame';
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

  // const [allReports, setAllReports] = useState();

  const [reportQueryString, setReportQueryString] = useState<ReportQueryString>({
    reportType: null,
    status: 'PENDING',
    page: '1',
    size: '3',
  });
  const handleGetReports = async (reportQueryString: ReportQueryString) => {
    const res = await getReports(reportQueryString);
    if (res?.status === 200) {
      console.log(res.data.data.content);
      setReports(res.data.data.content);
      setReportPages(() => ({
        currentPage: res.data.data.currentPage,
        totalPages: res.data.data.totalPages,
      }));
    }
  };
  useEffect(() => {
    handleGetReports(reportQueryString);
  }, [reportQueryString]);
  return (
    <>
      <AdminPageTitle>검열 관리 / 신고 편지 목록</AdminPageTitle>
      <WrapperFrame>
        <WrapperTitle title="신고 편지 목록" Icon={AlarmIcon} />

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
          <div className="bg-accent-1 mt-5 flex h-10 w-full items-center justify-center">
            <div className="flex gap-2">
              <button
                className="h-full w-10 rounded-2xl border bg-white"
                onClick={() => {
                  const nowPage = Number(reportQueryString.page);
                  if (nowPage > 1) {
                    const newPage = (nowPage - 1).toString();
                    setReportQueryString((cur) => ({ ...cur, page: newPage }));
                  }
                }}
              >
                뒤
              </button>
              <span>
                {reportPages.currentPage}/{reportPages.totalPages}
              </span>
              <button
                className="h-full w-10 rounded-2xl border bg-white"
                onClick={() => {
                  const nowPage = Number(reportQueryString.page);
                  const totalPage = Number(reportPages.totalPages);
                  if (nowPage < totalPage) {
                    const newPage = (nowPage + 1).toString();
                    console.log(newPage);
                    setReportQueryString((cur) => ({ ...cur, page: newPage }));
                  }
                }}
              >
                앞
              </button>
            </div>
          </div>
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
