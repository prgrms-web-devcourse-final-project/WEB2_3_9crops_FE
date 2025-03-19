import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { postReports } from '@/apis/admin';

import ConfirmModal from './ConfirmModal';
import TextareaField from './TextareaField';
import useToastStore from '@/stores/toastStore';

interface ReportModalProps {
  reportType: ReportType;
  letterId: number;
  onClose: () => void;
}

interface ReportReason {
  name: string;
  type: Reason;
}
const REPORT_REASON: ReportReason[] = [
  { name: '욕설', type: 'ABUSE' },
  { name: '비방', type: 'DEFAMATION' },
  { name: '폭언', type: 'THREATS' },
  { name: '성희롱', type: 'HARASSMENT' },
  { name: '기타', type: 'ETC' },
];

const ReportModal = ({ reportType, letterId, onClose }: ReportModalProps) => {
  const [postReportRequest, setPostReportRequest] = useState<PostReportRequest>({
    reportType: reportType,
    reasonType: '',
    reason: '',
    letterId: reportType === 'LETTER' ? letterId : null,
    sharePostId: reportType === 'SHARE_POST' ? letterId : null,
    eventCommentId: reportType === 'EVENT_COMMENT' ? letterId : null,
  });

  const handleReasonClick = (reason: Reason) => {
    if (postReportRequest.reasonType === reason)
      setPostReportRequest((cur) => ({ ...cur, reasonType: '' }));
    else setPostReportRequest((cur) => ({ ...cur, reasonType: reason }));
  };

  const setToastActive = useToastStore((state) => state.setToastActive);

  const handleSubmit = async () => {
    const res = await postReports(postReportRequest);
    if (res?.status === 200) {
      setToastActive({ title: '신고가 접수되었습니다.', toastType: 'Success' });
      onClose();
    } else {
      setToastActive({ title: '신고한 이력이 있습니다.', toastType: 'Error' });
      onClose();
    }
  };

  return (
    <ConfirmModal
      title="신고 사유를 선택해주세요"
      description="신고한 게시물은 관리자 검토 후 처리됩니다."
      cancelText="취소하기"
      confirmText="제출하기"
      confirmDisabled={postReportRequest.reasonType === ''}
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
              postReportRequest.reasonType === reason.type && 'bg-primary-2',
            )}
            onClick={() => handleReasonClick(reason.type)}
            aria-label={`신고 사유: ${reason.name}`}
          >
            {reason.name}
          </button>
        ))}
      </section>
      <TextareaField
        rows={3}
        placeholder="이곳을 눌러 추가 사유를 작성해주세요"
        value={postReportRequest.reason}
        onChange={(e) => setPostReportRequest((cur) => ({ ...cur, reason: e.target.value }))}
      />
    </ConfirmModal>
  );
};

export default ReportModal;
