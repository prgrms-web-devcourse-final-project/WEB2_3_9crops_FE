import { Link } from 'react-router';
import goToLetterBoard from '@/assets/images/go-to-letter-board.png';

const GoToLetterBoard = () => {
  return (
    <div className="absolute right-[-30px] bottom-48 z-20 flex w-fit">
      <div className="text-left">
        <p className="text-gray-60 body-r mb-1 ml-2">게시판</p>
        <Link to="/letter/board">
          <img src={goToLetterBoard} alt="go to letter board" className="w-[177px]" />
        </Link>
      </div>
    </div>
  );
};

export default GoToLetterBoard;
