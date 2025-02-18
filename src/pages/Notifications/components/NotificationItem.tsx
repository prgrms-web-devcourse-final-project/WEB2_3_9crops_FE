import { twMerge } from 'tailwind-merge';

import { NOTIFICATION_ICON } from '../constants';

interface NotificationItemProps {
  type: string;
  message: string;
  isRead: boolean;
  onClick: () => void;
}

const NotificationItem = ({ type, message, isRead, onClick }: NotificationItemProps) => {
  const Icon = NOTIFICATION_ICON[type];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <article
      className={twMerge(
        'relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-sm p-4',
        type === 'warning' ? 'alarm-warning-bg' : 'alarm-default-bg',
      )}
      onClick={handleClick}
    >
      {isRead && <div className="absolute inset-0 z-10 bg-white/60" />}
      <div className="absolute inset-0 bg-white/50 blur-xl" />
      <Icon className="z-0 h-6 w-6 text-white" />
      <p className="body-m text-gray-80 z-0">{message}</p>
    </article>
  );
};

export default NotificationItem;
