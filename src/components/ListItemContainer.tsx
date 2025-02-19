import { twMerge } from 'tailwind-merge';

interface ListItemContainerProps {
  isSender?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ListItemContainer = ({
  isSender = false,
  className,
  children,
  onClick,
}: ListItemContainerProps) => {
  return (
    <article
      className={twMerge(
        'relative flex overflow-hidden rounded-sm p-4',
        isSender ? 'list-sender-bg' : 'list-receiver-bg',
        className,
      )}
      onClick={onClick}
    >
      <div className="z-10">{children}</div>
      <div className="absolute inset-0 z-0 bg-white/50 blur-xl" />
    </article>
  );
};

export default ListItemContainer;
