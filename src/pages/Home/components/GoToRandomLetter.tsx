import { Link } from 'react-router';

import goToRandomLetter from '@/assets/images/go-to-random-letter.webp';

const GoToRandomLetter = () => {
  return (
    <>
      <div className="z-20 h-fit w-fit">
        <p className="text-gray-60 body-r mb-1 ml-5 rotate-[-5.277deg] dark:text-white">
          고민편지 보러가기
        </p>
        <Link to={'/letter/random'}>
          <img src={goToRandomLetter} alt="go to random letter" className="h-45 translate-x-5" />
        </Link>
      </div>
    </>
  );
};

export default GoToRandomLetter;
