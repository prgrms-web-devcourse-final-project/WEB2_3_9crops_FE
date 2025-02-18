import ModalBg from '@/assets/images/yellow-modal.png';

import ModalOverlay from './ModalOverlay';

interface ConfirmModalProps {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  title,
  description,
  cancelText,
  confirmText,
  children,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  // TODO: 전역 상태로 관리해야하는지 고민
  return (
    <ModalOverlay>
      <div className="w-73">
        <section
          className="mb-12 rounded-lg bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center p-5"
          style={{ '--bg-image': `url(${ModalBg})` } as React.CSSProperties}
        >
          <div className="flex flex-col gap-1">
            <p className="body-m text-gray-80">{title}</p>
            <p className="caption-r text-black">{description}</p>
          </div>
          {children}
        </section>
        <section className="flex items-center gap-6">
          <button
            type="button"
            className="body-m secondary-btn h-10 flex-1 basis-1/2"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="primary-btn body-m h-10 flex-1 basis-1/2"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </section>
      </div>
    </ModalOverlay>
  );
};

export default ConfirmModal;
