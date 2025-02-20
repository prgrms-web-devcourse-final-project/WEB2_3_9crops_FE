import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import FontOption from './components/FontOption';
import PreviousLetterOption from './components/PreviousLetterOption';
import ThemeOption from './components/ThemeOption';
import WritePageButton from './components/WritePageButton';

function OptionSlide({ prevLetter }: { prevLetter: PrevLetter }) {
  const [clicked, setClicked] = useState<Option>(null);
  const [slideActive, setSlideActive] = useState<boolean>(false);
  const buttonTitle = ['편지지', '글꼴', '이전 편지 내용'];

  const headRef = useRef<HTMLDivElement>(null);

  // 슬라이드 애니메이션을 줘야 하는데 마음데로 안되네에에엑
  const slideStyle = twMerge(
    `bg-primary-3 fixed bottom-0 left-[50%] flex w-full max-w-[600px] translate-x-[-50%] flex-col rounded-t-[20px] duration-100`,
  );
  // 슬라이드 계산부터 시작
  //

  return (
    <div className={slideStyle}>
      <div
        className="border-primary-1 flex cursor-pointer items-center justify-between border-b-2 px-4 pt-6 pb-4"
        ref={headRef}
      >
        <div className="bg-primary-1 absolute top-3 left-[50%] h-[3px] w-7.5 translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="flex gap-2">
          <WritePageButton
            text={buttonTitle[0]}
            bgColor="white"
            rounded="lg"
            clicked={clicked}
            onClick={() => {
              if (clicked !== buttonTitle[0]) {
                setClicked('편지지');
                setSlideActive(() => true);
              } else {
                setClicked(null);
                setSlideActive(() => false);
              }
            }}
          />
          <WritePageButton
            text={buttonTitle[1]}
            bgColor="white"
            rounded="lg"
            clicked={clicked}
            onClick={() => {
              if (clicked !== buttonTitle[1]) {
                setClicked('글꼴');
                setSlideActive(() => true);
              } else {
                setClicked(null);
                setSlideActive(() => false);
              }
            }}
          />
        </div>
        {prevLetter && (
          <WritePageButton
            text={buttonTitle[2]}
            bgColor="white"
            rounded="lg"
            clicked={clicked}
            onClick={() => {
              if (clicked !== buttonTitle[2]) {
                setClicked('이전 편지 내용');
                setSlideActive(() => true);
              } else {
                setClicked(null);
                setSlideActive(() => false);
              }
            }}
          />
        )}
      </div>
      {clicked === '편지지' && <ThemeOption />}
      {clicked === '글꼴' && <FontOption />}
      {clicked === '이전 편지 내용' && <PreviousLetterOption prevLetter={prevLetter} />}
    </div>
  );
}

export default OptionSlide;
