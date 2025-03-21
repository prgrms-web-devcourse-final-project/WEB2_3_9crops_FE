import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { getUnreadLettersCount } from '@/apis/unreadLetters';
import goToLetterBoxNewLetters from '@/assets/images/go-to-letter-box-new-letters.webp';
import goToLetterBox from '@/assets/images/go-to-letter-box.webp';
import useToastStore from '@/stores/toastStore';

const GoToLetterBox = () => {
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
    <Link to="/letter/box" className="absolute bottom-[11%] left-5 z-9 flex-col">
      <p className="text-gray-60 body-r mb-1 ml-2 dark:text-white">내 편지함</p>
      <img
        src={arrivedCount ? goToLetterBoxNewLetters : goToLetterBox}
        alt={arrivedCount ? '새로운 편지가 있는 내 편지함' : '빈 내 편지함'}
        className="h-auto w-[190px] sm:w-[210px] md:w-[240px]"
      />
    </Link>
  );
};

export default GoToLetterBox;
