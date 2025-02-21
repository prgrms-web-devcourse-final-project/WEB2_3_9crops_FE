import CommentBg from '@/assets/images/memo-pink.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';

interface CommentProps {
  comment: RollingPaperComment;
  onClick: () => void;
}

const Comment = ({ comment, onClick }: CommentProps) => {
  return (
    <BackgroundImageWrapper
      as="article"
      className="flex min-h-20 cursor-pointer p-4 text-black"
      imageUrl={CommentBg}
      onClick={onClick}
    >
      <div className="h-full w-full">
        <p className="caption-r whitespace-pre-wrap">{comment.content}</p>
        <p className="caption-m mt-1 place-self-end">From. {comment.zipCode}</p>
      </div>
    </BackgroundImageWrapper>
  );
};

export default Comment;
