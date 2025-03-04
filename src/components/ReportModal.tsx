import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { postReports } from '@/apis/admin';

import ConfirmModal from './ConfirmModal';
import TextareaField from './TextareaField';

interface ReportModalProps {
  reportType: ReportType;
  letterId: number | null;
  onClose: () => void;
}
const ReportModal = ({ reportType, letterId, onClose }: ReportModalProps) => {
  interface ReportReason {
    name: string;
    type: Reason;
  }
  const REPORT_REASON: ReportReason[] = [
    { name: '욕설', type: 'ABUSE' },
    { name: '비방', type: 'DEFAMATION' },
    { name: '폭언', type: 'HARASSMENT' },
    { name: '성희롱', type: 'THREATS' },
    { name: '기타', type: 'ETC' },
  ];

  const [reportRequest, setReportRequest] = useState<PostReportRequest>({
    reportType: reportType,
    reasonType: '',
    reason: '',
    letterId: letterId,
  });

  const handleReasonClick = (reason: Reason) => {
    if (reportRequest.reasonType === reason)
      setReportRequest((cur) => ({ ...cur, reasonType: '' }));
    else setReportRequest((cur) => ({ ...cur, reasonType: reason }));
  };

  const handleSubmit = async () => {
    const res = await postReports(reportRequest);
    if (res?.status === 200) {
      alert('신고처리되었습니다(토스트UI로 바꾸자)');
      onClose();
    }
  };

  useEffect(() => {
    if (!letterId) {
      alert('신고창을 여는 도중 오류가 발생했습니다(페이지를 새로고침 해주세요');
      onClose();
    }
    setReportRequest((cur) => ({ ...cur }));
  }, [letterId, onClose]);

  return (
    <ConfirmModal
      title="신고 사유를 선택해주세요"
      description="신고한 게시물은 관리자 검토 후 처리됩니다."
      cancelText="취소하기"
      confirmText="제출하기"
      confirmDisabled={reportRequest.reasonType === ''}
      onCancel={onClose}
      onConfirm={handleSubmit}
    >
      <section className="my-6 flex flex-wrap gap-x-2.5 gap-y-2">
        {REPORT_REASON.map((reason, idx) => (
          <button
            key={idx}
            type="button"
            className={twMerge(
              'body-m rounded-full bg-white px-5 py-1.5 text-black',
              reportRequest.reasonType === reason.type && 'bg-primary-2',
            )}
            onClick={() => handleReasonClick(reason.type)}
          >
            {reason.name}
          </button>
        ))}
      </section>
      <TextareaField
        rows={3}
        placeholder="이곳을 눌러 추가 사유를 작성해주세요"
        value={reportRequest.reason}
        onChange={(e) => setReportRequest((cur) => ({ ...cur, reason: e.target.value }))}
      />
    </ConfirmModal>
  );
};

export default ReportModal;
