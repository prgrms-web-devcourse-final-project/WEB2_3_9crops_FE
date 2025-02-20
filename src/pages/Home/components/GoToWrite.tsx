import { Link } from 'react-router';
import goToWrite from '@/assets/images/go-to-write.png';

const GoToWrite = () => {
  return (
    <div className="h-fit w-fit pl-[87px]">
      <p className="text-gray-60 body-r mb-1 rotate-[-5.277deg]">속마음 나누기</p>
      <Link to={'/letter/write'}>
        <img src={goToWrite} alt="go to write" />
      </Link>
    </div>
  );
};

export default GoToWrite;
