import { twMerge } from 'tailwind-merge';

import ModalOverlay from '@/components/ModalOverlay';

interface WarningModalProps {
  isOpen: boolean;
  reportContent: string;
  onClose: () => void;
}

const WarningModal = ({ isOpen, reportContent, onClose }: WarningModalProps) => {
  const divideContents = reportContent.split('§');
  if (!isOpen) return null;
  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <article
        className={twMerge(
          'relative w-77 overflow-hidden rounded-sm p-6',
          'bg-accent-1 bg-[url("/src/assets/images/background-overlay.png")] bg-repeat bg-blend-overlay',
        )}
      >
        <div className="absolute inset-0 h-full w-full bg-white/90 blur-[25px]" />
        <div className="relative">
          <h2 className="body-sb mb-1.5 text-gray-100">경고 안내</h2>
          <p className="caption-r mb-5 text-black">
            따사로운 서비스 이용을 위해, 부적절하다고 판단되는 편지는 반려하고 있어요. 서로를
            존중하는 따뜻한 공간을 만들기 위해 협조 부탁드립니다.
          </p>

          <h2 className="body-sb mb-1.5 text-gray-100">관리자 코멘트</h2>
          <p className="caption-r mb-5 text-black">{divideContents[0]}</p>

          <h2 className="body-sb mb-1.5 text-gray-100">현재 경고 누적</h2>
          <p className="caption-r mb-5 text-black">{`${divideContents[1]} 회`}</p>

          <h2 className="body-sb mb-1.5 text-gray-100">경고 규칙</h2>
          <p className="caption-r text-black">3회 경고: 서비스 이용 불가능</p>
        </div>
      </article>
    </ModalOverlay>
  );
};

export default WarningModal;
