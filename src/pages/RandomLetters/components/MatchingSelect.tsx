import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';

import 'swiper/swiper-bundle.css';

import { getRandomLetters } from '@/apis/randomLetter';
import { RestartIcon } from '@/assets/icons';
import LetterWrapper from '@/components/LetterWrapper';
import ResultLetter from '@/components/ResultLetter';

import { CATEGORY_LIST } from '../constants';

export default function MatchingSelect({
  setOpenModal,
  setSelectedLetter,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLetter: React.Dispatch<React.SetStateAction<RandomLetters>>;
}) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [randomLetters, setRandomLetters] = useState<RandomLetters[]>([]);

  const handleGetRandomLetters = async (selectedCategory: Category | 'ALL') => {
    const res = await getRandomLetters(selectedCategory);
    if (res?.status === 200) {
      setRandomLetters(res.data.data);
    } else {
      alert('랜덤편지 데이터를 가져오는중에 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    handleGetRandomLetters(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div className="mt-25 flex flex-col items-start justify-center">
        <button
          className="mb-2 flex items-center gap-1"
          onClick={() => {
            handleGetRandomLetters(selectedCategory);
          }}
        >
          <img src={RestartIcon} alt="재시작 아이콘" />
          <span className="caption-sb text-gray-30 dark:text-white">리스트 새로고침</span>
        </button>
        <div className="w-full max-w-[300px]">
          {randomLetters.length === 0 ? (
            <LetterWrapper className="letter-disabled-bg flex h-[204px] w-full min-w-[300px] items-center justify-center">
              <div className="caption-sb flex flex-col items-center justify-center gap-3">
                <div className="caption-r text-gray-80 flex flex-col items-center justify-center">
                  <span>편지가 없습니다.</span>
                  <span>따숨님의 편지를 작성해보시겠어요?</span>
                </div>
                <button
                  className="caption-b text-gray-60"
                  onClick={() => navigate('/letter/write')}
                >{`작성하러 가기 >`}</button>
              </div>
            </LetterWrapper>
          ) : (
            <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
              {randomLetters.map((list, idx) => {
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
          )}
        </div>
      </div>

      <div className="mt-11 flex w-60 flex-wrap items-center justify-center gap-2">
        {CATEGORY_LIST.map((category, idx) => {
          return (
            <button
              onClick={() => {
                if (category.category) {
                  setSelectedCategory(category.category);
                }
              }}
              className={twMerge(
                `body-b text-gray-60 rounded-full bg-white px-3 py-1.5`,
                selectedCategory === category.category && 'bg-primary-1 text-white',
              )}
              key={idx}
              aria-label={category.title}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </>
  );
}
