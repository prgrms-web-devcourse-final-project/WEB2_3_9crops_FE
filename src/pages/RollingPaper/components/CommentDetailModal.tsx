import ModalBg from '@/assets/images/memo-pink.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import ModalOverlay from '@/components/ModalOverlay';

interface CommentDetailModalProps {
  comment: RollingPaperComment;
  isWriter: boolean;
  onClose: () => void;
  onReport: () => void;
  onDelete: () => void;
}

const CommentDetailModal = ({
  comment,
  isWriter,
  onClose,
  onReport,
  onDelete,
}: CommentDetailModalProps) => {
  const handleButtonClick = () => {
    if (isWriter) {
      // TODO: 삭제 로직
      onDelete();
    } else {
      onReport();
    }
  };

  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <>
        <button type="button" className="body-b ml-auto text-white" onClick={handleButtonClick}>
          {isWriter ? '삭제하기' : '신고하기'}
        </button>
        <BackgroundImageWrapper
          as="article"
          className="mt-1 flex max-h-1/2 w-78 flex-col gap-3 overflow-y-auto px-5 py-4 text-black"
          imageUrl={ModalBg}
        >
          <p className="body-r leading-[26px]">{comment.content}</p>
          <p className="body-m place-self-end">From. {comment.zipCode}</p>
        </BackgroundImageWrapper>
      </>
    </ModalOverlay>
  );
};

export default CommentDetailModal;
