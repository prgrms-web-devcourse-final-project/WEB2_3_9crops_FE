import MessageBg from '@/assets/images/memo-pink.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';

interface MessageProps {
  message: {
    content: string;
    sender: string;
  };
  onClick: () => void;
}

const Message = ({ message, onClick }: MessageProps) => {
  return (
    <BackgroundImageWrapper
      as="article"
      className="flex min-h-20 cursor-pointer flex-col p-4 text-black"
      imageUrl={MessageBg}
      onClick={onClick}
    >
      <p className="caption-r whitespace-pre-wrap">{message.content}</p>
      <p className="caption-m mt-1 place-self-end">From. {message.sender}</p>
    </BackgroundImageWrapper>
  );
};

export default Message;
