import MemoWrapper from '@/components/MemoWrapper';
import ModalOverlay from '@/components/ModalOverlay';

interface CommentDetailModalProps {
  comment: RollingPaperComment;
  isWriter: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const CommentDetailModal = ({ comment, isWriter, onClose, onDelete }: CommentDetailModalProps) => {
  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <>
        {isWriter && (
          <button type="button" className="body-b ml-auto text-white" onClick={onDelete}>
            삭제하기
          </button>
        )}

        <MemoWrapper className="mt-1 flex max-h-1/2 w-78 overflow-y-auto px-5 text-black">
          <div className="z-1 flex flex-col gap-3">
            <p className="body-r leading-[26px]">{comment.content}</p>
            <p className="body-m place-self-end">From. {comment.zipCode}</p>
          </div>
        </MemoWrapper>
      </>
    </ModalOverlay>
  );
};

export default CommentDetailModal;
