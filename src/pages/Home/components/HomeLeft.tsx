import RandomCheer from './RandomCheer';
import GoToWrite from './GoToWrite';
import GoToRandomLetter from './GoToRandomLetter';

const HomeLeft = () => {
  return (
    <div className="flex w-full flex-shrink-0 grow snap-start flex-col justify-between pt-64">
      <RandomCheer />
      <GoToWrite />

      <div className="relative mt-24 flex h-fit w-full flex-col justify-center">
        <div className="absolute top-[-94px] z-20 w-full">
          <GoToRandomLetter />
        </div>
        <img
          src="/src/assets/home_left_mountain.png"
          alt="home left mountain"
          className="z-10 w-full max-w-[600px]"
        />
      </div>
    </div>
  );
};

export default HomeLeft;
