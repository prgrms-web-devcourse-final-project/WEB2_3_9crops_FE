import { twMerge } from 'tailwind-merge';

interface MemoWrapperProps {
  isSender?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const MemoWrapper = ({ isSender = false, className, children, onClick }: MemoWrapperProps) => {
  return (
    <article
      className={twMerge(
        'relative flex overflow-hidden p-4',
        isSender ? 'memo-sender-bg' : 'letter-receiver-bg',
        className,
      )}
      onClick={onClick}
    >
      <div className="z-10 w-full">{children}</div>
      <div
        className={twMerge(
          'absolute inset-0 z-0 blur-xl',
          isSender ? 'bg-white/50' : 'bg-white/70',
        )}
      />
    </article>
  );
};

export default MemoWrapper;
