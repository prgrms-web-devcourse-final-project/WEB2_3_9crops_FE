import { useEffect, useState } from 'react';

import { getUnreadLettersCount } from '@/apis/unreadLetters';

import FloatingLetters from './FloatingLetters';
import GoToLetterBoard from './GoToLetterBoard';
import GoToLetterBox from './GoToLetterBox';
import UnreadLetterModal from './UnreadLetterModal';

const HomeRight = () => {
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
    <div className="flex h-screen w-full max-w-150 min-w-[300px] flex-shrink-0 grow snap-start flex-col items-center overflow-x-hidden pt-5">
      {arrivedCount !== 0 && <FloatingLetters />}
      <GoToLetterBox />
      <GoToLetterBoard />
      {arrivedCount !== 0 && <UnreadLetterModal />}
    </div>
  );
};

export default HomeRight;
