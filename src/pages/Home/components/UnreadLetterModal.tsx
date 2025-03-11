import { useEffect, useState } from 'react';

import { getUnreadLettersCount } from '@/apis/unreadLetters';
import useToastStore from '@/stores/toastStore';

const UnreadLetterModal = () => {
  const [arrivedCount, setArrivedCount] = useState<number>(0);
  const setToastActive = useToastStore((state) => state.setToastActive);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const result = await getUnreadLettersCount();
        setArrivedCount(result.data);
      } catch (error) {
        console.error('❌ 안 읽은 편지 개수를 불러오는 데 실패했습니다:', error);
        setToastActive({
          toastType: 'Error',
          title: '서버 오류로 안 읽은 편지 개수를 불러오는 데에 실패했습니다.',
          time: 5,
        });
      }
    };
    fetchUnreadCount();
  }, []);

  return (
    <p className="text-gray-60 body-b absolute top-30 mb-10 w-fit animate-pulse rounded-full bg-white px-6 py-4">
      {arrivedCount}통의 편지가 도착했어요!
    </p>
  );
};

export default UnreadLetterModal;
