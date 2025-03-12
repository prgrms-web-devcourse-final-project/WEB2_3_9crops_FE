import { Link } from 'react-router';

import goToLetterBoard from '@/assets/images/go-to-letter-board.png';

const GoToLetterBoard = () => {
  return (
    <div className="absolute right-[-56%] bottom-[28%] z-9 flex w-full md:right-[-42%] lg:right-[-20%]">
      <div className="text-left">
        <p className="text-gray-60 body-r mb-1 ml-2 dark:text-white">게시판</p>
        <Link to="/board/letter">
          <img
            src={goToLetterBoard}
            alt="go to letter board"
            className="w-[160px] sm:w-[200px] md:w-[240px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default GoToLetterBoard;
