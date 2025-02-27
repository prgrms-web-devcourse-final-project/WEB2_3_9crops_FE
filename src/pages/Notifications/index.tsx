import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getTimeLines } from '@/apis/notification';
import PageTitle from '@/components/PageTitle';

import NotificationItem from './components/NotificationItem';
import WarningModal from './components/WarningModal';

const DUMMY_NOTI: Noti[] = [
  {
    timelineId: 1,
    alarmType: 'LETTER',
    content: 1,
    message: '12E31님이 편지를 보냈습니다.',
    read: false,
  },
  {
    timelineId: 2,
    alarmType: 'REPORT',
    content: '욕설 확인되어 경고 조치함.',
    message: '따숨님, 욕설로 인해 경고를 받으셨어요.',
    read: false,
  },
  {
    timelineId: 3,
    alarmType: 'LETTER',
    content: 1,
    message: '12E31님이 편지를 보냈습니다.',
    read: false,
  },
  {
    timelineId: 4,
    alarmType: 'LETTER',
    content: 1,
    message: '12E31님이 편지를 보냈습니다.',
    read: true,
  },
  {
    timelineId: 5,
    alarmType: 'LETTER',
    content: 1,
    message: '12E31님이 편지를 보냈습니다.',
    read: false,
  },
  {
    timelineId: 6,
    alarmType: 'POSTED',
    content: 1,
    message: '12E31님과의 대화가 게시판에 공유되었어요.',
    read: false,
  },
  {
    timelineId: 7,
    alarmType: 'SHARE',
    content: 1,
    message: '12E31님과의 게시글에 대한 공유요청을 보냈어요.',
    read: false,
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [noti, getNoti] = useState<Noti[]>([]);

  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);

  const [adminText, setAdmintext] = useState<string>('');

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

  useEffect(() => {
    getTimeLines(getNoti);
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
        <button type="button" className="body-sb text-gray-60 place-self-end">
          모두 읽음
        </button>
        <ul className="mt-2 flex h-full w-full flex-col gap-2 pb-10">
          {DUMMY_NOTI.map((notification) => (
            <li key={notification.timelineId}>
              <NotificationItem
                type={notification.alarmType}
                message={notification.message}
                read={notification.read}
                onClick={() => handleClickItem(notification.alarmType, notification.content)}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default NotificationsPage;
