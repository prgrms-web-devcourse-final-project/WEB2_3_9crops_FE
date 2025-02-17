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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-73">
        <section className="bg-primary-3 mb-12 rounded-lg p-5">
          <div className="flex flex-col gap-1">
            <p className="body-m text-gray-80">{title}</p>
            <p className="caption-r text-black">{description}</p>
          </div>
          {children}
        </section>
        <section className="flex items-center gap-6">
          <button
            type="button"
            className="bg-primary-4 body-m h-10 grow rounded-lg text-gray-50"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="bg-primary-3 body-m h-10 grow rounded-lg text-black"
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
