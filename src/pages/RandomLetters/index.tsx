import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { restartIcon } from '@/assets/icons';
import BgItem from '@/assets/images/field-4.png';

import MatchingSelectModal from './MatchingSelectModal';
const RandomLettersPage = () => {
  const categoryList = ['전체', '위로와 공감', '축하와 응원', '고민 상담', '기타'];
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {openModal && <MatchingSelectModal setOpenModal={setOpenModal} />}
      <div className="flex flex-col items-center">
        <span className="text-gray-60 body-b mt-20 rounded-full bg-white px-6 py-4">
          답장하고 싶은 편지를 선택해주세요!
        </span>
        <div className="mt-25 flex flex-col items-start gap-1.5">
          <button className="flex items-center gap-1">
            <img src={restartIcon} alt="재시작 아이콘" />
            <span className="caption-sb text-gray-30" onClick={() => {}}>
              리스트 새로고침
            </span>
          </button>
          <div
            className="bg-accent-3 h-50 w-75 cursor-pointer"
            onClick={() => setOpenModal(true)}
          ></div>
        </div>
        <div className="mt-11 flex w-60 flex-wrap items-center justify-center gap-2">
          {categoryList.map((category, idx) => {
            return (
              <button
                onClick={() => {
                  setSelectedCategory(category);
                }}
                className={twMerge(
                  `body-b text-gray-60 rounded-full bg-white px-3 py-1.5`,
                  selectedCategory === category && 'bg-primary-1 text-white',
                )}
                key={idx}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div
          className="fixed bottom-[-40px] left-1/2 z-[-10] h-42 w-full -translate-x-1/2 bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center opacity-70"
          style={{ '--bg-image': `url(${BgItem})` } as React.CSSProperties}
        />
      </div>
    </>
  );
};

export default RandomLettersPage;
