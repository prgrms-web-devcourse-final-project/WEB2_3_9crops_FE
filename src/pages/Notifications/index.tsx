import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getTimeLines, patchReadNotification, patchReadNotificationAll } from '@/apis/notification';
import PageTitle from '@/components/PageTitle';

import NotificationItem from './components/NotificationItem';
import WarningModal from './components/WarningModal';
import SendingModal from './components/SendingModal';
import useNotificationStore from '@/stores/notificationStore';
import ShareModal from './components/ShareModal';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const decrementNotReadCount = useNotificationStore((state) => state.decrementNotReadCount);
  const setNotReadCount = useNotificationStore((state) => state.setNotReadCount);

  const [noti, setNoti] = useState<Noti[]>([]);

  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [isOpenSendingModal, setIsOpenSendingModal] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const [reportContent, setReportContent] = useState<string>('');

  // MEMO : 편지 데이터 전송중 데이터도 추가될건데 나중에 데이터 추가되면 코드 업데이트 하긔
  const handleClickItem = (alarmType: string, content?: string | number) => {
    if (alarmType === 'SENDING') {
      setIsOpenSendingModal(true);
    }
    if (alarmType === 'LETTER') {
      navigate(`/letter/${content}`);
    }
    if (alarmType === 'REPORT') {
      setIsOpenWarningModal(true);
      if (typeof content === 'string') setReportContent(content);
    }
    if (alarmType === 'SHARE') {
      setIsOpenShareModal(true);
    }
    if (alarmType === 'POSTED') {
      navigate(`/board/letter/${content}`);
    }
  };

  const handleGetTimeLines = async () => {
    const res = await getTimeLines();
    if (res?.status === 200) {
      setNoti(res.data.data.content);
    }
  };

  const handlePatchReadNotification = async (timelineId: number) => {
    const res = await patchReadNotification(timelineId);
    if (res?.status === 200) {
      setNoti((curNoti) =>
        curNoti.map((noti) => {
          if (noti.timelineId === timelineId && !noti.read) {
            decrementNotReadCount();
            return { ...noti, read: true };
          }
          return noti;
        }),
      );
    }
  };

  const handlePatchReadNotificationAll = async () => {
    const res = await patchReadNotificationAll();
    if (res?.status === 200) {
      setNoti((currentNoti) => {
        return currentNoti.map((noti) => {
          if (!noti.read) {
            return { ...noti, read: true };
          }
          return noti;
        });
      });
      setNotReadCount(0);
    }
  };

  useEffect(() => {
    handleGetTimeLines();
  }, []);

  return (
    <>
      <WarningModal
        isOpen={isOpenWarningModal}
        reportContent={reportContent}
        onClose={() => setIsOpenWarningModal(false)}
      />
      <SendingModal
        isOpenSendingModal={isOpenSendingModal}
        setIsOpenSendingModal={setIsOpenSendingModal}
      />
      <ShareModal isOpenShareModal={isOpenShareModal} setIsOpenShareModal={setIsOpenShareModal} />
      <main className="flex grow flex-col items-center px-5 pt-20 pb-9">
        <PageTitle className="mb-10">알림</PageTitle>
        <button
          type="button"
          className="body-sb text-gray-60 place-self-end dark:text-white"
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
