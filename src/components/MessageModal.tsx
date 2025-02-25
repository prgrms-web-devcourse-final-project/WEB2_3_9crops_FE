import { ChangeEvent } from 'react';

import ModalOverlay from './ModalOverlay';
import TextareaField from './TextareaField';

interface MessageModalProps {
  description?: string;
  inputValue: string;
  placeholder?: string;
  cancelText: string;
  completeText: string;
  children?: React.ReactNode;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onComplete: () => void;
}

const MessageModal = ({
  description,
  inputValue,
  placeholder,
  cancelText,
  completeText,
  children,
  onInputChange,
  onCancel,
  onComplete,
}: MessageModalProps) => {
  return (
    <ModalOverlay>
      <p className="body-sb mb-4 text-center text-white">{description}</p>
      <section className="relative mb-12 w-78 overflow-hidden rounded-lg bg-[#FFD3CE] p-4">
        <TextareaField
          rows={5}
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <div className="relative z-1">{children}</div>
        <div className="absolute inset-0 z-0 bg-white/60 blur-xl" />
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
          onClick={onComplete}
        >
          {completeText}
        </button>
      </section>
    </ModalOverlay>
  );
};

export default MessageModal;
