import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getTimeLines, patchReadNotification, patchReadNotificationAll } from '@/apis/notification';
import PageTitle from '@/components/PageTitle';

import NotificationItem from './components/NotificationItem';
import WarningModal from './components/WarningModal';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [noti, setNoti] = useState<Noti[]>([]);

  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);

  const [adminText, setAdmintext] = useState<string>('');

  // MEMO : 편지 데이터 전송중 데이터도 추가될건데 나중에 데이터 추가되면 코드 업데이트 하긔
  const handleClickItem = (alarmType: string, content?: string | number) => {
    if (alarmType === 'LETTER') {
      navigate(`/letter/${content}`);
    }
    if (alarmType === 'REPORT') {
      setIsOpenWarningModal(true);
      if (typeof content === 'string') setAdmintext(content);
    }
    if (alarmType === 'SHARE') {
      navigate(`/board/letter/${content}`, { state: { isShareLetterPreview: true } });
    }
    if (alarmType === 'POSTED') {
      navigate(`/board/letter/${content}`);
    }
  };

  const handleGetTimeLines = async () => {
    const res = await getTimeLines();
    if (res?.status === 200) {
      console.log(res);
      setNoti(res.data.data.content);
    }
  };

  const handlePatchReadNotification = async (timelineId: number) => {
    const res = await patchReadNotification(timelineId);
    if (res?.status !== 200) {
      console.log('읽음처리 에러 발생');
    }
  };

  const handlePatchReadNotificationAll = async () => {
    const res = await patchReadNotificationAll();
    if (res?.status !== 200) {
      console.log('모두 읽음처리 에러 발생');
    }
  };

  useEffect(() => {
    handleGetTimeLines();
  }, []);

  return (
    <>
      <WarningModal
        isOpen={isOpenWarningModal}
        adminText={adminText}
        onClose={() => setIsOpenWarningModal(false)}
      />
      <main className="flex grow flex-col items-center px-5 pt-20 pb-9">
        <PageTitle className="mb-10">알림</PageTitle>
        <button
          type="button"
          className="body-sb text-gray-60 place-self-end"
          onClick={() => {
            handlePatchReadNotificationAll();
          }}
        >
          모두 읽음
        </button>
        <ul className="mt-2 flex h-full w-full flex-col gap-2 pb-10">
          {noti.map((notification) => (
            <li key={notification.timelineId}>
              <NotificationItem
                type={notification.alarmType}
                title={notification.title}
                read={notification.read}
                onClick={() => {
                  handleClickItem(notification.alarmType, notification.content);
                  handlePatchReadNotification(notification.timelineId);
                }}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default NotificationsPage;
