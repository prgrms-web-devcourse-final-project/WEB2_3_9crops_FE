import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { getUnreadLettersCount } from '@/apis/unreadLetters';
import goToLetterBoxNewLetters from '@/assets/images/go-to-letter-box-new-letters.png';
import goToLetterBox from '@/assets/images/go-to-letter-box.png';
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
    <div className="absolute bottom-15 left-5 z-9 flex">
      <div className="text-left">
        <p className="text-gray-60 body-r mb-1 ml-2">내 편지함</p>
        <Link to="/letter/box">
          <img
            src={arrivedCount ? goToLetterBoxNewLetters : goToLetterBox}
            alt="go to letter box"
            className="w-[206.5px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default GoToLetterBox;
