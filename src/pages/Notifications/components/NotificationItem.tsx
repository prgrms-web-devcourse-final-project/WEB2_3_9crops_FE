import LetterWrapper from '@/components/LetterWrapper';

import { NOTIFICATION_ICON } from '../constants';

interface NotificationItemProps {
  type: string;
  title: string;
  read: boolean;
  onClick: () => void;
}

const NotificationItem = ({ type, title, read, onClick }: NotificationItemProps) => {
  const Icon = NOTIFICATION_ICON[type];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <LetterWrapper isSender={type === 'REPORT'} onClick={handleClick}>
      <div className="flex items-center gap-3">
        {read && <div className="absolute inset-0 z-10 bg-white/60" />}
        <Icon className="z-0 h-6 w-6 text-white" />
        <p className="body-m text-gray-80 z-0">{title}</p>
      </div>
    </LetterWrapper>
  );
};

export default NotificationItem;
