import { AlarmIcon } from '@/assets/icons';
import useNotificationStore from '@/stores/notification';
import { Link } from 'react-router';

export default function AlarmButton() {
  const notReadCount = useNotificationStore((state) => state.notReadCount);

  return (
    <Link to="/mypage/notifications" className="relative">
      {notReadCount > 0 && (
        <div className="absolute right-0 bottom-0 text-[10px]">{notReadCount}</div>
      )}
      <AlarmIcon className="h-6 w-6 text-white" />
    </Link>
  );
}
