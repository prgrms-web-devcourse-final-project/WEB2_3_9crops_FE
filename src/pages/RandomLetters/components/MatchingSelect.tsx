import { useEffect, useState } from 'react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';

import 'swiper/swiper-bundle.css';

import { getRandomLetters } from '@/apis/randomLetter';
import { RestartIcon } from '@/assets/icons';
import ResultLetter from '@/components/ResultLetter';

import { CATEGORY_LIST } from '../constants';

export default function MatchingSelect({
  setOpenModal,
  setSelectedLetter,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLetter: React.Dispatch<React.SetStateAction<RandomLetters>>;
}) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [randomLetters, setRandomLetters] = useState<RandomLetters[]>([]);

  const DUMMY_LIST: RandomLetters[] = [
    {
      letterId: 1,
      title: '위로가 필요해요',
      zipCode: '1aq23',
      category: 'CONSOLATION',
      createdAt: new Date(),
    },
    {
      letterId: 2,
      title: '아래로가 필요해요',
      zipCode: '23w7q',
      category: 'CELEBRATION',
      createdAt: new Date(),
    },
    {
      letterId: 3,
      title: '안녕하세요',
      zipCode: '9a5g7',
      category: 'ETC',
      createdAt: new Date(),
    },
  ];

  useEffect(() => {
    getRandomLetters(setRandomLetters, selectedCategory);
    console.log(randomLetters);
  }, [selectedCategory]);

  return (
    <>
      <div className="mt-25 flex flex-col items-start justify-center">
        <button
          className="flex gap-1"
          onClick={() => {
            getRandomLetters(setRandomLetters, selectedCategory);
          }}
        >
          <img src={RestartIcon} alt="재시작 아이콘" />
          <span className="caption-sb text-gray-30" aria-label="리스트 새로고침 버튼">
            리스트 새로고침
          </span>
        </button>
        <div className="w-full max-w-[300px]">
          <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
            {DUMMY_LIST.map((list, idx) => {
              return (
                <SwiperSlide key={idx} className="max-w-full">
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedLetter(list);
                    }}
                  >
                    <ResultLetter
                      categoryName={list.category}
                      title={list.title}
                      zipCode={list.zipCode}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="mt-11 flex w-60 flex-wrap items-center justify-center gap-2">
        {CATEGORY_LIST.map((category, idx) => {
          return (
            <button
              onClick={() => {
                setSelectedCategory(category.category);
              }}
              className={twMerge(
                `body-b text-gray-60 rounded-full bg-white px-3 py-1.5`,
                selectedCategory === category.category && 'bg-primary-1 text-white',
              )}
              key={idx}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </>
  );
}
