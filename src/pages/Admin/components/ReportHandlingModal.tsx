import { useState } from 'react';

import { patchReport } from '@/apis/admin';
import ModalOverlay from '@/components/ModalOverlay';

export default function ReportHandlingModal({
  setReports,
  setHandleModalOpen,
  selectedReportId,
}: {
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  setHandleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedReportId: number | null;
}) {
  const handleDeleteList = (targetId: number) => {
    setReports((curReports) =>
      curReports.filter((report) => {
        if (report.id === targetId) return false;
        return true;
      }),
    );
  };

  const [reportRequest, setReportRequest] = useState<PatchReportRequest>({
    status: 'RESOLVED',
    adminMemo: '',
  });
  return (
    <ModalOverlay>
      <div className="bg-primary-4 flex w-100 flex-col gap-3 rounded-lg p-5">
        <select
          id="status"
          className="border-gray-30 border bg-white p-2"
          onChange={(e) => {
            const status = e.target.value as 'RESOLVED' | 'REJECTED';
            setReportRequest((cur) => ({ ...cur, status: status }));
          }}
        >
          <option value="RESOLVED">신고 승인</option>
          <option value="REJECTED">신고 거부</option>
        </select>
        <textarea
          rows={3}
          className="border-gray-30 w-full border bg-white p-2"
          placeholder="adminMemo"
          value={reportRequest.adminMemo}
          onChange={(e) => {
            setReportRequest((cur) => ({ ...cur, adminMemo: e.target.value }));
          }}
        ></textarea>
        <div className="flex w-full gap-3">
          <button
            className="bg-gray-10 flex basis-1/2 items-center justify-center p-2"
            onClick={() => {
              setHandleModalOpen(false);
            }}
          >
            취소
          </button>
          <button
            className="flex basis-1/2 items-center justify-center bg-red-500 p-2"
            onClick={() => {
              if (!selectedReportId) return;
              patchReport(selectedReportId, reportRequest);
              // patchReport 오류시 다음 코드들 막는게 필요한데 아직은 api가 완성되지 않았으니 후에 처리
              handleDeleteList(selectedReportId);
              setHandleModalOpen(false);
            }}
          >
            전송
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
