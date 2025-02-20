import { Link } from 'react-router';

const GoToRandomLetter = () => {
  return (
    <>
      <p className="text-gray-60 body-r mb-1 rotate-[-5.277deg] pl-5">고민편지 보러가기</p>
      <Link to={'/letter/random'}>
        <img src="/src/assets/go_to_random_letter.png" alt="go to random letter" />
      </Link>
    </>
  );
};

export default GoToRandomLetter;
