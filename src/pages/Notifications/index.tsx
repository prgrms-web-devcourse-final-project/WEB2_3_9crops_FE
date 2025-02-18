import { useState } from 'react';

import NotificationItem from './components/NotificationItem';
import WarningModal from './components/WarningModal';

const DUMMY_NOTI = [
  { id: 1, type: 'letter', message: '12E31님이 편지를 보냈습니다.', isRead: false },
  { id: 2, type: 'warning', message: '따숨님, 욕설로 인해 경고를 받으셨어요.', isRead: false },
  { id: 3, type: 'letter', message: '12E31님이 편지를 보냈습니다.', isRead: false },
  { id: 4, type: 'letter', message: '12E31님이 편지를 보냈습니다.', isRead: true },
  { id: 5, type: 'letter', message: '12E31님이 편지를 보냈습니다.', isRead: false },
  { id: 6, type: 'board', message: '12E31님과의 대화가 게시판에 공유되었어요.', isRead: false },
  {
    id: 7,
    type: 'board',
    message: '12E31님과의 게시글에 대한 공유요청을 보냈어요.',
    isRead: false,
  },
];

const NotificationsPage = () => {
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);

  const handleClickItem = (type: string) => {
    if (type === 'warning') {
      setIsOpenWarningModal(true);
    }
  };

  return (
    <>
      <WarningModal isOpen={isOpenWarningModal} onClose={() => setIsOpenWarningModal(false)} />
      <main className="flex grow flex-col items-center px-5 py-9">
        <h1 className="text-gray-60 body-b mb-10 w-fit rounded-full bg-white px-6 py-4">알림</h1>
        <button type="button" className="body-sb text-gray-60 place-self-end">
          모두 읽음
        </button>
        <ul className="mt-2 flex h-full w-full flex-col gap-2 pb-10">
          {DUMMY_NOTI.map((notification) => (
            <li key={notification.id}>
              <NotificationItem
                type={notification.type}
                message={notification.message}
                isRead={notification.isRead}
                onClick={() => handleClickItem(notification.type)}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default NotificationsPage;
