import { useState } from 'react';

import { KebobMenuIcon } from '@/assets/icons';

import MenuModal from './MenuModal';

export default function ReportListItem({
  report,
  setDetailModalOpen,
  setSelectedReportId,
  setHandleModalOpen,
  setSelectReport,
}: {
  report: Report;
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedReportId: React.Dispatch<React.SetStateAction<number | null>>;
  setHandleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectReport: React.Dispatch<React.SetStateAction<Report | null>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const dateString = report.reportedAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const modalContents: ModalContents[] = [
    {
      title: '신고 처리',
      onClick: () => {
        setSelectedReportId(report.id);
        setHandleModalOpen(true);
      },
    },
  ];

  const reasonList = {
    ABUSE: '욕설',
    DEFAMATION: '비방',
    HARASSMENT: '성희롱',
    THREATS: '폭언',
    ETC: '기타',
  };
  return (
    <div
      className="hover:bg-primary-4 relative flex cursor-pointer justify-between border-b bg-white px-6 py-4"
      onClick={() => {
        setSelectReport(report);
        setDetailModalOpen(true);
      }}
    >
      <div className="flex h-full w-[80%] items-center">
        <span className="admin-list-set basis-1/10">{report.id}</span>
        <span className="admin-list-set basis-2/10">{report.reporterEmail}</span>
        <span className="admin-list-set basis-2/10">{report.targetEmail}</span>
        <span className="admin-list-set basis-2/10">{`${formattedDate} ${formattedTime}`}</span>
        <span className="admin-list-set basis-3/10">{reasonList[report.reason]}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen((cur) => !cur);
        }}
      >
        <KebobMenuIcon className="h-5 w-5" />
      </button>
      {modalOpen && <MenuModal modalContents={modalContents} setModalOpen={setModalOpen} />}
    </div>
  );
}
