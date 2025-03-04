import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface LetterWrapperProps {
  isSender?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const LetterWrapper = forwardRef<HTMLDivElement, LetterWrapperProps>(
  ({ isSender = false, className, children, onClick }, ref) => {
    return (
      <article
        className={twMerge(
          'relative flex overflow-hidden rounded-sm p-4',
          isSender ? 'letter-sender-bg' : 'letter-receiver-bg',
          className,
        )}
        onClick={onClick}
        ref={ref}
      >
        <div className="z-10 w-full">{children}</div>
        <div className="absolute inset-0 z-0 bg-white/50 blur-xl" />
      </article>
    );
  },
);

export default LetterWrapper;
