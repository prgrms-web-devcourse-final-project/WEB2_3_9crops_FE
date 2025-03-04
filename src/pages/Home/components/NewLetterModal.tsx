import { useEffect, useState } from 'react';

import { getUnreadLettersCount } from '@/apis/unreadLetters';

const NewLetterModal = () => {
  const [arrivedCount, setArrivedCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const result = await getUnreadLettersCount();
        setArrivedCount(result.data);
      } catch (error) {
        console.error('❌ 안 읽은 편지 개수를 불러오는 데 실패했습니다:', error);
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

export default NewLetterModal;
