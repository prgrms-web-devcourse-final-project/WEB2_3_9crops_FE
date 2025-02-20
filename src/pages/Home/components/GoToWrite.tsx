import { Link } from 'react-router';

const GoToWrite = () => {
  return (
    <div className="h-fit pl-[87px]">
      <p className="text-gray-60 body-r mb-1 rotate-[-5.277deg]">속마음 나누기</p>
      <Link to={'/letter/write'}>
        <img src="/src/assets/go_to_write.png" alt="go to wrte" />
      </Link>
    </div>
  );
};

export default GoToWrite;
