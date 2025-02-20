import { useState } from 'react';
import { RANDOM_CHEER_LIST } from '../constants';

const RandomCheer = () => {
  const getRandomCheer = (): string => {
    const randomIndex = Math.floor(Math.random() * RANDOM_CHEER_LIST.length);
    return RANDOM_CHEER_LIST[randomIndex];
  };

  const [randomCheer, setRandomCheer] = useState(getRandomCheer());

  return (
    <div className="flex flex-col items-end pr-20">
      <div
        className="relative mb-3 w-fit rounded-lg border-1 border-white bg-white px-6 py-[7px] text-center"
        onClick={() => setRandomCheer(getRandomCheer())}
      >
        <p className="caption-m">{randomCheer}</p>
        <div className="absolute right-2 bottom-[-15px] -translate-x-1/2 transform border-x-[10px] border-t-[15px] border-x-transparent border-t-white"></div>
      </div>
      <img
        src="/src/assets/random_cheer_bird.png"
        alt="random cheer bird"
        className="h-[26.5px] w-[21px] opacity-80"
      />
    </div>
  );
};

export default RandomCheer;
