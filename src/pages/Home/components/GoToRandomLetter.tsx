import { Link } from 'react-router';
import goToRandomLetter from '@/assets/images/go-to-random-letter.png';

const GoToRandomLetter = () => {
  return (
    <>
      <p className="text-gray-60 body-r mb-1 rotate-[-5.277deg] pl-5">고민편지 보러가기</p>
      <Link to={'/letter/random'}>
        <img src={goToRandomLetter} alt="go to random letter" />
      </Link>
    </>
  );
};

export default GoToRandomLetter;
