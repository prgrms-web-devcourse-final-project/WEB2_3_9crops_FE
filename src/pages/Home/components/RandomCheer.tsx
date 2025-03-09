import { useState } from 'react';

import randomCheerBird from '@/assets/images/field-theme-asset-bird.png';

import { RANDOM_CHEER_LIST } from '../constants';

const RandomCheer = () => {
  const getRandomCheer = (): string => {
    const randomIndex = Math.floor(Math.random() * RANDOM_CHEER_LIST.length);
    return RANDOM_CHEER_LIST[randomIndex];
  };

  const [randomCheer, setRandomCheer] = useState(getRandomCheer());

  return (
    <div className="z-26 mr-20 flex flex-col items-end">
      <div
        className="relative mb-3 w-fit rounded-lg border-1 border-white bg-white px-6 py-[7px] text-center"
        onClick={() => setRandomCheer(getRandomCheer())}
      >
        <p className="caption-m">{randomCheer}</p>
        <div className="absolute right-2 bottom-[-15px] -translate-x-1/2 transform border-x-[10px] border-t-[15px] border-x-transparent border-t-white"></div>
      </div>
      <img
        src={randomCheerBird}
        alt="random cheer bird"
        className="h-[26.5px] w-[21px] opacity-80"
        onClick={() => setRandomCheer(getRandomCheer())}
      />
    </div>
  );
};

export default RandomCheer;
