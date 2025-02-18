import ModalBg from '@/assets/images/yellow-modal.png';

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
  // TODO: 배경 이미지 삽입
  // TODO: 전역 상태로 관리해야하는지 고민
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-73">
        <section className="relative mb-12 overflow-hidden rounded-lg p-5">
          <img src={ModalBg} className="absolute inset-0 z-[-10] h-full w-full" />
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
    </div>
  );
};

export default ConfirmModal;
