import ModalBg from '@/assets/images/memo-pink.png';
import ModalOverlay from '@/components/ModalOverlay';

interface MessageDetailModalProps {
  message: {
    content: string;
    sender: string;
  };
  isWriter: boolean;
  onClose: () => void;
}

const MessageDetailModal = ({ message, isWriter, onClose }: MessageDetailModalProps) => {
  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <>
        <button type="button" className="body-b ml-auto text-white">
          {isWriter ? '삭제하기' : '신고하기'}
        </button>
        <article
          className="mt-1 flex max-h-1/2 w-78 flex-col gap-3 overflow-y-auto bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center px-5 py-4 text-black"
          style={{ '--bg-image': `url(${ModalBg})` } as React.CSSProperties}
        >
          <p className="body-r leading-[26px]">{message.content}</p>
          <p className="body-m place-self-end">From. {message.sender}</p>
        </article>
      </>
    </ModalOverlay>
  );
};

export default MessageDetailModal;
