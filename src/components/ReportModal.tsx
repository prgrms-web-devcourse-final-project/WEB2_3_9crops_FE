import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import ConfirmModal from './ConfirmModal';
import TextareaField from './TextareaField';

interface ReportModalProps {
  onClose: () => void;
}

const REPORT_REASON = ['욕설', '비방', '폭언', '성희롱', '기타'];

const ReportModal = ({ onClose }: ReportModalProps) => {
  const [selected, setSelected] = useState('');
  const [additionalReason, setAdditionalReason] = useState('');

  const handleReasonClick = (reason: string) => {
    if (selected === reason) setSelected('');
    else setSelected(reason);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <ConfirmModal
      title="신고 사유를 선택해주세요"
      description="신고한 게시물은 관리자 검토 후 처리됩니다."
      cancelText="취소하기"
      confirmText="제출하기"
      confirmDisabled={selected === ''}
      onCancel={onClose}
      onConfirm={handleSubmit}
    >
      <section className="my-6 flex flex-wrap gap-x-2.5 gap-y-2">
        {REPORT_REASON.map((reason) => (
          <button
            type="button"
            className={twMerge(
              'body-m rounded-full bg-white px-5 py-1.5 text-black',
              selected === reason && 'bg-primary-2',
            )}
            onClick={() => handleReasonClick(reason)}
          >
            {reason}
          </button>
        ))}
      </section>
      <TextareaField
        rows={3}
        placeholder="이곳을 눌러 추가 사유를 작성해주세요"
        value={additionalReason}
        onChange={(e) => setAdditionalReason(e.target.value)}
      />
    </ConfirmModal>
  );
};

export default ReportModal;
