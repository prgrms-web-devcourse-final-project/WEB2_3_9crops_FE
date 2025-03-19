import { Link } from 'react-router';

import goToWrite from '@/assets/images/postoffice-letter.webp';

const GoToWrite = () => {
  return (
    <Link to="/letter/write" className="h-fit w-fit pl-[87px]">
      <p className="text-gray-60 body-r dark:body-b mb-1 rotate-[-5.277deg] dark:text-white">
        속마음 나누기
      </p>
      <img src={goToWrite} alt="go to write" className="h-auto w-auto" />
    </Link>
  );
};

export default GoToWrite;
