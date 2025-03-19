import { Link } from 'react-router';

import goToLetterBoard from '@/assets/images/go-to-letter-board.webp';

const GoToLetterBoard = () => {
  return (
    <Link
      to="/board/letter"
      className="absolute right-[-56%] bottom-[28%] z-9 w-full flex-col md:right-[-42%] lg:right-[-20%]"
    >
      <p className="text-gray-60 body-r mb-1 ml-2 dark:text-white">게시판</p>
      <img
        src={goToLetterBoard}
        alt="go to letter board"
        className="h-auto w-[160px] sm:w-[200px] md:w-[240px]"
      />
    </Link>
  );
};

export default GoToLetterBoard;
