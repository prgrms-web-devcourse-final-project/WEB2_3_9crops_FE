import DetailFrame from './DetailFrame';
import DetailSmallBoxFrame from './DetailSmallBoxFrame';

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

        <div className="mt-5 flex flex-col gap-2">
          <span className="body-l-sb">신고사유</span>
          <DetailSmallBoxFrame className="flex flex-col gap-5">
            <span>{selectedReport?.reason}</span>
          </DetailSmallBoxFrame>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <span className="body-l-sb">편지 상세</span>
          <DetailSmallBoxFrame className="flex flex-col gap-5">
            <span className="body-l-b">{selectedReport?.contentDetail.title}</span>
            <span>{selectedReport?.contentDetail.content}</span>
          </DetailSmallBoxFrame>
        </div>
      </>
    </DetailFrame>
  );
}
