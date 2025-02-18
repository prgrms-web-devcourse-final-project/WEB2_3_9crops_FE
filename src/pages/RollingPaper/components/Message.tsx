import MessageBg from '@/assets/images/memo-pink.png';

interface MessageProps {
  message: {
    content: string;
    sender: string;
  };
  onClick: () => void;
}

const Message = ({ message, onClick }: MessageProps) => {
  return (
    <article
      className="flex min-h-20 cursor-pointer flex-col bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center p-4 text-black"
      style={{ '--bg-image': `url(${MessageBg})` } as React.CSSProperties}
      onClick={onClick}
    >
      <p className="caption-r whitespace-pre-wrap">{message.content}</p>
      <p className="caption-m mt-1 place-self-end">From. {message.sender}</p>
    </article>
  );
};

export default Message;
