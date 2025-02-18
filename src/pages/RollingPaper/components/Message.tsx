import MessageBg from '@/assets/images/memo-pink.png';

interface MessageProps {
  content: string;
}

const Message = ({ content }: MessageProps) => {
  return (
    <article
      className="caption-m min-h-20 bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center p-4 whitespace-pre-wrap text-black"
      style={{ '--bg-image': `url(${MessageBg})` } as React.CSSProperties}
    >
      {content}
    </article>
  );
};

export default Message;
