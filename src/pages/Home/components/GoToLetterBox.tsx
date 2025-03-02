import { Link } from 'react-router';

import goToLetterBoxNewLetters from '@/assets/images/go-to-letter-box-new-letters.png';
import goToLetterBox from '@/assets/images/go-to-letter-box.png';
import { useIncomingLettersStore } from '@/stores/incomingLettersStore';

const GoToLetterBox = () => {
  const { arrivedCount } = useIncomingLettersStore();

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
