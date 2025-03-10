import { getNotReadCount } from '@/apis/notification';
import { AlarmIcon } from '@/assets/icons';
import useNotificationStore from '@/stores/notificationStore';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function NotificationButton() {
  const notReadCount = useNotificationStore((state) => state.notReadCount);
  const setNotReadCount = useNotificationStore((state) => state.setNotReadCount);
  const notReadStyle = twMerge(
    `absolute -right-1 -bottom-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-400 text-[8px] text-white`,
    notReadCount >= 100 && 'w-4 h-4',
  );

  const handleGetNotReadCount = async () => {
    const res = await getNotReadCount();
    if (res?.status === 200) {
      const updateNotReadCount: number = res.data.data.notReadCount;
      setNotReadCount(updateNotReadCount);
    }
  };

  useEffect(() => {
    handleGetNotReadCount();
  });

  return (
    <Link to="/mypage/notifications" className="relative">
      {notReadCount > 0 && (
        <div className={notReadStyle}>{notReadCount < 100 ? notReadCount : '99+'}</div>
      )}
      <AlarmIcon className="h-6 w-6 text-white" />
    </Link>
  );
}
