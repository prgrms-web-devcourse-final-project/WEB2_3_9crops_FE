import DetailFrame from './DetailFrame';

export default function ReportDetailModal({
  selectedReport,
  closeEvent,
}: {
  selectedReport: Report | null;
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DetailFrame closeEvent={closeEvent}>
      <>
        <span className="h2-b">제보 편지 상세 조회</span>
        <div className="mt-2.5 w-full rounded-lg border border-[#D6D6D6] px-3 py-4">
          <span>{selectedReport?.reasonDetail}</span>
        </div>
        <div className="mt-2.5 flex w-full flex-col gap-5 rounded-lg border border-[#D6D6D6] px-3 py-4">
          <span className="body-l-b">{selectedReport?.letterDetail.title}</span>
          <span>{selectedReport?.letterDetail.content}</span>
        </div>
      </>
    </DetailFrame>
  );
}
