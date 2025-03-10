import MemoWrapper from '@/components/MemoWrapper';

interface CommentProps {
  comment: RollingPaperComment;
  onClick: () => void;
}

const Comment = ({ comment, onClick }: CommentProps) => {
  return (
    <MemoWrapper className="cursor-pointer text-black" onClick={onClick}>
      <div className="z-1 h-full w-full">
        <p className="caption-r break-all whitespace-pre-wrap">{comment.content}</p>
        <p className="caption-m mt-1 place-self-end">From. {comment.zipCode}</p>
      </div>
    </MemoWrapper>
  );
};

export default Comment;
