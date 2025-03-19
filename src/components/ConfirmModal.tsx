import ModalBackgroundWrapper from './ModalBackgroundWrapper';
import ModalOverlay from './ModalOverlay';

interface ConfirmModalProps {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  confirmDisabled?: boolean;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  title,
  description,
  cancelText,
  confirmText,
  confirmDisabled,
  children,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <ModalOverlay>
      <div className="w-73">
        <ModalBackgroundWrapper className="relative mb-12 rounded-lg p-5">
          <div className="flex flex-col gap-1">
            <p className="body-m text-gray-80">{title}</p>
            <p className="caption-r text-black">{description}</p>
          </div>
          {children}
        </ModalBackgroundWrapper>
        <section className="flex items-center gap-6">
          <button
            type="button"
            className="body-m secondary-btn h-10 flex-1 basis-1/2"
            onClick={onCancel}
            aria-label={`${cancelText} 버튼`}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="primary-btn body-m h-10 flex-1 basis-1/2"
            disabled={confirmDisabled}
            onClick={onConfirm}
            aria-label={`${confirmText} 버튼`}
          >
            {confirmText}
          </button>
        </section>
      </div>
    </ModalOverlay>
  );
};

export default ConfirmModal;
